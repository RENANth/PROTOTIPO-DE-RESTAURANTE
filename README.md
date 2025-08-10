# Hamburgueria — Loja estática

Loja bonita e responsiva com cardápio, carrinho, personalização (adicionais/observações) e checkout via WhatsApp. Inclui PWA, SEO/OG, JSON-LD, CEP (ViaCEP) e persistência do carrinho.

## Como usar
- Abra `index.html` no navegador (duplo clique).
- No celular, adicione à tela inicial para testar o PWA.

## Personalização rápida
- WhatsApp (com DDI) — `script.js`:
```js
const WHATSAPP_NUMBER = '55SEUNUMERO';
```
- Taxa e horário — `script.js`:
```js
const BUSINESS = { deliveryFee: 7.5, open: { from: 18, to: 23 } };
```
- Cardápio e combos — `script.js` (array `PRODUCTS`). Ex.: 
```js
{ id: 'classic', name: 'Classic Burger', price: 28.9, category: 'Burgers', image: './assets/classic.jpg' }
```
- Adicionais — `script.js` (array `ADDONS`).
- Cores — `styles.css` (variáveis em `:root`).
- Logo — coloque sua arte em `icons/logo.png` (512x512 recomendado).

## Entrega e CEP
- Selecione “Entrega” no carrinho para exibir CEP e endereço.
- CEP usa ViaCEP para auto-preencher.

## Persistência
- Carrinho, método e endereço salvos no `localStorage`.

## Estrutura
```
index.html
styles.css
script.js
manifest.webmanifest
service-worker.js
icons/
  ├─ icon.svg
  ├─ logo.png
  └─ placeholder.svg
```

## Publicação (opcional)
- GitHub Pages/Netlify/Vercel: basta enviar estes arquivos (site estático).

## Dúvidas comuns
- Imagens: prefira locais em `assets/` (há fallback `icons/placeholder.svg`).
- WhatsApp: use número com DDI (ex.: `55` + DDD + número, sem símbolos).
