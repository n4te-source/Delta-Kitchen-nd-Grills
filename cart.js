const WHATSAPP = '2349040070149';
const KEY = 'dk-cart';
const naira = (n) => '₦' + Number(n || 0).toLocaleString('en-NG');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

// Swallow options for soups — fill in real prices below (currently ₦0 placeholders)
const SWALLOWS = [
  { id: 'none', name: 'No swallow', price: 0 },
  { id: 'eba', name: 'Eba', price: 0 },        // TODO: add price
  { id: 'pounded-yam', name: 'Pounded Yam', price: 0 }, // TODO: add price
  { id: 'semo', name: 'Semo', price: 0 },      // TODO: add price
  { id: 'fufu', name: 'Fufu', price: 0 },      // TODO: add price
];

// Takeaway pack fee — charged per dish, added to each cart line if selected
const TAKEAWAY_PACK_PRICE = 300; // TODO: add price

// Edit dishes here: name, price (number only), img, desc
const MENU = [
  {
    id: 'swallow-soups', title: 'Swallow & Soups',
    lede: 'Rich, slow-simmered — bold pepper, real stock, no shortcuts.',
    swallow: true,
    items: [
      { id: 'grasscutter-pepper-soup', name: 'Bushmeat Pepper Soup', price: 6000, img: 'images/grasscutter.jpg', desc: 'A Delta Kitchen signature — peppery, aromatic, and simmered low till the meat falls off the bone.' },
      { id: 'egusi-soup', name: 'Egusi Soup', price: 6000, img: 'images/egusi.jpg', desc: 'Thick, nutty melon-seed soup loaded with assorted meat and stockfish — rich, filling, and full of home flavour.' },
      { id: 'okra-soup', name: 'Okra Soup', price: 6000, img: 'images/okra.jpg', desc: 'Fresh okra cooked down with assorted meat and stock — light, silky, and perfect with any swallow.' },
      { id: 'fish-pepper-soup', name: 'Fish Pepper Soup', price: 5000, img: 'images/fish-pepper-soup.jpg', desc: 'Fresh fish in a light, fiery broth — the one people order when they need to feel better.' },
      { id: 'goat-meat-pepper-soup', name: 'Goat Meat Pepper Soup', price: 6000, img: 'images/goat-pepper-soup.jpg', desc: 'Tender goat meat, sharp spice, deep flavour. A Delta Kitchen best-seller, every single week.' },
    ],
  },

  {
    id: 'main', title: 'Main',
    lede: 'Smoky, red, and perfectly seasoned.',
    items: [
      { id: 'party-jollof-rice', name: 'Party Jollof Rice', price: 3500, img: 'images/jollof.jpg', desc: 'Smoky, red, and perfectly seasoned — the rice everybody comes back to the pot for. Served on its own or paired with any of our proteins.' },
      { id: 'dirty-fried-rice', name: 'Dirty Jollof Rice', price: 2500, img: 'images/dirty-fried.jpg', desc: 'Native-style jollof loaded with assorted meat cuts and a deep smoky base — messy in the best way, packed with flavour in every spoon.'},
      { id: 'fried-rice', name: 'Fried Rice', price: 2000, img: 'images/fried.jpg', desc: 'Perfectly seasoned fried rice tossed with mixed vegetables and a hint of curry — a lighter classic that never misses.'},
      { id: 'rice-n-stew', name: 'Rice & Stew', price: 2000, img: 'images/ricenstew.jpg', desc: 'Soft white rice paired with our rich tomato pepper stew — simple, comforting, and always satisfying.'},
      { id: 'stir-fry-spag', name: 'Stir Fry Spaghetti', price: 2000, img: 'images/stirfry.jpg', desc: 'Spaghetti stir-fried with peppers, onions and a smoky pepper sauce — a fusion favourite with real punch.'},
      { id: 'rice-n-beans', name: 'Rice & Beans Jollof', price: 3000, img: 'images/ricenbeans.jpg', desc: 'Smoky jollof rice cooked together with well-seasoned beans — hearty, filling, and full of flavour in every bite.'},
      
    ],
  },
  
  {
    id: 'protein', title: 'Protein & Grills',
    lede: 'Marinated overnight, grilled to order.',
    items: [
      { id: 'grilled-turkey', name: 'Turkey', price: 8000, img: 'images/turkey.jpg', desc: 'Marinated overnight in-house, grilled to order — smoky skin, juicy inside, no dryness in sight.' },
      { id: 'grilled-chicken', name: 'Chicken', price: 6000, img: 'images/chicken.jpg', desc: 'Same overnight marinade, same grill — a lighter option that still brings the smoke.' },
      { id: 'fried-fish', name: 'Fried Fish', price: 5000, img: 'images/fish-fried.jpg', desc: 'Fried fish with onions, tomatoes, and spices. Served with rice and vegetables.' },
      { id: 'pepper-snails', name: 'Pepper Snails', price:3000, img: 'images/snails.jpg', desc: 'Fresh snails simmered in a bold pepper sauce — chewy, spicy, and packed with flavour for the adventurous eater.' },
      { id: 'goat-meat', name: 'Goat', price: 2000, img: 'images/goat.jpg', desc:'Tender goat meat marinated and grilled over open flame till smoky and juicy — a bold, no-frills favourite.'},
    ],
  },
];

