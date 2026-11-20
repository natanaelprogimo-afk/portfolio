# Email marketing para Shopify — propuesta técnica 2026

## Alcance implementado en esta demo

`sections/vyra-newsletter.liquid` incorpora un `{% form 'customer' %}` con `contact[email]`, etiqueta `newsletter`, opt-in explícito mediante checkbox requerido y mensajes de estado. En una tienda real, este formulario nativo permite registrar la suscripción; **no envía mensajes, no configura segmentos ni crea automatizaciones por sí solo**. El registro de consentimiento se debe comprobar en Shopify Admin usando exclusivamente emails de prueba autorizados.

## Situación actual de la plataforma

Shopify trasladó las automatizaciones de email marketing basadas en Shopify Email a la app **Shopify Messaging** a partir del 24 de marzo de 2026. Para workflows personalizados e integraciones externas sigue disponible **Shopify Flow**. No recomendamos arrancar un trabajo nuevo configurando flujos antiguos sin verificar el sistema actual de la tienda.

Fuentes:
- https://help.shopify.com/es/manual/promoting-marketing/create-marketing/marketing-automations/types
- https://help.shopify.com/es/manual/promoting-marketing/create-marketing/shopify-messaging/marketing-automations
- https://shopify.dev/docs/storefronts/themes/customer-engagement/email-consent

## Implementación profesional propuesta (requiere acceso autorizado)

1. **Descubrimiento**: acordar evento de disparo (newsletter, carrito abandonado, postcompra), objetivo, mensaje, público, condiciones, horas, idioma, permisos y presupuesto.
2. **Auditoría de estado**: revisar apps instaladas, segmentación, configuraciones de privacidad, flujos existentes, suscriptores y duplicados. No activar nuevas campañas antes de comprobar duplicados.
3. **Consentimiento**: verificar que solo se disparan comunicaciones promocionales a contactos que han optado por ese canal; validar bajas y restricciones por región.
4. **Flujo de bienvenida**: en Shopify Messaging crear o adaptar la automatización de bienvenida para nuevos suscriptores, con marca, remitente validado, plantilla accesible, enlaces verificables y CTA medible.
5. **Personalización**: si se necesita lógica no disponible en Messaging, implementar un Flow con disparador preciso, condiciones de estado de consentimiento, filtros, ventanas de tiempo e idempotencia contra doble envío.
6. **QA en sandbox**: suscriptor nuevo autorizado → registro y opt-in → activación única → email recibido → enlaces funcionan → baja; repetir con email inválido, no suscrito, usuario previo y flujo duplicado.
7. **Observabilidad**: medir envíos, entregabilidad, rebotes, clics y conversiones por UTM. Las aperturas pueden no ser fiables por protección de privacidad.
8. **Despliegue y reversión**: capturar configuración anterior, publicar cambios por etapas y dejar un procedimiento de reversión explícito.

## Riesgos y dependencias

- Shopify Messaging, disponibilidad de plantillas, volumen y funciones dependen del plan, país, versión de la app y configuración de la tienda.
- Shopify Flow y otras apps podrían requerir permisos adicionales; revisar antes de operar.
- No hay acceso a una tienda de cliente ni se han ejecutado envíos reales. No afirmar "email automatizado funcionando" sin evidencia.
- Evitar almacenar claves o listas de destinatarios reales en GitHub. No cargar bases de datos de clientes a una demo pública.

## Definition of done

Una automatización se considera **validada** únicamente después de verificar en la tienda: consentimiento real, disparo, entrega de prueba, frecuencia, baja, métricas y reversión.
