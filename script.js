/* ============================================================
   FreshMart – script.js
   ============================================================ */

/* ── PRODUCT DATA ── */
const P = [
  { id: 0,  name: "Bananas",           e: "🍌", cat: "fruits",     p: 29,  o: 49,  w: "6 pcs",   r: 4.7, rv: 1240, b: "sale" },
  { id: 1,  name: "Red Apples",        e: "🍎", cat: "fruits",     p: 79,  o: 99,  w: "1 kg",    r: 4.8, rv: 980,  b: "sale" },
  { id: 2,  name: "Fresh Oranges",     e: "🍊", cat: "fruits",     p: 59,  o: 79,  w: "6 pcs",   r: 4.6, rv: 762,  b: null   },
  { id: 3,  name: "Full Cream Milk",   e: "🥛", cat: "dairy",      p: 52,  o: 69,  w: "1 L",     r: 4.9, rv: 2100, b: "sale" },
  { id: 4,  name: "Cheddar Cheese",    e: "🧀", cat: "dairy",      p: 139, o: 179, w: "200 g",   r: 4.5, rv: 540,  b: "sale" },
  { id: 5,  name: "Whole Wheat Bread", e: "🍞", cat: "bakery",     p: 35,  o: 44,  w: "400 g",   r: 4.6, rv: 830,  b: "new"  },
  { id: 6,  name: "Croissant",         e: "🥐", cat: "bakery",     p: 49,  o: 65,  w: "2 pcs",   r: 4.4, rv: 430,  b: null   },
  { id: 7,  name: "Dark Chocolate",    e: "🍫", cat: "snacks",     p: 65,  o: 99,  w: "100 g",   r: 4.7, rv: 1560, b: "sale" },
  { id: 8,  name: "Potato Chips",      e: "🍟", cat: "snacks",     p: 30,  o: 40,  w: "80 g",    r: 4.3, rv: 2240, b: null   },
  { id: 9,  name: "Broccoli",          e: "🥦", cat: "vegetables", p: 45,  o: 60,  w: "500 g",   r: 4.5, rv: 670,  b: "new"  },
  { id: 10, name: "Mixed Fruit Juice", e: "🧃", cat: "beverages",  p: 69,  o: 99,  w: "1 L",     r: 4.6, rv: 1100, b: "sale" },
  { id: 11, name: "Sparkling Water",   e: "💧", cat: "beverages",  p: 29,  o: 39,  w: "750 ml",  r: 4.4, rv: 880,  b: null   },
  { id: 12, name: "Tomatoes",          e: "🍅", cat: "vegetables", p: 39,  o: 55,  w: "500 g",   r: 4.7, rv: 1430, b: "sale" },
  { id: 13, name: "Spinach",           e: "🥬", cat: "vegetables", p: 25,  o: 35,  w: "250 g",   r: 4.5, rv: 560,  b: null   },
  { id: 14, name: "Eggs",              e: "🥚", cat: "dairy",      p: 89,  o: 99,  w: "12 pcs",  r: 4.8, rv: 3200, b: null   },
  { id: 15, name: "Hand Wash",         e: "🧴", cat: "personal",   p: 59,  o: 79,  w: "250 ml",  r: 4.6, rv: 740,  b: "sale" },
  { id: 16, name: "Mango",             e: "🥭", cat: "fruits",     p: 99,  o: 129, w: "4 pcs",   r: 4.9, rv: 1870, b: "new"  },
  { id: 17, name: "Greek Yogurt",      e: "🍶", cat: "dairy",      p: 65,  o: 85,  w: "400 g",   r: 4.7, rv: 620,  b: null   },
  { id: 18, name: "Peanut Butter",     e: "🥜", cat: "snacks",     p: 149, o: 199, w: "400 g",   r: 4.8, rv: 1340, b: "sale" },
  { id: 19, name: "Green Tea",         e: "🍵", cat: "beverages",  p: 89,  o: 119, w: "25 bags", r: 4.5, rv: 980,  b: null   },
];
/*  ──Add at top after state ── */
function saveState() {
  localStorage.setItem("freshmart_cart", JSON.stringify(cart));
}

