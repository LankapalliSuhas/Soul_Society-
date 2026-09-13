// ============================================================================
// Centralized REST layer.
//
// IMPORTANT: endpoint paths and field names below are PLACEHOLDERS. Nobody
// has supplied 07_INTEGRATION/api_contract.json or the 06_DATA/schemas/*
// files yet, so nothing here should be treated as final. Once those files
// exist, update BASE_URL usage and the field names inside each mock
// generator (and remove the mock branch) — do not invent endpoint names of
// your own beyond this point.
//
// Every exported function returns { data, error } so callers never need
// try/catch at the call site.
// ============================================================================

const BASE_URL = "";
const USE_MOCK = false;

async function request(path) {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) {
      return { data: null, error: `Request failed (${res.status})` };
    }
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: "Network error — is the backend running?" };
  }
}

// ---------------------------------------------------------------------------
// Mock generators — stand in for the real backend until contracts land.
// Field names are best-effort guesses based on the design brief only.
// ---------------------------------------------------------------------------

function mockOccupancy() {
  return {
    occupancy: 30 + Math.round(Math.random() * 30),
    history: Array.from({ length: 12 }, () => 25 + Math.round(Math.random() * 25)),
  };
}

function mockQueue() {
  return [
    { lane: "L01", people_count: 6, eta_min: 4, burden: 0.72, status: "busy" },
    { lane: "L02", people_count: 2, eta_min: 1, burden: 0.25, status: "clear" },
    { lane: "L03", people_count: 9, eta_min: 7, burden: 0.94, status: "critical" },
  ];
}

function mockInventory() {
  return [
    { sku: "SKU-1042", name: "Oat Milk 1L", stock: 3, par: 24, status: "critical", confidence: 0.96 },
    { sku: "SKU-2210", name: "Whole Wheat Bread", stock: 11, par: 20, status: "low", confidence: 0.91 },
    { sku: "SKU-3387", name: "Basmati Rice 5kg", stock: 18, par: 20, status: "ok", confidence: 0.88 },
    { sku: "SKU-4471", name: "Olive Oil 500ml", stock: 2, par: 15, status: "critical", confidence: 0.94 },
    { sku: "SKU-5502", name: "Greek Yogurt 400g", stock: 14, par: 18, status: "low", confidence: 0.83 },
    { sku: "SKU-6650", name: "Green Tea 100 bags", stock: 22, par: 20, status: "ok", confidence: 0.97 },
  ];
}

function mockHealth() {
  const ok = Math.random() > 0.08;
  return { healthy: ok, pct: ok ? 96 : 62, note: ok ? "all sensors reporting" : "1 sensor unresponsive" };
}

// ---------------------------------------------------------------------------
// Public API — swap USE_MOCK off once real endpoints exist.
// ---------------------------------------------------------------------------

export async function getOccupancy() {
  // Use mock for occupancy and health since there is no aggregated JSON sample for them
  return { data: mockOccupancy(), error: null };
}

export async function getQueueLanes() {
  return request("/sample_data/sample_queue.json"); 
}

export async function getInventory() {
  return request("/sample_data/sample_inventory.json"); 
}

export async function getSystemHealth() {
  return { data: mockHealth(), error: null };
}
