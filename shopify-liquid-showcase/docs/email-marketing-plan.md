# Email marketing: alcance real y automatización propuesta

Esta demo usa el formulario nativo de Shopify \`{% form 'customer' %}\` y la etiqueta \`newsletter\`. El correo es procesado por Shopify cuando el tema está instalado en una tienda real. No envía campañas por su cuenta, ni contiene credenciales, APIs de terceros o secuencias automáticas.

## Cómo implementar una automatización en una tienda real

1. Confirmar la política de privacidad, el consentimiento y el tratamiento de datos de la tienda.
2. Instalar/configurar Shopify Email y/o Shopify Flow, según las funciones disponibles en esa tienda.
3. Crear un segmento de suscriptores con estado de marketing habilitado.
4. Definir el evento de entrada y enviar un email de bienvenida con una plantilla aprobada por la marca.
5. Añadir condición para evitar envíos duplicados, límites de frecuencia y tratamiento de desuscripciones.
6. Probar con una dirección controlada y revisar el estado real de opt-in, el envío y la baja.
7. Medir entregabilidad, apertura (orientativa), clics y conversiones; nunca mezclar tests con datos de clientes.

**Pendiente de prueba real:** acceso a una tienda de desarrollo, configuración de email marketing, consentimiento registrado, pruebas de entrega y revisión de contenido comercial.

Documentación Shopify:
- https://shopify.dev/docs/storefronts/themes/customer-engagement/email-consent
- https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-email