/* ── DELIVERY ZONES ── */
const ZONES = [
  { name: "Connaught Place",       lat: 28.6139, lng: 77.2090, eta: "18 min", r: 4000, color: "#2d9e5f", active: true  },
  { name: "Noida Sector 62",       lat: 28.5355, lng: 77.3910, eta: "25 min", r: 5000, color: "#2d9e5f", active: true  },
  { name: "Dwarka",                lat: 28.5921, lng: 77.0460, eta: "22 min", r: 4500, color: "#2d9e5f", active: true  },
  { name: "DLF Phase 1, Gurugram", lat: 28.4595, lng: 77.0266, eta: "30 min", r: 5000, color: "#f97316", active: true  },
  { name: "Sector 15, Faridabad",  lat: 28.4089, lng: 77.3178, eta: "35 min", r: 4000, color: "#f97316", active: true  },
  { name: "Meerut City",           lat: 28.9845, lng: 77.7064, eta: "Soon",   r: 3000, color: "#9ca3af", active: false },
  { name: "Agra",                  lat: 27.1767, lng: 78.0081, eta: "Soon",   r: 4000, color: "#9ca3af", active: false },
];

/* ── STATE ── */
const cart       = {};
let   cf          = "all";
let   st          = "";
let   currentUser = null;
let   couponDiscount = 0;
let   selectedLoc = { name: "Connaught Place, New Delhi", lat: 28.6139, lng: 77.2090, eta: "18 min" };

/* Map instances */
let map             = null;
let marker          = null;

/* ============================================================
   MAP
   ============================================================ */
function initMap() {
  if (map) return;

  map = L.map("mapEl", { zoomControl: true }).setView([28.55, 77.20], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
    maxZoom: 18,
  }).addTo(map);

  /* Draw zone circles + labels */
  ZONES.forEach((z) => {
    L.circle([z.lat, z.lng], {
      radius:      z.r,
      color:       z.color,
      fillColor:   z.color,
      fillOpacity: 0.12,
      weight:      2,
    }).addTo(map);

    const icon = L.divIcon({
      html: `<div style="background:${z.color};color:#fff;border-radius:50px;padding:3px 8px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.2)">${z.active ? "✓" : ""} ${z.name.split(",")[0]}</div>`,
      className:  "",
      iconAnchor: [40, 10],
    });

    L.marker([z.lat, z.lng], { icon })
      .addTo(map)
      .on("click", () => moveMapTo(z.lat, z.lng, z.name + ", " + z.eta));
  });

  /* Draggable delivery pin */
  const greenIcon = L.divIcon({
    html: '<div style="background:#2d9e5f;width:20px;height:20px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>',
    className:  "",
    iconAnchor: [10, 10],
  });

  marker = L.marker([selectedLoc.lat, selectedLoc.lng], { icon: greenIcon, draggable: true }).addTo(map);

  marker.on("dragend", (e) => {
    const ll      = e.target.getLatLng();
    const nearest = findNearestZone(ll.lat, ll.lng);
    selectedLoc   = { name: nearest.name, lat: ll.lat, lng: ll.lng, eta: nearest.eta };
    document.getElementById("locFooterText").textContent = nearest.name;
  });

  map.on("click", (e) => {
    const nearest = findNearestZone(e.latlng.lat, e.latlng.lng);
    marker.setLatLng(e.latlng);
    selectedLoc = { name: nearest.name, lat: e.latlng.lat, lng: e.latlng.lng, eta: nearest.eta };
    document.getElementById("locFooterText").textContent = nearest.name;
  });
}

function findNearestZone(lat, lng) {
  let best = ZONES[0], bestD = Infinity;
  ZONES.filter((z) => z.active).forEach((z) => {
    const d = Math.hypot(z.lat - lat, z.lng - lng);
    if (d < bestD) { bestD = d; best = z; }
  });
  return best;
}

