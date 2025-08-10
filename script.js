const PRODUCTS = [
  { id: 'classic', name: 'Classic Burger', description: 'Pão brioche, blend 160g, queijo prato, alface, tomate e maionese da casa.', price: 28.9, category: 'Burgers', image: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?q=80&w=800&auto=format&fit=crop' },
  { id: 'cheddar-bbq', name: 'Cheddar BBQ', description: 'Blend 160g, cheddar cremoso e molho barbecue.', price: 31.9, category: 'Burgers', image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=800&auto=format&fit=crop' },
  { id: 'bacon-duplo', name: 'Bacon Duplo', description: 'Dois blends 120g, bacon crocante e maionese defumada.', price: 38.5, category: 'Burgers', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop' },
  { id: 'veggie', name: 'Veggie Garden', description: 'Burger de grão-de-bico 140g, queijo, alface e tomate.', price: 29.5, category: 'Veggie', image: 'https://images.unsplash.com/photo-1607013407469-8fbc0b6f7a6a?q=80&w=800&auto=format&fit=crop' },
  { id: 'fritas', name: 'Fritas crocantes', description: 'Porção individual de batatas crocantes.', price: 12.9, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop' },
  { id: 'onion', name: 'Onion Rings', description: 'Anéis de cebola empanados.', price: 16.9, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=800&auto=format&fit=crop' },
  { id: 'refrigerante', name: 'Refrigerante lata', description: 'Coca, Guaraná, Fanta.', price: 7.9, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop' },
  { id: 'milkshake', name: 'Milkshake Chocolate', description: 'Milkshake cremoso de chocolate belga.', price: 18.9, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=800&auto=format&fit=crop' },
  { id: 'combo-classic', name: 'Combo Classic (burger + fritas + refri)', description: 'Classic Burger + Fritas crocantes + Refrigerante lata.', price: 44.9, category: 'Combos', image: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?q=80&w=800&auto=format&fit=crop' },
  { id: 'combo-bacon', name: 'Combo Bacon (burger + fritas + refri)', description: 'Bacon Duplo + Fritas crocantes + Refrigerante lata.', price: 54.9, category: 'Combos', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop' },
  { id: 'combo-veggie', name: 'Combo Veggie (burger + fritas + refri)', description: 'Veggie Garden + Fritas crocantes + Refrigerante lata.', price: 46.9, category: 'Combos', image: 'https://images.unsplash.com/photo-1607013407469-8fbc0b6f7a6a?q=80&w=800&auto=format&fit=crop' },
];

const WHATSAPP_NUMBER = '5599999999999';
const BUSINESS = { deliveryFee: 7.5, open: { from: 18, to: 23 } };
const ADDONS = [
  { id: 'extra-cheese', name: 'Queijo extra', price: 3.5 },
  { id: 'bacon', name: 'Bacon', price: 4.5 },
  { id: 'egg', name: 'Ovo', price: 3.0 },
  { id: 'pickles', name: 'Picles', price: 2.5 },
  { id: 'jalapeno', name: 'Jalapeño', price: 2.5 },
  { id: 'special-sauce', name: 'Molho especial', price: 2.9 },
  { id: 'double-patty', name: 'Dobro de carne', price: 8.9 },
];

const formatBRL = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const state = {
  items: new Map(), // key -> { product, qty }
  search: '',
  category: 'Todos',
  method: 'retirada',
  address: '',
  open: true,
  customizing: null,
};

const STORAGE_KEYS = {
  cart: 'sa_cart_v1',
  prefs: 'sa_prefs_v1',
};

const els = {
  productsGrid: document.getElementById('products-grid'),
  tabs: document.getElementById('category-tabs'),
  search: document.getElementById('search-input'),
  cart: document.getElementById('cart'),
  cartOverlay: document.getElementById('cart-overlay'),
  cartItems: document.getElementById('cart-items'),
  cartCount: document.getElementById('cart-count'),
  fabCount: document.getElementById('fab-count'),
  total: document.getElementById('cart-total'),
  grandTotal: document.getElementById('cart-grand-total'),
  openCart: document.getElementById('open-cart'),
  openCartHero: document.getElementById('open-cart-hero'),
  openCartFooter: document.getElementById('open-cart-footer'),
  closeCart: document.getElementById('close-cart'),
  fabCart: document.getElementById('fab-cart'),
  checkout: document.getElementById('checkout'),
  year: document.getElementById('year'),
  whatsappContact: document.getElementById('whatsapp-contact'),
  whatsappFooter: document.getElementById('whatsapp-footer'),
  methodPickup: document.getElementById('method-pickup'),
  methodDelivery: document.getElementById('method-delivery'),
  deliveryFields: document.getElementById('delivery-fields'),
  cep: document.getElementById('cep'),
  address: document.getElementById('address'),
  deliveryFee: document.getElementById('delivery-fee'),
  storeStatus: document.getElementById('store-status'),
  modal: document.getElementById('customize-modal'),
  modalOverlay: document.getElementById('modal-overlay'),
  closeModal: document.getElementById('close-modal'),
  cancelCustomize: document.getElementById('cancel-customize'),
  confirmCustomize: document.getElementById('confirm-customize'),
  customizeBody: document.getElementById('customize-body'),
};

function getCategories() {
  const base = Array.from(new Set(PRODUCTS.map((p) => p.category)));
  return ['Todos', ...base];
}

function renderTabs() {
  const categories = getCategories();
  els.tabs.innerHTML = '';
  categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(state.category === cat));
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      state.category = cat;
      renderTabs();
      renderProducts();
    });
    els.tabs.appendChild(btn);
  });
}

function matchesFilters(product) {
  const matchesCategory = state.category === 'Todos' || product.category === state.category;
  const q = state.search.trim().toLowerCase();
  const matchesSearch = !q || product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q);
  return matchesCategory && matchesSearch;
}

function getQtyForProduct(productId) {
  let sum = 0;
  for (const [key, { qty }] of state.items.entries()) {
    if (key === productId || key.startsWith(productId + '|')) sum += qty;
  }
  return sum;
}

function renderProducts() {
  els.productsGrid.innerHTML = '';
  const items = PRODUCTS.filter(matchesFilters);
  if (items.length === 0) {
    els.productsGrid.innerHTML = '<p style="color: var(--muted);">Nenhum item encontrado.</p>';
    return;
  }
  for (const product of items) {
    const wrapper = document.createElement('article');
    wrapper.className = 'product';
    wrapper.innerHTML = `
      <img src="${product.image}" alt="${product.name}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='./icons/placeholder.svg'" loading="lazy" />
      <div>
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <div class="price">${formatBRL(product.price)}</div>
      </div>
      <div style="display:grid; gap:8px; justify-items:end;">
        <div class="qty">
          <button aria-label="Diminuir" data-action="dec">−</button>
          <span data-role="qty">0</span>
          <button aria-label="Aumentar" data-action="inc">+</button>
        </div>
        <button class="btn btn-ghost" data-action="customize">Personalizar</button>
      </div>
    `;

    const qtyEl = wrapper.querySelector('[data-role="qty"]');
    const btnInc = wrapper.querySelector('[data-action="inc"]');
    const btnDec = wrapper.querySelector('[data-action="dec"]');
    const btnCustomize = wrapper.querySelector('[data-action="customize"]');

    qtyEl.textContent = String(getQtyForProduct(product.id));

    btnInc.addEventListener('click', () => addItem(product));
    btnDec.addEventListener('click', () => removeItem(product.id));
    btnCustomize.addEventListener('click', () => openCustomize(product));

    els.productsGrid.appendChild(wrapper);
  }
}

function generateKey(productId, addonIds = [], obs = '') {
  if (!addonIds.length && !obs) return productId;
  const extrasKey = addonIds.slice().sort().join(',');
  const obsKey = obs ? obs.replace(/\s+/g, ' ').slice(0, 60) : '';
  return `${productId}|${extrasKey}|${obsKey}`;
}

function addItem(product, qty = 1, opts = null) {
  const addonIds = opts?.addons ?? [];
  const obs = opts?.obs ?? '';
  const key = generateKey(product.id, addonIds, obs);
  const extrasTotal = addonIds.reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price ?? 0), 0);
  const nameWithExtras = buildCustomizedName(product.name, addonIds, obs);
  const unitPrice = product.price + extrasTotal;
  const existing = state.items.get(key);
  const newQty = (existing?.qty ?? 0) + qty;
  const cartProduct = existing?.product ?? { ...product, name: nameWithExtras, price: unitPrice };
  state.items.set(key, { product: cartProduct, qty: newQty });
  syncUI();
}

function removeItem(keyOrProductId, qty = 1) {
  // if called with base product id from grid, prefer exact base key first
  let key = keyOrProductId;
  if (!state.items.has(key)) {
    // operate on base key if exists
    if (state.items.has(keyOrProductId)) key = keyOrProductId; else return;
  }
  const existing = state.items.get(key);
  if (!existing) return;
  const newQty = existing.qty - qty;
  if (newQty <= 0) state.items.delete(key);
  else state.items.set(key, { product: existing.product, qty: newQty });
  syncUI();
}

function getTotals() {
  let total = 0;
  let count = 0;
  for (const { product, qty } of state.items.values()) {
    total += product.price * qty;
    count += qty;
  }
  const deliveryFee = state.method === 'entrega' && count > 0 ? BUSINESS.deliveryFee : 0;
  const grandTotal = total + deliveryFee;
  return { total, count, deliveryFee, grandTotal };
}

function renderCart() {
  els.cartItems.innerHTML = '';
  if (state.items.size === 0) {
    els.cartItems.innerHTML = '<p style="color: var(--muted);">Seu carrinho está vazio.</p>';
    els.total.textContent = formatBRL(0);
    els.grandTotal.textContent = formatBRL(0);
    return;
  }
  for (const [key, { product, qty }] of state.items.entries()) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='./icons/placeholder.svg'" loading="lazy" />
      <div>
        <h5>${product.name}</h5>
        <div class="muted">${formatBRL(product.price)} • <span data-role="line">${formatBRL(product.price * qty)}</span></div>
      </div>
      <div class="qty">
        <button aria-label="Diminuir" data-action="dec">−</button>
        <span data-role="qty">${qty}</span>
        <button aria-label="Aumentar" data-action="inc">+</button>
      </div>
    `;

    const btnInc = item.querySelector('[data-action="inc"]');
    const btnDec = item.querySelector('[data-action="dec"]');
    btnInc.addEventListener('click', () => addItem(product));
    btnDec.addEventListener('click', () => removeItem(key));
    els.cartItems.appendChild(item);
  }
  const { total, grandTotal } = getTotals();
  els.total.textContent = formatBRL(total);
  els.grandTotal.textContent = formatBRL(grandTotal);
}

function syncUI() {
  renderProducts();
  renderCart();
  const { count, deliveryFee } = getTotals();
  els.cartCount.textContent = String(count);
  els.fabCount.textContent = String(count);
  els.deliveryFee.textContent = formatBRL(deliveryFee);
  els.deliveryFields.hidden = state.method !== 'entrega';
  els.address.value = state.address;
  updateStoreOpenStatus();
  persistState();
}

function openCart() {
  els.cart.classList.add('open');
  els.cart.setAttribute('aria-hidden', 'false');
  els.cartOverlay.hidden = false;
}
function closeCart() {
  els.cart.classList.remove('open');
  els.cart.setAttribute('aria-hidden', 'true');
  els.cartOverlay.hidden = true;
}

function buildWhatsappMessage() {
  if (state.items.size === 0) return '';
  const lines = ['Olá! Gostaria de fazer um pedido:', ''];
  for (const { product, qty } of state.items.values()) {
    lines.push(`- ${product.name} x${qty} — ${formatBRL(product.price * qty)}`);
  }
  const { total, deliveryFee, grandTotal } = getTotals();
  lines.push('', `Subtotal: ${formatBRL(total)}`);
  if (state.method === 'entrega') {
    lines.push(`Entrega: ${formatBRL(deliveryFee)}`);
    lines.push(`Endereço: ${state.address || '(informar)'}`);
  } else {
    lines.push('Retirada no balcão');
  }
  lines.push(`Total: ${formatBRL(grandTotal)}`);
  return encodeURIComponent(lines.join('\n'));
}

function handleCheckout() {
  if (!state.open) return;
  const msg = buildWhatsappMessage();
  if (!msg) return;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  window.open(url, '_blank');
}

function init() {
  els.year.textContent = new Date().getFullYear();
  els.whatsappContact.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  els.whatsappFooter && (els.whatsappFooter.href = `https://wa.me/${WHATSAPP_NUMBER}`);

  els.openCart?.addEventListener('click', openCart);
  els.openCartHero?.addEventListener('click', openCart);
  els.openCartFooter?.addEventListener('click', openCart);
  els.closeCart?.addEventListener('click', closeCart);
  els.fabCart?.addEventListener('click', openCart);
  els.cartOverlay?.addEventListener('click', closeCart);
  els.checkout?.addEventListener('click', handleCheckout);
  // tema
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
  els.search?.addEventListener('input', (e) => { state.search = e.target.value; renderProducts(); });
  els.methodPickup?.addEventListener('change', () => { state.method = 'retirada'; syncUI(); });
  els.methodDelivery?.addEventListener('change', () => { state.method = 'entrega'; syncUI(); });
  els.address?.addEventListener('input', (e) => { state.address = e.target.value; });
  els.cep?.addEventListener('input', handleCepInput);

  restoreState();
  renderTabs();
  renderProducts();
  renderCart();
  syncUI();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }
  // aplicar tema salvo
  applySavedTheme();
}

