# Shopify Liquid Showcase — VYRA / Firox

**Demo técnica personal (20/11/2026)** desarrollada para acreditar familiaridad con el desarrollo de temas Shopify Online Store 2.0. No representa trabajo previo con clientes ni una tienda ya publicada.

## Componentes implementados

- \`layout/theme.liquid\`: layout con \`content_for_header\`, \`content_for_layout\`, navegación y accesibilidad básica.
- \`sections/vyra-featured-collection.liquid\`: sección editable desde el editor de Shopify; selección de colección, columnas y cantidad de productos.
- \`snippets/vyra-product-card.liquid\`: tarjeta reutilizable con imagen responsive, título escapado, precio, descuento y stock.
- \`sections/vyra-benefits.liquid\`: bloques configurables para comunicar beneficios desde el editor.
- \`sections/vyra-newsletter.liquid\`: formulario nativo de suscripción con etiqueta \`newsletter\`, aceptación explícita y estados de error/éxito.
- \`assets/vyra-showcase.css\`: diseño responsive, estados de foco visibles y respeto a movimiento reducido.
- \`docs/email-marketing-plan.md\`: propuesta de automatización de email marketing **no implementada**.

## Cómo probar

1. Tener acceso a una tienda Shopify de desarrollo y Shopify CLI instalado.
2. Desde esta carpeta, ejecutar \`python3 scripts/verify.py\` (validación estática local).
3. Ejecutar \`shopify theme check\` para validación oficial de Liquid y buenas prácticas.
4. Ejecutar \`shopify theme dev --store TU-TIENDA.myshopify.com\` para previsualizar en Shopify, o usar una carga ZIP desde el administrador.
5. Desde el editor del tema, asignar una colección a «Colección destacada» y comprobar productos, precios, variantes en su ficha y comportamiento responsive.
6. Para probar el formulario, utilizar únicamente una tienda de desarrollo y una dirección de prueba autorizada.

## Alcance y límites

El paquete es una **muestra mínima de código**, no un tema comercial terminado: no implementa todas las plantillas de catálogo, producto, carrito, búsqueda o cuenta. No se ha verificado con Shopify CLI ni en una tienda Shopify real. Los tests incluidos son estructurales y no sustituyen esa verificación.

El formulario usa el mecanismo nativo de suscripción de Shopify, pero **no configura flujos de email marketing**. Para automatizaciones, ver la guía de implementación y pruebas.

Trabajo original preparado como evidencia de aprendizaje y capacidad de desarrollo. No se atribuyen certificaciones, clientes, conversiones ni trabajos anteriores inexistentes.