const WISP = `<div class="divider-wisp" aria-hidden="true"><svg viewBox="0 0 1200 40" preserveAspectRatio="none"><path d="M0 20 C 100 5, 200 35, 300 20 C 400 5, 500 35, 600 20 C 700 5, 800 35, 900 20 C 1000 5, 1100 35, 1200 20" stroke="currentColor" stroke-width="2" fill="none"/></svg></div>`;

function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  renderCart();
}

function cardQty(card, delta) {
  const el = card.querySelector('[data-qty-value]');
  const next = Math.max(1, (Number(el.textContent) || 1) + delta);
  el.textContent = next;
}

function addFromCard(card) {
  const items = loadCart();
  const qtyEl = card.querySelector('[data-qty-value]');
  const qty = Math.max(1, Number(qtyEl?.textContent) || 1);

  const swallowEl = card.querySelector('[data-swallow]');
  const swallowId = swallowEl ? swallowEl.value : 'none';
  const swallow = SWALLOWS.find((s) => s.id === swallowId) || SWALLOWS[0];

  const basePrice = Number(card.dataset.price) || 0;
  const unitPrice = basePrice + TAKEAWAY_PACK_PRICE + (swallow.id !== 'none' ? swallow.price : 0);

  const nameParts = [card.dataset.name];
  if (swallow.id !== 'none') nameParts.push(`+ ${swallow.name}`);
  const displayName = nameParts.join(' ');

  const compositeId = `${card.dataset.id}__${swallow.id}`;

  const found = items.find((i) => i.id === compositeId);
  if (found) found.qty += qty;
  else items.push({ id: compositeId, name: displayName, price: unitPrice, qty });
  saveCart(items);
  setCartOpen(true);
  if (qtyEl) qtyEl.textContent = '1';
  if (swallowEl) swallowEl.value = 'none';
}

function changeCartQty(id, delta) {
  const items = loadCart().map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0);
  saveCart(items);
}