function moveMapTo(lat, lng, label) {
  map.setView([lat, lng], 13, { animate: true });
  marker.setLatLng([lat, lng]);
  selectedLoc = { name: label.split(",")[0] + ", Delhi NCR", lat, lng, eta: "" };
  document.getElementById("locFooterText").textContent = label.split(",")[0];
}

/* ── Location modal open / close ── */
function openLocModal() {
  document.getElementById("locModal").classList.add("on");
  document.getElementById("ov").classList.add("on");
  document.getElementById("pan").classList.remove("on");
  document.getElementById("accPanel").classList.remove("on");
  setTimeout(() => {
    initMap();
    map.invalidateSize();
    map.setView([selectedLoc.lat, selectedLoc.lng], 11, { animate: false });
  }, 300);
}

function closeLocModal() {
  document.getElementById("locModal").classList.remove("on");
  document.getElementById("ov").classList.remove("on");
}

function confirmLocation() {
  document.getElementById("locLabel").textContent    = selectedLoc.name.split(",")[0];
  document.getElementById("payAddr").textContent     = selectedLoc.name;
  closeLocModal();
  toast("📍 Location set to " + selectedLoc.name);
}

/* ── Saved address chips ── */
function selectChip(id, lat, lng, name) {
  document.querySelectorAll(".sa-chip").forEach((c) => c.classList.remove("active"));
  document.getElementById("chip-" + id).classList.add("active");
  selectedLoc = { name, lat, lng };
  document.getElementById("locFooterText").textContent = name;
  if (map) { map.setView([lat, lng], 13, { animate: true }); marker.setLatLng([lat, lng]); }
}

/* ── Zone sidebar ── */
function selectZone(el, name, lat, lng, eta) {
  document.querySelectorAll(".zone-item").forEach((x) => x.classList.remove("sel"));
  el.classList.add("sel");
  selectedLoc = { name, lat, lng, eta };
  document.getElementById("locFooterText").textContent = name;
  if (map) { map.setView([lat, lng], 13, { animate: true }); marker.setLatLng([lat, lng]); }
}

/* ── GPS ── */
function useGPS() {
  if (!navigator.geolocation) { toast("⚠️ Geolocation not supported"); return; }
  toast("📡 Detecting your location…");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const nearest = findNearestZone(lat, lng);
      selectedLoc   = { name: nearest.name, lat, lng, eta: nearest.eta };
      document.getElementById("locFooterText").textContent = nearest.name;
      if (map) { map.setView([lat, lng], 14, { animate: true }); marker.setLatLng([lat, lng]); }
      toast("📍 Location detected: " + nearest.name);
    },
    () => toast("⚠️ Could not detect location")
  );
}

/* ── Search within modal ── */
function searchLoc(v) {
  if (!v || !map) return;
  const match = ZONES.find((z) => z.name.toLowerCase().includes(v.toLowerCase()));
  if (match) {
    map.setView([match.lat, match.lng], 13, { animate: true });
    marker.setLatLng([match.lat, match.lng]);
    selectedLoc = { name: match.name, lat: match.lat, lng: match.lng, eta: match.eta };
    document.getElementById("locFooterText").textContent = match.name;
  }
}

/* ============================================================
   PRODUCTS
   ============================================================ */
