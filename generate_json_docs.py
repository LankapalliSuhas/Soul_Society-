import os
import json
import glob

# Collect all json files in repo
all_json = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or '__pycache__' in root or '.pytest_cache' in root:
        continue
    for file in files:
        if file.endswith('.json'):
            path = os.path.join(root, file).replace('\\', '/')
            if path.startswith('./'):
                path = path[2:]
            all_json.append(path)

# Ensure explicitly requested ones are included even if missing
requested = [
    '00_PROJECT/project_config.json',
    '01_ARCHITECTURE/architecture_config.json',
    '02_HARDWARE/registry/entry_registry.json',
    '02_HARDWARE/registry/queue_registry.json',
    '02_HARDWARE/registry/shelf_registry.json',
    '02_HARDWARE/registry/cart_registry.json',
    '03_AI/AI_CONFIG.json',
    '03_AI/MODEL_REGISTRY.json',
    '04_BACKEND/backend_config.json',
    '05_FRONTEND/package.json',
    '06_DATA/schemas/event_schema.json',
    '06_DATA/schemas/inventory_schema.json',
    '06_DATA/schemas/queue_schema.json',
    '06_DATA/schemas/cart_schema.json',
    '06_DATA/sample/sample_events.json',
    '06_DATA/sample/sample_inventory.json',
    '06_DATA/sample/sample_queue.json',
    '06_DATA/sample/sample_cart.json',
    '07_INTEGRATION/device_registry.json',
    '07_INTEGRATION/integration_config.json',
    '07_INTEGRATION/api_contract.json',
    '08_TESTING/test_config.json',
    '09_SECURITY/security_config.json',
    '10_DEMO/demo_config.json',
    'package.json'
]

for r in requested:
    if r not in all_json:
        all_json.append(r)

def sort_key(f):
    if f[0].isdigit():
        return (0, f)
    return (1, f)
all_json = list(set(all_json))
all_json.sort(key=sort_key)

ownership = {
    '00_PROJECT': 'Mighty (P5)',
    '01_ARCHITECTURE': 'Phantom (P1)',
    '02_HARDWARE': 'Mighty (P5)',
    '03_AI': 'Phantom (P1)',
    '04_BACKEND': 'Soham (P2)',
    '05_FRONTEND': 'Cherry (P4)',
    '06_DATA': 'Phantom (P1) for schemas / Soham (P2) for samples',
    '07_INTEGRATION': 'Soham (P2) & Phantom (P1)',
    '08_TESTING': 'Team+1 (P6)',
    '09_SECURITY': 'Cherry (P4)',
    '10_DEMO': 'Mighty (P5)',
    'package.json': 'Mighty (P5)'
}

def get_owner(fpath):
    if '/' in fpath:
        root = fpath.split('/')[0]
        if root == '06_DATA':
            return 'Phantom (P1)' if 'schemas' in fpath else 'Soham (P2)'
        return ownership.get(root, 'Unknown')
    return ownership.get(fpath, 'Unknown')

def grep_usage(fname):
    bname = os.path.basename(fname)
    found_in = set()
    for root, _, files in os.walk('.'):
        if 'node_modules' in root or '.git' in root or '__pycache__' in root:
            continue
        for file in files:
            if not (file.endswith('.py') or file.endswith('.js') or file.endswith('.ts') or file.endswith('.json')):
                continue
            path = os.path.join(root, file)
            if path.replace('\\\\', '/').endswith(fname): continue
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if bname in content or (bname.replace('.json', '') in content):
                        found_in.add(root.split(os.sep)[1] if os.sep in root else root)
            except:
                pass
    return list(found_in) or ['None detected']

results = []
missing = 0
fully_populated = 0
owners_count = {}

