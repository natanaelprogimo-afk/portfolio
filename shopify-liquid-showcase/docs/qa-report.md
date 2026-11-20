# Informe de QA — VYRA Shopify Liquid Showcase

**Fecha:** 2026-11-20  
**Entorno:** Windows, Python 3.14 y Node.js 24.12.0; Shopify CLI ejecutado con `npx --yes @shopify/cli@latest`.  
**Repositorio:** [carpeta de demostración](https://github.com/natanaelprogimo-afk/portfolio/tree/shopify-liquid-demo-firox-20261120/shopify-liquid-showcase).

## Evidencia obtenida

- [x] Validación estática inicial en la PC: **18/18** verificaciones estructurales (versión inicial).
- [x] La primera ejecución de Shopify Theme Check detectó la ausencia de `locales/`; se reparó.
- [x] Segunda ejecución de Theme Check sobre la versión mínima: **9 archivos, sin infracciones**.
- [x] Tercera ejecución después de añadir plantillas de producto, carrito, colección y 404: **17 archivos, sin infracciones**, usando `--fail-level suggestion`.
- [x] El comando `shopify theme package` generó un ZIP local sin errores; comprobé el contenido: solo directorios soportados por Shopify.
- [x] Validación estructural ampliada: **88/88** comprobaciones propias superadas con Python 3.14.
- [ ] Shopify CLI `theme dev` en tienda de desarrollo: **no realizado**, falta acceso.
- [ ] Prueba de suscripción, trigger de marketing y envío de email: **no realizada**.
- [ ] Prueba de compra, disponibilidad, selección de variantes complejas: **no realizada**.
- [ ] Auditoría visual y Lighthouse contra una URL de vista previa Shopify: **no realizada**.

## Comandos reproducibles

```powershell
python scripts/verify.py
npx --yes @shopify/cli@latest theme check --path . --fail-level suggestion
npx --yes @shopify/cli@latest theme package --path .
```

## Qué significa "sin infracciones"

Theme Check analiza sintaxis, estructura y buenas prácticas de los archivos del theme. **No renderiza el theme usando un backend Shopify real ni garantiza conversión, compra, accesibilidad con lector de pantalla o seguridad comercial**.

## Estado

**Aprobado para revisión de código técnica, no para producción ni para prometer una integración de email marketing funcional.**

Para cerrar aceptación se requiere tienda de desarrollo autorizada, catálogo de prueba, preview, revisión manual mobile/desktop, prueba de carrito, consentimiento/automatizaciones de email y aceptación de objetivos del cliente.