function rend() {
  const g = document.getElementById("grid");
  const f = P.filter(
    (x) => (cf === "all" || x.cat === cf) && x.name.toLowerCase().includes(st.toLowerCase())
  );

  if (!f.length) {
    g.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#9ca3af">
      <div style="font-size:48px">🔍</div><p style="margin-top:10px">No products found</p></div>`;
    return;
  }

  g.innerHTML = f.map((x) => {
    const q = cart[x.id];
    const d = Math.round((1 - x.p / x.o) * 100);
    return `<div class="pc">
      <div class="pi">
        <span style="font-size:60px">${x.e}</span>
        ${x.b === "sale" ? `<span class="bo">-${d}%</span>` : ""}
        ${x.b === "new"  ? `<span class="bn">NEW</span>`    : ""}
        <button class="wb" onclick="wl(this)">🤍</button>
      </div>
      <div class="pif">
        <div class="pn">${x.name}</div>
        <div class="pw">${x.w}</div>
        <div class="pr">
          <span class="st">${"★".repeat(Math.floor(x.r))}</span>
          <span>${x.r} (${x.rv.toLocaleString()})</span>
        </div>
        <div class="prr">
          <div><span class="pp">₹${x.p}</span><span class="po">₹${x.o}</span></div>
          ${q
            ? `<div class="qc">
                <button onclick="qc(${x.id},-1)">−</button>
                <span>${q}</span>
                <button onclick="qc(${x.id},1)">+</button>
               </div>`
            : `<button class="ab" onclick="add(${x.id})">＋ Add</button>`}
        </div>
      </div>
    </div>`;
  }).join("");
}

/* ============================================================
   CART
   ============================================================ */
function add(id) { cart[id] = (cart[id] || 0) + 1; upd(); rend(); toast(P[id].e + " Added to cart!"); }
function ai(id)  { add(id); }

function qc(id, d) {
  cart[id] = (cart[id] || 0) + d;
  if (cart[id] <= 0) delete cart[id];
  upd(); rend(); rc();
}

function upd() {
  document.getElementById("cbg").textContent = Object.values(cart).reduce((a, b) => a + b, 0);
  saveState();
  rc();
}

function rc() {
  const c = document.getElementById("ci");
  const f = document.getElementById("cf");
  const e = Object.entries(cart);

  if (!e.length) {
    c.innerHTML = `<div class="ce">
      <div class="be">🛒</div>
      <p style="font-weight:700;font-size:15px;color:#374151;margin-bottom:5px">Your cart is empty</p>
      <p>Add items to get started!</p></div>`;
    f.style.display = "none";
    return;
  }

  let sub = 0, sav = 0;
  c.innerHTML = e.map(([id, q]) => {
    const x = P[+id], lt = x.p * q, ls = (x.o - x.p) * q;
    sub += lt; sav += ls;
    return `<div class="cit">
      <div class="cie">${x.e}</div>
      <div class="cii">
        <div class="cin">${x.name}</div>
        <div class="ciw">${x.w}</div>
        <div class="cip">₹${x.p} × ${q} = ₹${lt}</div>
      </div>
      <div class="qc" style="margin-right:5px">
        <button onclick="qc(${id},-1)">−</button>
        <span>${q}</span>
        <button onclick="qc(${id},1)">+</button>
      </div>
      <button class="crm" onclick="qc(${id},-${q})">🗑</button>
    </div>`;
  }).join("");

  const del = sub >= 499 ? 0 : 40;
  document.getElementById("cs").textContent   = `₹${sub}`;
  document.getElementById("csav").textContent = `₹${sav}`;
  document.getElementById("cd").textContent   = del === 0 ? "FREE 🎉" : `₹${del}`;
  document.getElementById("ct").textContent   = `₹${sub + del}`;
  f.style.display = "block";
}

/* ============================================================
   PANELS
   ============================================================ */
function closeAll() {
  document.getElementById("pan").classList.remove("on");
  document.getElementById("accPanel").classList.remove("on");
  document.getElementById("locModal").classList.remove("on");
  document.getElementById("ov").classList.remove("on");
}

function tc(ev) {
  ev.preventDefault();
  document.getElementById("accPanel").classList.remove("on");
  document.getElementById("locModal").classList.remove("on");
  document.getElementById("pan").classList.toggle("on");
  document.getElementById("ov").classList.toggle("on");
}

/* ============================================================
   ACCOUNT
   ============================================================ */
function openAcc(ev) {
  ev.preventDefault();
  document.getElementById("pan").classList.remove("on");
  document.getElementById("locModal").classList.remove("on");
  document.getElementById("accPanel").classList.toggle("on");
  document.getElementById("ov").classList.toggle("on");
  if (currentUser) showProfile();
}

function closeAcc() {
  document.getElementById("accPanel").classList.remove("on");
  document.getElementById("ov").classList.remove("on");
}

function switchTab(tab) {
  document.getElementById("tab-login").classList.toggle("on", tab === "login");
  document.getElementById("tab-reg").classList.toggle("on",   tab === "reg");
  document.getElementById("loginForm").style.display = tab === "login" ? "block" : "none";
  document.getElementById("regForm").style.display   = tab === "reg"   ? "block" : "none";
}

function togglePw(id, btn) {
  const inp = document.getElementById(id);
  inp.type  = inp.type === "password" ? "text" : "password";
  btn.textContent = inp.type === "password" ? "👁" : "🙈";
}

function doLogin() {
  const em = document.getElementById("loginEmail").value.trim();
  const pw = document.getElementById("loginPass").value;
  if (!em || !pw) { toast("⚠️ Please fill in all fields"); return; }
  if (!em.includes("@")) { toast("⚠️ Enter a valid email"); return; }
  currentUser = {
    name:     em.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    email:    em,
    initials: em[0].toUpperCase(),
  };
  showProfile();
  toast("👋 Welcome back, " + currentUser.name + "!");
}

function doRegister() {
  const nm = document.getElementById("regName").value.trim();
  const em = document.getElementById("regEmail").value.trim();
  const ph = document.getElementById("regPhone").value.trim();
  const pw = document.getElementById("regPass").value;
  if (!nm || !em || !ph || !pw) { toast("⚠️ Please fill in all fields"); return; }
  if (!em.includes("@")) { toast("⚠️ Enter a valid email"); return; }
  currentUser = { name: nm, email: em, initials: nm[0].toUpperCase() };
  showProfile();
  toast("🎉 Welcome to FreshMart, " + nm + "!");
}

function socialLogin(m) {
  currentUser = { name: "Demo User", email: "demo@freshmart.in", initials: "D" };
  showProfile();
  toast("✅ Logged in with " + m + "!");
}

function showProfile() {
  document.getElementById("authView").style.display    = "none";
  document.getElementById("profileView").style.display = "block";
  document.getElementById("profileAvatar").textContent = currentUser.initials;
  document.getElementById("profileName").textContent   = currentUser.name;
  document.getElementById("profileEmail").textContent  = currentUser.email;
  document.getElementById("accLabel").textContent      = currentUser.name.split(" ")[0];
  /* Ensure no sub-panel is lingering open */
  document.querySelectorAll(".sub-panel").forEach((p) => p.classList.remove("on"));
}

function doLogout() {
  currentUser = null;
  document.getElementById("authView").style.display    = "block";
  document.getElementById("profileView").style.display = "none";
  document.getElementById("accLabel").textContent      = "Account";
  document.getElementById("loginEmail").value          = "";
  document.getElementById("loginPass").value           = "";
  switchTab("login");
  toast("👋 Logged out successfully");
}

/* ============================================================
   SUB-PANELS (slide-in within account panel)
   ============================================================ */
function openSubPanel(id) {
  document.getElementById(id).classList.add("on");
}

function closeSubPanel(id) {
  document.getElementById(id).classList.remove("on");
}

/* ── EDIT PROFILE ── */
function openEditProfile() {
  if (!currentUser) return;
  document.getElementById("epAvatar").textContent = currentUser.initials;
  document.getElementById("epName").value   = currentUser.name  || "";
  document.getElementById("epEmail").value  = currentUser.email || "";
  document.getElementById("epPhone").value  = currentUser.phone || "";
  document.getElementById("epDob").value    = currentUser.dob   || "";
  document.getElementById("epGender").value = currentUser.gender|| "";
  openSubPanel("editProfilePanel");
}

function saveProfile() {
  const name   = document.getElementById("epName").value.trim();
  const email  = document.getElementById("epEmail").value.trim();
  const phone  = document.getElementById("epPhone").value.trim();
  const dob    = document.getElementById("epDob").value;
  const gender = document.getElementById("epGender").value;
  const pass   = document.getElementById("epPass").value;

  if (!name)  { toast("⚠️ Name cannot be empty"); return; }
  if (!email || !email.includes("@")) { toast("⚠️ Enter a valid email"); return; }

  currentUser.name    = name;
  currentUser.email   = email;
  currentUser.phone   = phone;
  currentUser.dob     = dob;
  currentUser.gender  = gender;
  currentUser.initials = name[0].toUpperCase();

  /* Update displayed profile */
  document.getElementById("profileAvatar").textContent = currentUser.initials;
  document.getElementById("profileName").textContent   = currentUser.name;
  document.getElementById("profileEmail").textContent  = currentUser.email;
  document.getElementById("accLabel").textContent      = currentUser.name.split(" ")[0];
  document.getElementById("epPass").value              = "";

  if (pass) toast("✅ Profile & password updated!");
  else      toast("✅ Profile saved successfully!");
  closeSubPanel("editProfilePanel");
}

/* ── PAYMENT METHODS ── */
let savedCards = [
  { id: "scard-1", icon: "💳", label: "VISA •••• 4242",        sub: "Expires 08 / 27 · Aarav Sharma",  isDefault: true  },
  { id: "scard-2", icon: "💳", label: "Mastercard •••• 8891",  sub: "Expires 03 / 26 · Aarav Sharma",  isDefault: false },
];

let savedUpi = [
  { id: "supi-1", icon: "📱", label: "aarav@okaxis", sub: "GPay · Linked", isDefault: true },
];

function openPayMethods() {
  renderSavedCards();
  openSubPanel("payMethodsPanel");
}

function renderSavedCards() {
  const list = document.getElementById("savedCardsList");
  list.innerHTML = savedCards.map((c) => `
    <div class="pm-saved-card" id="${c.id}">
      <div class="pm-card-icon">${c.icon}</div>
      <div class="pm-card-info">
        <div class="pm-card-label">${c.label}</div>
        <div class="pm-card-sub">${c.sub}</div>
        ${c.isDefault ? '<span class="pm-card-default">Default</span>' : ""}
      </div>
      <div class="pm-card-actions">
        ${!c.isDefault ? `<button class="pm-act-btn set-def" onclick="setDefault('${c.id}')">Set Default</button>` : ""}
        <button class="pm-act-btn del" onclick="deleteCard('${c.id}','card')">Remove</button>
      </div>
    </div>`).join("");

  const upiList = document.getElementById("savedUpiList");
  upiList.innerHTML = savedUpi.map((u) => `
    <div class="pm-saved-card" id="${u.id}">
      <div class="pm-card-icon">${u.icon}</div>
      <div class="pm-card-info">
        <div class="pm-card-label">${u.label}</div>
        <div class="pm-card-sub">${u.sub}</div>
        ${u.isDefault ? '<span class="pm-card-default">Default</span>' : ""}
      </div>
      <div class="pm-card-actions">
        ${!u.isDefault ? `<button class="pm-act-btn set-def" onclick="setUpiDefault('${u.id}')">Set Default</button>` : ""}
        <button class="pm-act-btn del" onclick="deleteCard('${u.id}','upi')">Remove</button>
      </div>
    </div>`).join("");
}

function setDefault(id) {
  savedCards.forEach((c) => c.isDefault = (c.id === id));
  renderSavedCards();
  toast("✅ Default card updated");
}

function setUpiDefault(id) {
  savedUpi.forEach((u) => u.isDefault = (u.id === id));
  renderSavedCards();
  toast("✅ Default UPI updated");
}

function deleteCard(id, type) {
  if (type === "upi") {
    savedUpi = savedUpi.filter((u) => u.id !== id);
  } else {
    const removing = savedCards.find((c) => c.id === id);
    savedCards     = savedCards.filter((c) => c.id !== id);
    /* If deleted card was default, promote first remaining */
    if (removing && removing.isDefault && savedCards.length) savedCards[0].isDefault = true;
  }
  renderSavedCards();
  toast("🗑 Card removed");
}

function toggleAddCardForm() {
  const f = document.getElementById("addCardForm");
  f.classList.toggle("on");
  if (f.classList.contains("on")) {
    document.getElementById("ncNumber").focus();
  }
}

function saveNewCard() {
  const num  = document.getElementById("ncNumber").value.replace(/\s/g, "");
  const name = document.getElementById("ncName").value.trim();
  const exp  = document.getElementById("ncExp").value.trim();
  const cvv  = document.getElementById("ncCvv").value.trim();

  if (num.length < 12)  { toast("⚠️ Enter a valid card number"); return; }
  if (!name)            { toast("⚠️ Enter cardholder name"); return; }
  if (exp.length < 4)   { toast("⚠️ Enter a valid expiry date"); return; }
  if (cvv.length < 3)   { toast("⚠️ Enter a valid CVV"); return; }

  const last4  = num.slice(-4);
  const scheme = num[0] === "4" ? "VISA" : num[0] === "5" ? "Mastercard" : "RuPay";
  const newId  = "scard-" + Date.now();

  savedCards.push({
    id: newId, icon: "💳",
    label:     `${scheme} •••• ${last4}`,
    sub:       `Expires ${exp} · ${name}`,
    isDefault: savedCards.length === 0,
  });

  /* Reset form */
  ["ncNumber","ncName","ncExp","ncCvv"].forEach((id) => document.getElementById(id).value = "");
  document.getElementById("addCardForm").classList.remove("on");
  renderSavedCards();
  toast("💳 Card saved successfully!");
}

/* ============================================================
   PAYMENT
   ============================================================ */
function openPayment() {
  if (!Object.keys(cart).length) return;
  const e = Object.entries(cart);
  let sub = 0;
  e.forEach(([id, q]) => { sub += P[+id].p * q; });
  const del   = sub >= 499 ? 0 : 40;
  const total = Math.max(0, sub + del - couponDiscount);

  document.getElementById("payAmt").textContent   = "₹" + total;
  document.getElementById("payItems").textContent = e.length + " item" + (e.length !== 1 ? "s" : "");
  document.getElementById("payBtnAmt").textContent = "₹" + total;
  document.getElementById("payAddr").textContent   = selectedLoc.name;
  document.getElementById("payNormal").style.display  = "flex";
  document.getElementById("paySuccess").style.display = "none";
  document.getElementById("paySuccess").classList.remove("on");
  document.getElementById("payModal").classList.add("on");
  document.getElementById("ov").classList.add("on");
  document.getElementById("pan").classList.remove("on");
}

function closePayment() {
  document.getElementById("payModal").classList.remove("on");
  document.getElementById("ov").classList.remove("on");
}

function selPM(el, method) {
  document.querySelectorAll(".pm-card").forEach((c) => c.classList.remove("sel"));
  document.querySelectorAll(".pm-detail").forEach((d) => d.classList.remove("on"));
  el.classList.add("sel");
  document.getElementById("det-" + method).classList.add("on");
}

function selUpi(el)    { document.querySelectorAll(".upi-app").forEach((x)     => x.classList.remove("sel")); el.classList.add("sel"); }
function selNb(el)     { document.querySelectorAll(".nb-item").forEach((x)     => x.classList.remove("sel")); el.classList.add("sel"); }
function selWallet(el) { document.querySelectorAll(".wallet-item").forEach((x) => x.classList.remove("sel")); el.classList.add("sel"); }

function applyCoupon() {
  const code    = document.getElementById("payCode").value.trim();
  const coupons = { FRESHMART20: 50, SAVE50: 50, WEEKEND15: 40, DAIRY10: 30 };
  if (coupons[code]) {
    couponDiscount = coupons[code];
    const e = Object.entries(cart);
    let sub = 0;
    e.forEach(([id, q]) => { sub += P[+id].p * q; });
    const del   = sub >= 499 ? 0 : 40;
    const total = Math.max(0, sub + del - couponDiscount);
    document.getElementById("couponApplied").textContent  = `✅ "${code}" applied! You save ₹${couponDiscount}`;
    document.getElementById("couponApplied").style.display = "block";
    document.getElementById("payAmt").textContent          = "₹" + total;
    document.getElementById("payBtnAmt").textContent       = "₹" + total;
    toast("🎉 Coupon applied! Saving ₹" + couponDiscount);
  } else {
    toast("❌ Invalid coupon code");
  }
}

function processPayment() {
  const btn = document.getElementById("payBtn");
  btn.textContent = "⏳ Processing payment…";
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent = "🔒 Pay Securely";
    btn.disabled    = false;
    const onum      = "#FM-2026-" + Math.floor(1000 + Math.random() * 9000);

    document.getElementById("successOrderNum").textContent     = onum;
    document.getElementById("payNormal").style.display         = "none";
    document.getElementById("paySuccess").classList.add("on");

    /* Clear cart */
    Object.keys(cart).forEach((k) => delete cart[k]);
    couponDiscount = 0;
    document.getElementById("couponApplied").style.display = "none";
    document.getElementById("payCode").value               = "";
    upd(); rend();

    /* Add to order history if logged in */
    if (currentUser) {
      const ol = document.getElementById("ordersList");
      const d  = document.createElement("div");
      d.className = "order-item";
      d.innerHTML = `<div class="order-header">
        <span class="order-id">${onum}</span>
        <span class="order-status transit">In Transit</span>
      </div>
      <div class="order-items-txt">New order placed</div>
      <div class="order-total">${document.getElementById("payAmt").textContent}</div>`;
      ol.prepend(d);
    }
  }, 2200);
  
}

/* ============================================================
   INPUT FORMATTERS
   ============================================================ */
function fmtCard(el) {
  let v = el.value.replace(/\D/g, "").substring(0, 16);
  el.value = v.replace(/(.{4})/g, "$1  ").trim();
}

function fmtExp(el) {
  let v = el.value.replace(/\D/g, "");
  if (v.length >= 2) v = v.substring(0, 2) + " / " + v.substring(2, 4);
  el.value = v;
}

/* ============================================================
   CATEGORY FILTER
   ============================================================ */
function fc(c, el) {
  cf = c;
  document.querySelectorAll(".ni a").forEach((a) => a.classList.remove("on"));
  document.querySelectorAll(".cp").forEach((x)  => x.classList.remove("on"));
  if (el) el.classList.add("on");
  const t = {
    all:        "🛒 All Products",
    fruits:     "🍎 Fresh Fruits",
    vegetables: "🥦 Vegetables",
    dairy:      "🥛 Dairy & Eggs",
    bakery:     "🍞 Bakery",
    snacks:     "🍿 Snacks",
    beverages:  "🧃 Beverages",
    personal:   "🧴 Personal Care",
  };
  document.getElementById("pt").textContent = t[c] || "🛒 All Products";
  rend();
  document.getElementById("ps").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Search ── */
function hs() { st = document.getElementById("si").value; rend(); }

/* ── Wishlist ── */
function wl(b) {
  b.textContent = b.textContent === "🤍" ? "❤️" : "🤍";
  if (b.textContent === "❤️") toast("❤️ Added to wishlist!");
}

/* ── Copy coupon ── */
function cc2(code) {
  if (navigator.clipboard) navigator.clipboard.writeText(code);
  toast(`📋 "${code}" copied!`);
}

/* ── Toast ── */
function toast(msg) {
  const t = document.getElementById("tst");
  t.textContent = msg;
  t.classList.add("on");
  setTimeout(() => t.classList.remove("on"), 2800);
}

/* ============================================================
   COUNTDOWN TIMER
   ============================================================ */
let secs = 2 * 3600 + 47 * 60 + 30;

setInterval(() => {
  if (secs <= 0) return;
  secs--;
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  document.getElementById("hrs").textContent = String(h).padStart(2, "0");
  document.getElementById("mns").textContent = String(m).padStart(2, "0");
  document.getElementById("scs").textContent = String(s).padStart(2, "0");
}, 1000);

/* ── Init ── */
rend();
const savedCart = localStorage.getItem("freshmart_cart");
if (savedCart) {
  Object.assign(cart, JSON.parse(savedCart));
  upd();
}