document.addEventListener('DOMContentLoaded', init);

// --------- Personalização (modal) ---------
function openCustomize(product) {
  state.customizing = { product, addons: new Set(), obs: '' };
  els.customizeBody.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'addon-list';
  ADDONS.forEach((addon) => {
    const row = document.createElement('label');
    row.className = 'addon';
    row.innerHTML = `
      <span>${addon.name}</span>
      <span>${formatBRL(addon.price)} <input type="checkbox" data-addon="${addon.id}" /></span>
    `;
    list.appendChild(row);
  });
  const obs = document.createElement('div');
  obs.className = 'obs';
  obs.innerHTML = `
    <label>Observações</label>
    <textarea id="obs"></textarea>
  `;
  els.customizeBody.appendChild(list);
  els.customizeBody.appendChild(obs);
  openModal();
}

function openModal() {
  els.modal.classList.add('open');
  els.modal.setAttribute('aria-hidden', 'false');
  els.modalOverlay.hidden = false;
}
function closeModal() {
  els.modal.classList.remove('open');
  els.modal.setAttribute('aria-hidden', 'true');
  els.modalOverlay.hidden = true;
}
els.closeModal?.addEventListener('click', closeModal);
els.cancelCustomize?.addEventListener('click', closeModal);
els.modalOverlay?.addEventListener('click', closeModal);

