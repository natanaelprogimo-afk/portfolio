# Matriz QA antes de ofrecer un theme a un cliente

## Calidad automatizada
- [x] Esquemas Liquid y archivos JSON validados con comprobaciones estáticas.
- [x] Estructura principal con page templates product, collection, cart e index.
- [x] Ejecutar `shopify theme check --fail-level error` y guardar el reporte con la versión exacta.
- [x] Ejecutar `shopify theme check --fail-level suggestion` y clasificar cada sugerencia.
- [x] Ejecutar `shopify theme package` y comprobar que el ZIP contiene un theme válido.
- [ ] Ejecutar auditoría Lighthouse en una URL **real** de preview Shopify (no HTML simulado).

## Funciones en Shopify (no realizadas; requieren tienda de desarrollo)
- [ ] Home: colección, imágenes, precio/promoción y stock correcto.
- [ ] Editor: cambio de colección, cantidad, columnas y edición de bloques.
- [ ] Página de producto: variante por defecto, variante agotada, precio correcto, cantidad.
- [ ] Carrito: sumar producto, cambiar cantidades, quitar líneas y finalizar compra (sin pagar).
- [ ] Páginas: colección paginada, 404, links locales y página de producto real.
- [ ] Newsletter: registro real de opt-in en cliente de prueba; baja; errores del formulario.
- [ ] Automatización: flujo de bienvenida en Shopify Messaging habilitado solo en entorno autorizado.
- [ ] Automatizaciones duplicadas, permiso de envío y tratamiento de bajas.
- [ ] Pantallas 320, 375, 768, 1024, 1440 px; teclado completo, foco, contraste y zoom 200%.
- [ ] Lectores de pantalla, roles, etiquetas y mensajes de estado.
- [ ] Rendimiento web: LCP, CLS, INP, scripts y carga de imágenes en primer viewport.
- [ ] Aceptación del cliente: alcance, revisión de cambios, staging/backup y reversión.

## Límites explícitos
- Demostración técnica personal, **no theme completo para producción**.
- Selector de variantes deliberadamente simple; catálogos con más de 250 variantes u opciones de compra complejas requieren un selector robusto.
- Un tema de cliente existente debe editarse sobre su propia rama o duplicado, preservando integraciones y evitando regresiones.
- Ningún dato de marketing se ha obtenido, ni se ha enviado correo a clientes reales.
