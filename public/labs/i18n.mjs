// Dedicated user-interface localization for browser demo error codes.
// Business logic remains locale-agnostic; unknown errors keep their original
// message rather than guessing or rewriting user-provided strings.
const es={
 CSV_SIZE:"El CSV debe ser texto y ocupar menos de 200 KB.",
 CSV_AFTER_QUOTE:"Se encontraron caracteres inesperados después de cerrar las comillas.",
 CSV_QUOTE:"Se encontraron comillas inesperadas dentro de un campo CSV.",
 CSV_UNCLOSED:"Hay un campo CSV entrecomillado sin cerrar.",
 CSV_EMPTY:"El CSV debe tener cabeceras y al menos una fila de datos.",
 CSV_HEADER_EMPTY:"El CSV contiene una cabecera vacía.",
 CSV_HEADER_DUPLICATE:"El CSV contiene cabeceras duplicadas.",
 CSV_COLUMNS:({line})=>"La fila "+line+" del CSV tiene un número incorrecto de campos.",
 PRICE_INVALID:"El precio debe ser un número no negativo con hasta dos decimales.",
 PRICE_RANGE:"El precio supera el límite seguro de centavos.",
 CATALOG_COLUMNS:({label,line})=>"El archivo "+label+", fila "+line+", debe incluir SKU y precio.",
 CATALOG_SKU_DUPLICATE:({label})=>"El archivo "+label+" contiene identificadores SKU duplicados.",
 KEY_LENGTH:"La clave de idempotencia debe contener entre 1 y 96 caracteres.",
 KEY_LIMIT:"El laboratorio alcanzó el límite de 500 claves. Restablece la simulación para continuar.",
 JSON_SIZE:"El JSON supera el límite de 200 KB.",
 JSON_INVALID:"El contenido no es JSON válido.",
 EVENTS_ARRAY:"Se requiere una lista de hasta 5000 eventos.",
 EVENT_DATE:({index})=>"El evento "+index+" requiere una fecha válida con formato AAAA-MM-DD.",
 EVENT_DURATION:({index})=>"El evento "+index+" requiere duration_ms entre 0 y 60000.",
 EVENT_OK:({index})=>"El evento "+index+" requiere el campo booleano ok.",
 REPORT_TABLE:"El informe CSV necesita una tabla válida dentro de los límites permitidos.",
 KEY_CONFLICT:"Se reutilizó la clave con datos diferentes.",
 KEY_UNCERTAIN:"No se conoce el resultado de la ejecución anterior. Revisión manual necesaria.",
 KEY_SIMULATED_FAILURE:"Fallo incierto simulado; no se reintenta automáticamente.",
 KEY_RECORDED:"Acción registrada una sola vez."
};
export function translateLabError(error,locale){
 if(locale!=="es")return error instanceof Error?error.message:String(error);
 if(error instanceof SyntaxError)return es.JSON_INVALID;
 const entry=es[error?.code];
 if(!entry)return error instanceof Error?error.message:String(error);
 return typeof entry==="function"?entry(error.details??{}):entry;
}
export function localizeLedgerResult(result,locale){
 if(result===null || typeof result!=="object" || !result.messageCode)return result;
 const {messageCode,...copy}=result;
 if(locale==="es"&&es[messageCode])copy.message=es[messageCode];
 return copy;
}
