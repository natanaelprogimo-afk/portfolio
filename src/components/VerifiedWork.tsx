import { ArrowUpRight, Code2, Database, FlaskConical } from "lucide-react";
import type { Locale } from "../data/projects";
import { copy } from "../data/copy";

type Evidence = {
  id: string;
  icon: typeof Code2;
  link: string;
  technologies: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  linkType: "demo" | "source";
};

const evidence: Evidence[] = [
  {
    id: "browser-lab", icon: FlaskConical,
    link: "labs/", linkType: "demo",
    technologies: "JavaScript · Node.js tests",
    title: { en: "Run interactive examples", es: "Ejecuta ejemplos interactivos" },
    description: {
      en: "Try CSV reconciliation, idempotency and event aggregation with editable synthetic data.",
      es: "Prueba conciliación CSV, idempotencia y agregación de eventos con datos ficticios editables."
    }
  },
  {
    id: "python-service", icon: Code2,
    link: "https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/backend",
    linkType: "source", technologies: "Python · SQLite · Unit tests",
    title: { en: "Inspect a Python API", es: "Inspecciona una API Python" },
    description: {
      en: "Read a localhost-only HTTP example with input validation, idempotent requests and concurrency tests.",
      es: "Examina un servicio HTTP local con validación de entradas, idempotencia y pruebas de concurrencia."
    }
  },
  {
    id: "sql-analysis", icon: Database,
    link: "https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/sql",
    linkType: "source", technologies: "SQL · SQLite · Query plans",
    title: { en: "Review SQL engineering", es: "Revisa ingeniería SQL" },
    description: {
      en: "Inspect reproducible schema, indexes, window functions, query plans and test cases.",
      es: "Consulta esquemas, índices, funciones ventana, planes de consulta y pruebas reproducibles."
    }
  }
];

export default function VerifiedWork({ locale }: { locale: Locale }) {
  const t=copy[locale];
  return (
    <section className="verified-section" id="evidence" aria-labelledby="evidence-title">
      <div className="container">
        <div className="verified-heading">
          <div>
            <span className="section-eyebrow">{t.evidenceEyebrow}</span>
            <h2 className="verified-title" id="evidence-title">{t.evidenceTitle}</h2>
          </div>
          <p>{t.evidenceIntro}</p>
        </div>
        <div className="verified-grid">
          {evidence.map(item=>{
            const Icon=item.icon;
            const destination=item.linkType==="demo"
              ? import.meta.env.BASE_URL + locale + "/" + item.link
              : item.link;
            return (
              <article className="verified-card" key={item.id}>
                <div className="verified-card-top">
                  <span className="verified-icon"><Icon size={20} strokeWidth={1.7} aria-hidden="true"/></span>
                  <span className="verified-kind">{item.linkType==="demo" ? t.evidenceDemo : t.evidenceSource}</span>
                </div>
                <h3>{item.title[locale]}</h3>
                <p>{item.description[locale]}</p>
                <span className="verified-tech">{locale === "es" ? item.technologies.replaceAll("Node.js tests", "pruebas Node.js").replaceAll("Unit tests", "pruebas unitarias").replaceAll("Query plans", "planes de consulta") : item.technologies}</span>
                <a href={destination} target="_blank" rel="noopener noreferrer">
                  {item.linkType==="demo" ? t.evidenceTry : t.evidenceInspect}
                  <ArrowUpRight size={16} aria-hidden="true"/>
                </a>
              </article>
            );
          })}
        </div>
        <p className="verified-disclaimer">{t.evidenceDisclaimer}</p>
      </div>
    </section>
  );
}