els.confirmCustomize?.addEventListener('click', () => {
  if (!state.customizing) return closeModal();
  const selectedAddons = Array.from(els.customizeBody.querySelectorAll('input[type="checkbox"][data-addon]:checked'))
    .map((el) => el.getAttribute('data-addon'));
  const obsText = els.customizeBody.querySelector('#obs')?.value?.trim() ?? '';
  addItem(state.customizing.product, 1, { addons: selectedAddons, obs: obsText });
  closeModal();
});

function buildCustomizedName(base, addonIds, obs) {
  const names = addonIds.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean);
  const extras = names.length ? ` (+ ${names.join(', ')})` : '';
  const note = obs ? ` [obs: ${obs}]` : '';
  return base + extras + note;
}

// --------- Horário de funcionamento ---------
function updateStoreOpenStatus() {
  const now = new Date();
  const hour = now.getHours();
  const isOpen = hour >= BUSINESS.open.from && hour < BUSINESS.open.to;
  state.open = isOpen;
  els.storeStatus.hidden = isOpen;
  if (!isOpen) {
    els.storeStatus.textContent = `Estamos fechados agora. Funcionamos das ${String(BUSINESS.open.from).padStart(2, '0')}h às ${String(BUSINESS.open.to).padStart(2, '0')}h.`;
  }
  if (els.checkout) els.checkout.disabled = !isOpen;
}

