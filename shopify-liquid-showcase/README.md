# Shopify Liquid Showcase — VYRA / Firox

**Demo técnica personal creada el 20/11/2026** para evaluar capacidad con Shopify Online Store 2.0, Liquid, arquitectura modular, accesibilidad, rendimiento y flujos de ecommerce.

**No es un trabajo anterior para clientes, una certificación, ni una tienda Shopify ya probada en producción.**

## Qué incluye

| Componente | Implementación |
|---|---|
| Inicio | Sección configurable de colección destacada |
| Productos | Snippet reusable con \`image_url\`, \`image_tag\`, precios, descuentos y stock |
| Editor | Sección de beneficios con bloques editables y presets |
| Producto | Formulario Liquid, selector básico de variantes, precio y cantidad |
| Colección | Listado paginado de 12 productos por página |
| Carrito | Cantidades, eliminar productos, subtotal y botón de checkout |
| Newsletter | Formulario nativo de Shopify con consentimiento requerido, mensajes de error/éxito |
| Arquitectura | Layout, CSS responsive, JS mínimo progresivo, 5 JSON templates, locale |
| Documentación | Guía Shopify Messaging/Flow, matriz de QA y limitaciones |

### Código clave

- \`sections/vyra-featured-collection.liquid\` y \`snippets/vyra-product-card.liquid\`
- \`sections/vyra-main-product.liquid\`
- \`sections/vyra-main-cart.liquid\`
- \`sections/vyra-main-collection.liquid\`
- \`sections/vyra-newsletter.liquid\`
- \`docs/email-marketing-plan.md\`

## Verificación local

Desde \`shopify-liquid-showcase/\`:

\`\`\`powershell
python scripts/verify.py
npx --yes @shopify/cli@latest theme check --path . --fail-level suggestion
npx --yes @shopify/cli@latest theme package --path .
\`\`\`

En Windows, con Node.js y Python instalados, estos comandos pueden ejecutarse sin cuenta Shopify para la inspección estática y el empaquetado. Para la integración real se requiere una tienda autorizada.

Consultar \`docs/qa-report.md\` y \`docs/qa-checklist.md\` para resultados y pruebas pendientes.

## Probar en una tienda real

1. Obtener acceso autorizado a una **tienda de desarrollo**, sin sobrescribir el tema publicado.
2. Utilizar Shopify CLI para previsualizar este tema como development theme: \`shopify theme dev --store TIENDA.myshopify.com\`.
3. Crear productos y variantes de prueba, asignar una colección y comprobar cinco plantillas: Inicio, Producto, Colección, Carrito y 404.
4. Probar cambio de variantes, stock y cantidad; agregar/quitar productos, modificar cantidades, continuar al checkout de prueba.
5. Suscribirse con email de prueba autorizado; verificar consentimiento y que el campo se registra como cliente en el admin.
6. Configurar y verificar un flujo de bienvenida en Shopify Messaging; para automatizaciones personalizadas, usar Shopify Flow según requisitos.
7. Ejecutar Lighthouse y revisión real mobile/desktop, accesibilidad y regresión.

## Alcance y limitaciones

- **Código de demostración, no theme comercial listo para producción.** No se ha probado en una tienda Shopify real.
- El selector de variantes demuestra flujo básico y puede no servir en productos complejos (múltiples opciones, más de 250 variantes, selling plans, etc.).
- El checkout requiere la configuración de Shopify, productos y precios válidos. No hay un pago real de prueba completado.
- El newsletter **no configura ni ejecuta automatizaciones**, solo solicita suscripción con el formulario nativo.
- El diseño usa texto en español y es una demo enfocada, no una implementación de todos los componentes de Dawn o Horizon.
- Las credenciales y datos reales de clientes no forman parte del repositorio.

## Referencias oficiales

- [Theme architecture](https://shopify.dev/docs/storefronts/themes/architecture)
- [Theme Check](https://shopify.dev/docs/storefronts/themes/tools/theme-check)
- [Variants](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants)
- [Cart](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart)
- [Newsletter consent](https://shopify.dev/docs/storefronts/themes/customer-engagement/email-consent)
- [Shopify Messaging](https://help.shopify.com/es/manual/promoting-marketing/create-marketing/shopify-messaging/marketing-automations)
