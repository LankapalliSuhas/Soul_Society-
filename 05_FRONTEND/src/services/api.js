// ============================================================================
// Centralized REST layer.
// ============================================================================

const BASE_URL = "";

function getIsMock() {
  return localStorage.getItem('USE_MOCK_DATA') !== 'false';
}

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
// Mock generators
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
// Public API
// ---------------------------------------------------------------------------

export async function getOccupancy() {
  if (getIsMock()) {
    return { data: mockOccupancy(), error: null };
  }
  return request("/api/occupancy"); // Assuming backend has this when real
}

export async function getQueueLanes() {
  if (getIsMock()) {
    return { data: mockQueue(), error: null };
  }
  return request("/sample_data/sample_queue.json"); 
}

export async function getInventory() {
  if (getIsMock()) {
    return { data: mockInventory(), error: null };
  }
  return request("/sample_data/sample_inventory.json"); 
}

export async function getSystemHealth() {
  if (getIsMock()) {
    return { data: mockHealth(), error: null };
  }
  return request("/api/health"); // Assuming backend has this when real
}

// ---------------------------------------------------------------------------
// Smart Shopping Cart API
// ---------------------------------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function fetchInventory() {
  if (getIsMock()) {
    return [
      { id: '101', name: 'Premium Coffee Beans', price: 15.99, stock: 45, category: 'Groceries' },
      { id: '102', name: 'Organic Honey', price: 8.49, stock: 120, category: 'Groceries' },
      { id: '103', name: 'Almond Milk', price: 4.99, stock: 200, category: 'Dairy' },
      { id: '104', name: 'Whole Wheat Bread', price: 3.49, stock: 50, category: 'Bakery' },
      { id: '105', name: 'Dark Chocolate', price: 5.99, stock: 75, category: 'Snacks' }
    ];
  }
  const res = await fetch(`${API_BASE_URL}/inventory`);
  if (!res.ok) throw new Error('Failed to fetch inventory');
  return res.json();
}

export async function fetchCart() {
  if (getIsMock()) {
    return {
      items: [
        { id: '101', name: 'Premium Coffee Beans', price: 15.99, quantity: 2 },
        { id: '103', name: 'Almond Milk', price: 4.99, quantity: 1 }
      ],
      total: 36.97
    };
  }
  const res = await fetch(`${API_BASE_URL}/cart`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
}

export async function checkoutCart() {
  return new Promise(resolve => setTimeout(() => resolve({ success: true, orderId: 'ORD-' + Math.floor(Math.random() * 10000) }), 1500));
}
