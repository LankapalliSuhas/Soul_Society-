-- 04_BACKEND/database/schema.sql
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  schema_version INTEGER,
  event_id TEXT,
  timestamp TEXT,
  device_id TEXT,
  event_type TEXT,
  zone TEXT,
  entity_id TEXT,
  payload TEXT,
  confidence REAL,
  metadata TEXT
);

CREATE TABLE IF NOT EXISTS inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT,
  shelf_id TEXT,
  tare_weight_grams REAL,
  unit_weight_grams REAL,
  current_weight_grams REAL,
  estimated_quantity INTEGER,
  threshold INTEGER,
  status TEXT,
  last_updated TEXT,
  confidence REAL,
  UNIQUE(sku, shelf_id)
);

CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cart_id TEXT UNIQUE,
  timestamp TEXT,
  tare_weight_grams REAL,
  current_weight_grams REAL,
  weight_change_grams REAL,
  estimated_item_count INTEGER,
  item_burden TEXT,
  confidence REAL
);

CREATE TABLE IF NOT EXISTS queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT,
  lane TEXT,
  people_count INTEGER,
  item_burden TEXT,
  estimated_item_count INTEGER,
  estimated_wait_seconds REAL,
  service_rate_per_minute REAL,
  confidence REAL,
  status TEXT,
  item_burden_source TEXT
);

CREATE TABLE IF NOT EXISTS alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT,
  level TEXT,
  source TEXT,
  message TEXT,
  payload TEXT
);