// --------- Tema Claro/Escuro ---------
function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
}

function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

// --------- Persistência ---------
function persistState() {
  try {
    const cartEntries = Array.from(state.items.entries()).map(([key, { product, qty }]) => [key, { p: product, q: qty }]);
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cartEntries));
    const prefs = { method: state.method, address: state.address };
    localStorage.setItem(STORAGE_KEYS.prefs, JSON.stringify(prefs));
  } catch {}
}

function restoreState() {
  try {
    const rawCart = localStorage.getItem(STORAGE_KEYS.cart);
    if (rawCart) {
      const entries = JSON.parse(rawCart);
      state.items = new Map(entries.map(([key, v]) => [key, { product: v.p, qty: v.q }]));
    }
    const rawPrefs = localStorage.getItem(STORAGE_KEYS.prefs);
    if (rawPrefs) {
      const prefs = JSON.parse(rawPrefs);
      if (prefs.method) state.method = prefs.method;
      if (prefs.address) state.address = prefs.address;
    }
  } catch {}
}

// --------- CEP (ViaCEP) ---------
async function handleCepInput(e) {
  const raw = (e.target.value || '').replace(/\D/g, '').slice(0, 8);
  e.target.value = raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw;
  if (raw.length !== 8) return;
  try {
    const resp = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
    const data = await resp.json();
    if (!data.erro) {
      const rua = data.logradouro || '';
      const bairro = data.bairro || '';
      const cidade = data.localidade || '';
      const uf = data.uf || '';
      const composed = [rua, bairro, cidade && `${cidade}-${uf}`].filter(Boolean).join(', ');
      state.address = composed;
      if (els.address) els.address.value = composed;
      persistState();
      syncUI();
    }
  } catch {}
}