function renderMenu() {
  const root = document.getElementById('menuRoot');
  if (!root) return;

  root.innerHTML = MENU.map((section, i) => `
    ${i ? WISP : ''}
    <section class="menu-section" id="${section.id}">
      <div class="section-head section-head-left">
        <p class="eyebrow eyebrow-dark">Category</p>
        <h2>${esc(section.title)}</h2>
        <p class="section-lede">${esc(section.lede)}</p>
      </div>
      <div class="menu-grid">
        ${section.items.map((item) => `
          <article class="menu-card" data-id="${esc(item.id)}" data-name="${esc(item.name)}" data-price="${item.price}">
            <div class="menu-media">
              <img src="${esc(item.img)}" alt="${esc(item.name)}" onerror="this.style.visibility='hidden'">
            </div>
            <div class="menu-body">
              <h3>${esc(item.name)}</h3>
              <div class="menu-meta">
                <span class="menu-price">${naira(item.price + TAKEAWAY_PACK_PRICE)}</span>
                <span class="menu-price-note">per portion, packed</span>
              </div>
              <div class="menu-options">
                ${section.swallow ? `
                <label class="menu-select-wrap">
                  <span class="menu-select-label">Swallow</span>
                  <select class="menu-select" data-swallow>
                    ${SWALLOWS.map((s) => `<option value="${esc(s.id)}">${esc(s.name)}${s.price ? ` (+${naira(s.price)})` : ''}</option>`).join('')}
                  </select>
                </label>` : ''}
              </div>
              <div class="menu-actions">
                <div class="qty-stepper">
                  <button type="button" class="qty-btn" data-qty="-1" aria-label="Decrease quantity">−</button>
                  <span class="qty-value" data-qty-value>1</span>
                  <button type="button" class="qty-btn" data-qty="1" aria-label="Increase quantity">+</button>
                </div>
                <button type="button" class="btn-add" data-add>Add to cart</button>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
      ${section.id === 'protein' ? '<p class="menu-note">Choose your dishes, then send the order on WhatsApp. We’ll confirm availability and delivery from there.</p>' : ''}
    </section>
  `).join('');

  root.addEventListener('click', (e) => {
    const card = e.target.closest('.menu-card');
    if (!card) return;
    const qtyBtn = e.target.closest('[data-qty]');
    const addBtn = e.target.closest('[data-add]');
    if (qtyBtn) cardQty(card, Number(qtyBtn.dataset.qty));
    if (addBtn) {
      addFromCard(card);
      addBtn.textContent = 'Added';
      addBtn.disabled = true;
      setTimeout(() => { addBtn.textContent = 'Add to cart'; addBtn.disabled = false; }, 800);
    }
  });
}

function renderCart() {
  const items = loadCart();
  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.price * i.qty, 0);

  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = count;
    el.hidden = !count;
  });
  document.querySelectorAll('[data-cart-total]').forEach((el) => { el.textContent = naira(total); });

  const list = document.getElementById('cartList');
  const empty = document.getElementById('cartEmpty');
  const checkout = document.getElementById('cartCheckout');
  if (!list) return;

  empty.hidden = items.length > 0;
  checkout.hidden = !items.length;
  list.innerHTML = items.map((item) => `
    <li class="cart-item">
      <div class="cart-item-info">
        <strong>${esc(item.name)}</strong>
        <span>${naira(item.price)} each</span>
      </div>
      <div class="cart-item-controls">
        <button type="button" class="qty-btn" data-cart-qty="-1" data-id="${esc(item.id)}" aria-label="Decrease">−</button>
        <span class="qty-value">${item.qty}</span>
        <button type="button" class="qty-btn" data-cart-qty="1" data-id="${esc(item.id)}" aria-label="Increase">+</button>
        <button type="button" class="cart-item-remove" data-cart-qty="${-item.qty}" data-id="${esc(item.id)}" aria-label="Remove">×</button>
      </div>
    </li>
  `).join('');
}

function setCartOpen(open) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer) return;
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  overlay.classList.toggle('open', open);
  document.getElementById('cartToggle')?.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('cart-open', open);
}

function sendWhatsApp() {
  const items = loadCart();
  if (!items.length) return;
  const lines = items.map((i) => `• ${i.qty}× ${i.name} — ${naira(i.price)} each`);
  const total = items.reduce((n, i) => n + i.price * i.qty, 0);
  const text = `Hello Delta Kitchen & Grills 👋\n\nI'd like to place an order:\n\n${lines.join('\n')}\n\nTotal: ${naira(total)}\n\nThank you!`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}

renderMenu();
renderCart();

document.getElementById('cartToggle')?.addEventListener('click', () => {
  setCartOpen(!document.getElementById('cartDrawer')?.classList.contains('open'));
});
document.getElementById('cartClose')?.addEventListener('click', () => setCartOpen(false));
document.getElementById('cartOverlay')?.addEventListener('click', () => setCartOpen(false));
document.getElementById('cartWhatsApp')?.addEventListener('click', sendWhatsApp);
document.getElementById('cartList')?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-cart-qty]');
  if (btn) changeCartQty(btn.dataset.id, Number(btn.dataset.cartQty));
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setCartOpen(false); });