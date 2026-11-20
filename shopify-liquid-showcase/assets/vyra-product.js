/* Minimal progressive enhancement; native Shopify product form remains usable without JS. */
document.addEventListener('change', (event) => {
  const selector = event.target.closest('[data-vyra-variant-selector]');
  if (!selector) return;

  const option = selector.selectedOptions[0];
  if (!option) return;

  const price = document.getElementById(selector.dataset.priceTarget);
  const button = document.getElementById(selector.dataset.buttonTarget);
  if (price) price.textContent = option.dataset.price || '';
  if (button) {
    const available = option.dataset.available === 'true';
    button.disabled = !available;
    button.textContent = available ? 'Agregar al carrito' : 'Agotado';
  }

  const url = new URL(window.location.href);
  url.searchParams.set('variant', option.value);
  window.history.replaceState({}, '', url.toString());
});