for fpath in all_json:
    owner = get_owner(fpath)
    owners_count[owner] = owners_count.get(owner, 0) + 1
    
    usage = grep_usage(fpath)
    
    is_missing = False
    is_empty = False
    content_str = ''
    data = None
    
    if not os.path.exists(fpath):
        is_missing = True
        missing += 1
    else:
        with open(fpath, 'r', encoding='utf-8') as f:
            content_str = f.read().strip()
            if not content_str or content_str == '{}' or content_str == '[]':
                is_empty = True
                missing += 1
            else:
                fully_populated += 1
                try:
                    data = json.loads(content_str)
                except:
                    data = None

    purpose = 'Configuration file'
    if 'schema' in fpath: purpose = 'JSON Schema definition'
    if 'sample' in fpath: purpose = 'Sample data'
    
    schema_rows = []
    def extract_schema(obj, prefix=''):
        if not isinstance(obj, dict): return
        
        if 'type' in obj and 'properties' in obj:
            req = obj.get('required', [])
            for k, v in obj.get('properties', {}).items():
                is_req = 'Yes' if k in req else 'No'
                vtype = str(v.get('type', 'any'))
                enum = str(v.get('enum', '')) if 'enum' in v else ''
                desc = str(v.get('description', ''))
                path = prefix + '.' + k if prefix else k
                schema_rows.append(f'| `{path}` | {vtype} | {is_req} | {enum} | {desc} |')
                if vtype == 'object':
                    extract_schema(v, path)
                elif vtype == 'array' and 'items' in v:
                    extract_schema(v['items'], path + '[]')
        else:
            for k, v in obj.items():
                path = prefix + '.' + k if prefix else k
                vtype = type(v).__name__
                if vtype == 'dict':
                    schema_rows.append(f'| `{path}` | object | - | - | Config section |')
                    extract_schema(v, path)
                elif vtype == 'list':
                    schema_rows.append(f'| `{path}` | array | - | - | List of values |')
                    if len(v) > 0 and isinstance(v[0], dict):
                        extract_schema(v[0], path + '[]')
                else:
                    schema_rows.append(f'| `{path}` | {vtype} | - | - | Value: {v} |')

    if data:
        extract_schema(data)

    results.append({
        'path': fpath,
        'owner': owner,
        'read_by': ', '.join(usage),
        'purpose': purpose,
        'missing': is_missing,
        'empty': is_empty,
        'content': content_str,
        'schema_rows': schema_rows
    })

md = []
md.append('# JSON Format Reference\n')
md.append(f'**Summary:** Found {len(all_json)} defined JSON files. {fully_populated} are fully populated, {missing} are MISSING/EMPTY.')
top_owner = max(owners_count.items(), key=lambda x: x[1])[0]
md.append(f'The owner responsible for the most JSON files is **{top_owner}**.\n')

for r in results:
    md.append(f'## {r["path"]}')
    md.append(f'**Owner:** {r["owner"]}')
    md.append(f'**Read by:** {r["read_by"]}')
    md.append(f'**Purpose:** {r["purpose"]}\n')
    
    if r['missing'] or r['empty']:
        md.append('**FILE MISSING / EMPTY — not yet populated**')
        md.append('*(Schema below inferred from purpose/contract where possible, otherwise blank)*\n')
    
    md.append('**Schema:**')
    md.append('| Field (dot-path) | Type | Required | Allowed values / enum | Notes |')
    md.append('|---|---|---|---|---|')
    if r['schema_rows']:
        md.extend(r['schema_rows'])
    else:
        md.append('| N/A | N/A | N/A | N/A | No structure available |')
    
    md.append('\n**Actual current content:**')
    md.append('```json')
    if r['missing']:
        md.append('// FILE DOES NOT EXIST ON DISK')
    else:
        md.append(r['content'] if r['content'] else '// EMPTY FILE')
    md.append('```\n')

md.append('## Cross-Reference Map')
md.append('| JSON File | Owner | Consumers (Read By) |')
md.append('|---|---|---|')
for r in results:
    md.append(f'| `{r["path"]}` | {r["owner"]} | {r["read_by"]} |')

os.makedirs('00_PROJECT', exist_ok=True)
with open('00_PROJECT/JSON_FORMAT_REFERENCE.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print(f'Wrote to 00_PROJECT/JSON_FORMAT_REFERENCE.md. Total: {len(all_json)}. Missing/Empty: {missing}')
