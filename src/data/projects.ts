export type Locale = "en" | "es";
export type ProjectGroup = "systems" | "product" | "client";

export interface Project {
  id: string;
  number: string;
  name: string;
  group: ProjectGroup;
  category: Record<Locale, string>;
  status: Record<Locale, string>;
  summary: Record<Locale, string>;
  challenge: Record<Locale, string>;
  approach: Record<Locale, string>;
  evidence: Record<Locale, string>;
  technologies: string[];
  source?: string;
}

export const projects: Project[] = [
  {
    id: "ai-automation",
    number: "01",
    name: "AI Automation Factory",
    group: "systems",
    category: { en: "AI systems / backend", es: "Sistemas de IA / backend" },
    status: { en: "Private · In development", es: "Privado · En desarrollo" },
    summary: {
      en: "An agent-oriented application with API workflows, human approval checkpoints, and operational controls for responsible automation.",
      es: "Una aplicación orientada a agentes con flujos de API, aprobaciones humanas y controles operativos para automatización responsable."
    },
    challenge: {
      en: "Automation needs more than a model response: actions must be controlled, observable and safe to retry.",
      es: "La automatización exige más que respuestas de modelos: las acciones deben controlarse, observarse y admitir reintentos seguros."
    },
    approach: {
      en: "Worked on a full-stack architecture spanning an API, agent execution, approvals, idempotency, limits and an operational dashboard.",
      es: "Trabajé en una arquitectura full-stack con API, ejecución de agentes, aprobaciones, idempotencia, límites y panel operativo."
    },
    evidence: {
      en: "Private source. Architecture and a technical walkthrough can be discussed without exposing credentials or customer data.",
      es: "Código privado. Puedo explicar la arquitectura y el funcionamiento técnico sin exponer credenciales ni datos de clientes."
    },
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Redis"]
  },
  {
    id: "vyra-fitness",
    number: "02",
    name: "VYRA Fitness",
    group: "product",
    category: { en: "Mobile app / product", es: "Aplicación móvil / producto" },
    status: { en: "Design & testing · Not released", es: "Diseño y pruebas · Sin publicar" },
    summary: {
      en: "An all-in-one fitness app concept bringing workouts, nutrition, hydration and progress tracking into one experience.",
      es: "Una aplicación integral de fitness que reúne entrenamientos, nutrición, hidratación y seguimiento del progreso."
    },
    challenge: {
      en: "Bring several distinct health-tracking journeys together without overwhelming the mobile interface.",
      es: "Integrar distintos flujos de seguimiento de salud sin sobrecargar la interfaz móvil."
    },
    approach: {
      en: "Designed and iterated on a React Native / Expo application structure, reusable UI and data-backed tracking flows.",
      es: "Diseñé e iteré una estructura con React Native / Expo, interfaz reutilizable y flujos de seguimiento basados en datos."
    },
    evidence: {
      en: "Private development repository. The app is in design and testing; it is not listed as an App Store or Google Play release.",
      es: "Repositorio privado de desarrollo. La aplicación está en diseño y pruebas; no se presenta como publicada en las tiendas."
    },
    technologies: ["React Native", "Expo", "TypeScript", "Supabase"]
  },
  {
    id: "catalog-integrity",
    number: "03",
    name: "Catalog Integrity Engine",
    group: "systems",
    category: { en: "Data validation / automation", es: "Validación de datos / automatización" },
    status: { en: "Internal prototype", es: "Prototipo interno" },
    summary: {
      en: "A catalog comparison workflow to flag mismatches between structured product feeds and observed product information.",
      es: "Un flujo de comparación de catálogos que detecta diferencias entre feeds estructurados y la información de productos."
    },
    challenge: {
      en: "Catalog drift makes prices and product data inconsistent across different sources.",
      es: "La desincronización del catálogo provoca diferencias de precios y datos entre fuentes."
    },
    approach: {
      en: "Built comparison logic with explicit match and mismatch outputs, then validated it through controlled sample runs.",
      es: "Desarrollé lógica comparativa con resultados explícitos de coincidencia y diferencia, validada con ejecuciones de muestra."
    },
    evidence: {
      en: "Internal engineering work; sample runs are not a claim of production adoption or commercial revenue.",
      es: "Trabajo de ingeniería interno; las ejecuciones de muestra no implican adopción productiva ni ingresos comerciales."
    },
    technologies: ["TypeScript", "Node.js", "Cloudflare Workers", "Apify"]
  },
  {
    id: "client-websites",
    number: "04",
    name: "Client Website Builds",
    group: "client",
    category: { en: "Client work / web", es: "Trabajo para clientes / web" },
    status: { en: "2 websites completed", es: "2 sitios web completados" },
    summary: {
      en: "Two completed website projects: one for a dental practice and another for a paint retailer.",
      es: "Dos proyectos web completados: uno para una clínica dental y otro para una tienda de pinturas."
    },
    challenge: {
      en: "Translate different business needs into websites that are clear, practical and easy to navigate.",
      es: "Convertir necesidades comerciales distintas en sitios claros, prácticos y fáciles de recorrer."
    },
    approach: {
      en: "Implemented end-to-end site experiences, focusing on responsive structure and understandable presentation.",
      es: "Implementé experiencias web completas, centradas en estructura adaptable y presentación comprensible."
    },
    evidence: {
      en: "Client work reported as completed; public URLs, screenshots and measurable outcomes are not currently available for independent review.",
      es: "Trabajo declarado como completado; por ahora no hay URL, capturas ni métricas públicas disponibles para su revisión."
    },
    technologies: ["Web development", "Responsive UI", "Frontend"]
  },
  {
    id: "portfolio",
    number: "05",
    name: "Developer Portfolio",
    group: "product",
    category: { en: "Frontend / open source", es: "Frontend / código público" },
    status: { en: "Public repository", es: "Repositorio público" },
    summary: {
      en: "The website you are viewing: a bilingual, accessible portfolio designed for direct technical evaluation.",
      es: "El sitio que estás viendo: un portafolio bilingüe y accesible diseñado para facilitar la evaluación técnica."
    },
    challenge: {
      en: "Make technical depth legible in seconds, without exaggerated claims or broken demo links.",
      es: "Mostrar profundidad técnica en segundos, sin afirmaciones exageradas ni enlaces a demos inexistentes."
    },
    approach: {
      en: "Built a responsive React and TypeScript interface with real project status, semantic HTML and zero external UI services.",
      es: "Construí una interfaz adaptable con React y TypeScript, estados reales, HTML semántico y sin servicios visuales externos."
    },
    evidence: {
      en: "The implementation is available in the public GitHub repository linked below.",
      es: "La implementación está disponible en el repositorio público de GitHub enlazado abajo."
    },
    technologies: ["React", "TypeScript", "Vite", "CSS"],
    source: "https://github.com/natanaelprogimo-afk/portfolio"
  }
];
