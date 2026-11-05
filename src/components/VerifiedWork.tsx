import { ArrowUpRight, Code2, Database, FlaskConical } from "lucide-react";
import type { Locale } from "../data/projects";
import { copy } from "../data/copy";

type Evidence = {
  id: string;
  caseId: string;
  icon: typeof Code2;
  link: string;
  technologies: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  linkType: "demo" | "source";
};

const evidence: Evidence[] = [
  {
    id: "browser-lab", caseId: "portfolio", icon: FlaskConical,
    link: "labs/", linkType: "demo",
    technologies: "JavaScript · Node.js tests",
    title: { en: "Run interactive examples", es: "Ejecuta ejemplos interactivos" },
    description: {
      en: "Try CSV reconciliation, idempotency and event aggregation with editable synthetic data.",
      es: "Prueba conciliación CSV, idempotencia y agregación de eventos con datos ficticios editables."
    }
  },
  {
    id: "python-service", caseId: "python-api", icon: Code2,
    link: "https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/backend",
    linkType: "source", technologies: "Python · SQLite · Unit tests",
    title: { en: "Inspect a Python API", es: "Inspecciona una API Python" },
    description: {
      en: "Read a localhost-only HTTP example with input validation, idempotent requests and concurrency tests.",
      es: "Examina un servicio HTTP local con validación de entradas, idempotencia y pruebas de concurrencia."
    }
  },
  {
    id: "python-csv", caseId: "python-csv", icon: Database,
    link: "https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/csv",
    linkType: "source", technologies: "Python · CSV · unittest",
    title: { en: "Reconcile CSVs in Python", es: "Concilia CSV con Python" },
    description: {
      en: "Inspect an independent Python CLI that validates CSV inputs and exports reproducible match, mismatch, missing and extra results.",
      es: "Examina una herramienta Python que valida archivos CSV y exporta resultados reproducibles: coincidencias, diferencias, faltantes y extras."
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
              <article className={"verified-card verified-card--" + item.id} key={item.id}>
                <div className="verified-card-top">
                  <span className="verified-icon"><Icon size={20} strokeWidth={1.7} aria-hidden="true"/></span>
                  <span className="verified-kind">{item.linkType==="demo" ? t.evidenceDemo : t.evidenceSource}</span>
                </div>
                <h3>{item.title[locale]}</h3>
                <p>{item.description[locale]}</p>
                {item.id === "python-csv" && (
                  <div className="verified-sample" aria-label={locale === "es" ? "Resultados de las muestras ficticias" : "Synthetic sample outcomes"}>
                    <span>match <b>1</b></span><span>mismatch <b>1</b></span><span>missing <b>1</b></span><span>extra <b>1</b></span>
                  </div>
                )}
                <span className="verified-tech">{locale === "es" ? item.technologies.replaceAll("Node.js tests", "pruebas Node.js").replaceAll("Unit tests", "pruebas unitarias").replaceAll("Query plans", "planes de consulta") : item.technologies}</span>
                <a href={destination} target="_blank" rel="noopener noreferrer">
                  {item.linkType==="demo" ? t.evidenceTry : t.evidenceInspect}
                  <ArrowUpRight size={16} aria-hidden="true"/>
                </a>
                <a className="verified-case-link" href={import.meta.env.BASE_URL + locale + "/cases/#" + item.caseId}>
                  {locale === "es" ? "Ver caso técnico completo" : "Read full engineering case"}
                  <ArrowUpRight size={15} aria-hidden="true"/>
                </a>
              </article>
            );
          })}
        </div>
        <nav className="verified-quick-links" aria-label={locale === "en" ? "Explore specific live exercises" : "Explorar ejercicios específicos"}>
          <span>{locale === "en" ? "Try a specific example:" : "Probar un ejemplo específico:"}</span>
          {[
            {id:"catalog",en:"CSV reconciliation",es:"Conciliación CSV"},
            {id:"retry",en:"Retry & idempotency",es:"Reintentos e idempotencia"},
            {id:"metrics",en:"Event metrics",es:"Métricas de eventos"}
          ].map(example=>(
            <a key={example.id} href={import.meta.env.BASE_URL+locale+"/labs/#"+example.id}>
              {example[locale]} <ArrowUpRight size={15} aria-hidden="true"/>
            </a>
          ))}
          <a href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/examples/sql" target="_blank" rel="noopener noreferrer">
            {locale === "es" ? "SQL: consultas y pruebas" : "SQL: queries and tests"} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
        <p className="verified-disclaimer">{t.evidenceDisclaimer}</p>
      </div>
    </section>
  );
}
