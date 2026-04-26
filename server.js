const http = require("http");
const fs = require("fs").promises;
const path = require("path");

// ✅ PORT
const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";
const DB_FILE = path.join(__dirname, "db.json");

// ✅ PRODUCTS (your full data)
const PRODUCTS = [
  { id: 0, name: "Bananas", e: "🍌", cat: "fruits", p: 29, o: 49 },
  { id: 1, name: "Red Apples", e: "🍎", cat: "fruits", p: 79, o: 99 },
  { id: 2, name: "Fresh Oranges", e: "🍊", cat: "fruits", p: 59, o: 79 },
  { id: 3, name: "Full Cream Milk", e: "🥛", cat: "dairy", p: 52, o: 69 },
  { id: 4, name: "Cheddar Cheese", e: "🧀", cat: "dairy", p: 139, o: 179 },
  { id: 5, name: "Whole Wheat Bread", e: "🍞", cat: "bakery", p: 35, o: 44 },
  { id: 6, name: "Croissant", e: "🥐", cat: "bakery", p: 49, o: 65 },
  { id: 7, name: "Dark Chocolate", e: "🍫", cat: "snacks", p: 65, o: 99 },
  { id: 8, name: "Potato Chips", e: "🍟", cat: "snacks", p: 30, o: 40 },
  { id: 9, name: "Broccoli", e: "🥦", cat: "vegetables", p: 45, o: 60 },
  { id: 10, name: "Mixed Fruit Juice", e: "🧃", cat: "beverages", p: 69, o: 99 },
  { id: 11, name: "Sparkling Water", e: "💧", cat: "beverages", p: 29, o: 39 },
  { id: 12, name: "Tomatoes", e: "🍅", cat: "vegetables", p: 39, o: 55 },
  { id: 13, name: "Spinach", e: "🥬", cat: "vegetables", p: 25, o: 35 },
  { id: 14, name: "Eggs", e: "🥚", cat: "dairy", p: 89, o: 99 },
  { id: 15, name: "Hand Wash", e: "🧴", cat: "personal", p: 59, o: 79 },
  { id: 16, name: "Mango", e: "🥭", cat: "fruits", p: 99, o: 129 },
  { id: 17, name: "Greek Yogurt", e: "🍶", cat: "dairy", p: 65, o: 85 },
  { id: 18, name: "Peanut Butter", e: "🥜", cat: "snacks", p: 149, o: 199 },
  { id: 19, name: "Green Tea", e: "🍵", cat: "beverages", p: 89, o: 119 }
];

// ✅ LOAD DB
async function loadDB() {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return { orders: [], users: [] };
  }
}

// ✅ SAVE DB
async function saveDB(db) {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

// ✅ SERVER
const server = http.createServer(async (req, res) => {
  // 🔥 CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  // ✅ GET PRODUCTS
  if (req.method === "GET" && req.url === "/api/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(PRODUCTS));
  }

  // ✅ GET USER ORDERS
  if (req.method === "GET" && req.url.startsWith("/api/orders?userEmail=")) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userEmail = url.searchParams.get("userEmail");
    const db = await loadDB();
    const userOrders = db.orders.filter(o => o.userEmail === userEmail);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(userOrders));
  }
  

  // ✅ POST ORDER (SAVES TO db.json)
  if (req.method === "POST" && req.url === "/api/orders") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const data = JSON.parse(body || "{}");
        const db = await loadDB();
        
        const order = {
          id: `FM-${Date.now()}`,
          items: data.items || [],
          total: data.total || 0,
          userEmail: data.userEmail || "guest",
          timestamp: new Date().toISOString(),
          status: "in-transit"
        };

        db.orders.unshift(order);
        await saveDB(db);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          message: "Order placed successfully!",
          order
        }));
      } catch (err) {
        console.error("Order error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server error" }));
      }
    });
    return;
  }

  // ✅ DEFAULT
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("🚀 FreshMart API Ready!\n\nEndpoints:\n- GET /api/products\n- POST /api/orders\n- GET /api/orders?userEmail=test@example.com");
});

// ✅ START SERVER
server.listen(PORT, HOST, () => {
  console.log(`✅ FreshMart API: http://${HOST}:${PORT}`);
  console.log(`📁 Database: ${DB_FILE}`);
});