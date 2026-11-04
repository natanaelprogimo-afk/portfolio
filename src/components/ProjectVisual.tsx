import { ArrowRight, Code2, Database, Dumbbell, FileCheck2, Globe2, Paintbrush, ShieldCheck } from "lucide-react";
import type { Locale } from "../data/projects";

/** Evidence-aware visual variants. Illustrations are never described as product screenshots. */
export default function ProjectVisual({ id, locale }: { id: string; locale: Locale }) {
  const es = locale === "es";
  const label = es ? "PRESENTACIÓN DEL CASO" : "CASE PRESENTATION";

  if (id === "portfolio") {
    return (
      <div className="project-proof project-proof--portfolio" role="img" aria-label={es ? "Extracto textual del portafolio público; no es una captura de pantalla" : "Textual excerpt from the public portfolio; not a screenshot"}>
        <div className="project-proof-head"><span className="proof-light" /> <span>{es ? "SITIO PÚBLICO · CÓDIGO DISPONIBLE" : "PUBLIC SITE · SOURCE AVAILABLE"}</span><Code2 size={17} aria-hidden="true" /></div>
        <div className="proof-browser-title">AM<span>.</span> <small>{es ? "Desarrollador full-stack" : "Full-stack developer"}</small></div>
        <strong>{es ? "Problemas complejos." : "Complex problems."}<em>{es ? " Software claro." : " Clear software."}</em></strong>
        <span className="proof-footnote">{es ? "Contenido real de esta web · React y TypeScript" : "Actual text from this website · React & TypeScript"}</span>
      </div>
    );
  }
  if (id === "client-websites") {
    return (
      <div className="project-proof project-proof--clients" role="img" aria-label={es ? "Dos webs de clientes declaradas terminadas; sin capturas públicas autorizadas" : "Two completed client websites; no public screenshots authorized"}>
        <div className="project-proof-head"><span>{es ? "TRABAJOS REALIZADOS" : "COMPLETED CLIENT WORK"}</span><ShieldCheck size={17} aria-hidden="true" /></div>
        <div className="proof-client-grid">
          <div><Globe2 size={20} aria-hidden="true" /><strong>{es ? "Clínica dental" : "Dental practice"}</strong><small>{es ? "Sitio web" : "Website"}</small></div>
          <div><Paintbrush size={20} aria-hidden="true" /><strong>{es ? "Tienda de pinturas" : "Paint retailer"}</strong><small>{es ? "Sitio web" : "Website"}</small></div>
        </div>
        <span className="proof-footnote">{es ? "Capturas y referencias pendientes de permiso" : "Screenshots and references pending permission"}</span>
      </div>
    );
  }
  if (id === "catalog-integrity") {
    return (
      <div className="project-proof project-proof--catalog" role="img" aria-label={es ? "Datos ficticios de la demo pública independiente de comparación CSV" : "Synthetic output from the independent public CSV comparison example"}>
        <div className="project-proof-head"><span>{es ? "MUESTRA PÚBLICA INDEPENDIENTE" : "INDEPENDENT PUBLIC SAMPLE"}</span><Database size={17} aria-hidden="true" /></div>
        <div className="proof-data-rows">
          <div><code>SKU-001</code><span className="proof-pill proof-pill--match">MATCH</span></div>
          <div><code>SKU-002</code><span className="proof-pill proof-pill--mismatch">MISMATCH</span></div>
          <div><code>SKU-003</code><span className="proof-pill">MISSING</span></div>
        </div>
        <span className="proof-footnote">{es ? "Datos ficticios · No es una captura del sistema privado" : "Synthetic data · Not a screenshot of the private system"}</span>
      </div>
    );
  }
  if (id === "ai-automation") {
    return (
      <div className="project-proof project-proof--automation" role="img" aria-label={es ? "Diagrama conceptual de controles de automatización, no es una captura del producto" : "Conceptual automation controls diagram, not a product screenshot"}>
        <div className="project-proof-head"><span>{es ? "DISEÑO CONCEPTUAL · PRIVADO" : "CONCEPT DESIGN · PRIVATE"}</span><ShieldCheck size={17} aria-hidden="true" /></div>
        <div className="proof-flow">
          <span>{es ? "Solicitud" : "Request"}</span><ArrowRight size={16} aria-hidden="true" />
          <span>{es ? "Aprobación" : "Approval"}</span><ArrowRight size={16} aria-hidden="true" />
          <span>{es ? "Registro" : "Audit trail"}</span>
        </div>
        <span className="proof-footnote">{es ? "Arquitectura ilustrativa · Desarrollo privado" : "Illustrative architecture · Private development"}</span>
      </div>
    );
  }
  if (id === "vyra-fitness") {
    return (
      <div className="project-proof project-proof--fitness" role="img" aria-label={es ? "Representación conceptual de módulos de fitness; aplicación no publicada" : "Conceptual fitness module layout; app is unreleased"}>
        <div className="project-proof-head"><span>{es ? "CONCEPTO DE APP · NO PUBLICADA" : "APP CONCEPT · UNRELEASED"}</span><Dumbbell size={17} aria-hidden="true" /></div>
        <div className="proof-fitness-modules">
          <span><Dumbbell size={17} aria-hidden="true" />{es ? "Entrenamiento" : "Training"}</span>
          <span><FileCheck2 size={17} aria-hidden="true" />{es ? "Nutrición" : "Nutrition"}</span>
          <span><Database size={17} aria-hidden="true" />{es ? "Progreso" : "Progress"}</span>
        </div>
        <span className="proof-footnote">{es ? "Módulos ilustrativos · En diseño y pruebas" : "Illustrative modules · Design and testing"}</span>
      </div>
    );
  }
  return <div className="project-proof"><span>{label}</span></div>;
}
