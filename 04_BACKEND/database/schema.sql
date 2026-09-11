CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT,
  timestamp TEXT,
  device_id TEXT,
  event_type TEXT,
  zone TEXT,
  value REAL,
  unit TEXT,
  raw TEXT
);

CREATE TABLE IF NOT EXISTS inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT,
  shelf_id TEXT,
  current_weight_grams REAL,
  estimated_quantity INTEGER,
  threshold INTEGER,
  status TEXT,
  confidence REAL,
  UNIQUE(sku, shelf_id)
);

CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cart_id TEXT UNIQUE,
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
  estimated_wait_seconds INTEGER,
  service_rate_per_minute REAL,
  confidence REAL,
  status TEXT
);

CREATE TABLE IF NOT EXISTS alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT,
  level TEXT,
  source TEXT,
  message TEXT,
  payload TEXT
);
