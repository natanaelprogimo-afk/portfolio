import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2,
  Database, ExternalLink, Globe2, Layers3, BriefcaseBusiness, Mail,
  Menu, ShieldCheck, Workflow, X
} from "lucide-react";
import { projects, type Locale, type ProjectGroup } from "./data/projects";

const GITHUB = "https://github.com/natanaelprogimo-afk";
const LINKEDIN = "https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/";
const EMAIL = "moralesalerson@gmail.com";

const copy = {
  en: {
    skip: "Skip to content",
    nav: ["About", "Work", "Expertise", "Approach", "Contact"],
    navMenu: "Open navigation",
    contact: "Get in touch",
    heroLabel: "FULL-STACK SOFTWARE ENGINEER · URUGUAY / REMOTE",
    heroLine1: "Complex problems.",
    heroLine2: "Clear software.",
    heroText: "I'm Alerson Morales. I design and build web applications, backend systems, and practical AI workflows—connecting thoughtful interfaces to reliable engineering.",
    heroWork: "Explore selected work",
    heroMail: "Contact me",
    heroScroll: "Scroll to explore",
    visualLabel: "ENGINEERING / OVERVIEW",
    visualTitle: "From interface to infrastructure.",
    visualCaption: "Product thinking, end-to-end implementation.",
    visualLayers: ["Interface", "Services & APIs", "Data systems", "AI workflows"],
    proof1: "Completed client websites",
    proof2: "English proficiency",
    proof3: "Based in Uruguay",
    proof4: "IT education completed in 2025",
    aboutEyebrow: "01 / ABOUT",
    aboutTitle: "A developer who cares about",
    aboutAccent: "the whole system.",
    aboutLead: "I started programming at 12. Today I work across frontend, backend, databases and automation, with a focus on software that is maintainable and useful.",
    aboutBody: "I founded VYRA as an independent software initiative. My experience spans completed websites for local businesses and ongoing, more complex applications. I distinguish shipped work from prototypes and work in progress.",
    aboutQuote: "Good software is not just what runs. It's what people can understand, maintain and trust.",
    aboutLanguages: "Languages",
    aboutLanguageValue: "Spanish (native) · English (C1) · Portuguese (intermediate)",
    aboutEducation: "Education",
    aboutEducationValue: "Completed secondary education and an IT-focused high-school program (2025).",
    aboutFocus: "Current focus",
    aboutFocusValue: "Remote software engineering roles and technically challenging product work.",
    workEyebrow: "02 / SELECTED WORK",
    workTitle: "Built, building,",
    workAccent: "and learning in public.",
    workIntro: "A transparent look at finished client work, active engineering projects and prototypes. Private repositories are clearly labeled.",
    filters: ["All work", "Systems", "Products", "Client work"],
    caseStudy: "Read technical notes",
    hideCase: "Close technical notes",
    challenge: "Problem",
    approach: "Engineering approach",
    evidence: "Verification & scope",
    source: "View source",
    privateSource: "Private code — discussion available on request",
    expertiseEyebrow: "03 / EXPERTISE",
    expertiseTitle: "My toolkit is broad.",
    expertiseAccent: "My focus is delivery.",
    expertiseIntro: "The right stack follows the problem. These are technologies I use or have worked with, not claims of equal depth in every tool.",
    expertiseCards: [
      { title: "Web & frontend", desc: "Usable, responsive interfaces and full-stack application work.", tags: ["React", "Next.js", "TypeScript", "JavaScript", "HTML / CSS"] },
      { title: "Backend & data", desc: "API design, data flows, persistence and integration boundaries.", tags: ["Python", "Node.js", "C#", "SQL", "PostgreSQL", "MySQL"] },
      { title: "Automation & AI", desc: "Structured workflows, model integration and human oversight.", tags: ["REST APIs", "FastAPI", "Cloudflare", "Automation", "AI integration"] },
      { title: "Mobile & workflow", desc: "Cross-platform product development and disciplined iteration.", tags: ["React Native", "Expo", "Supabase", "Git", "Testing"] }
    ],
    approachEyebrow: "04 / APPROACH",
    approachTitle: "How I approach",
    approachAccent: "engineering work.",
    approachIntro: "A simple working philosophy that applies whether the project is a website or a complex automation system.",
    steps: [
      { number: "01", title: "Understand", desc: "Clarify the real problem, constraints and criteria for success." },
      { number: "02", title: "Design", desc: "Choose clear boundaries, data models and the simplest viable architecture." },
      { number: "03", title: "Implement", desc: "Build readable code in small, testable increments." },
      { number: "04", title: "Validate", desc: "Check behavior, edge cases, accessibility and operational limitations." }
    ],
    contactEyebrow: "05 / CONTACT",
    contactTitle: "Let's build something",
    contactAccent: "worth using.",
    contactText: "I'm interested in 100% remote opportunities with teams worldwide, as well as technically meaningful collaborations. If you're hiring, tell me about the problem your team is solving.",
    contactAction: "Email Alerson",
    contactCv: "Request my résumé",
    contactLocation: "Uruguay · Open to remote opportunities",
    footerBuilt: "Built with React, TypeScript & care.",
    footerTop: "Back to top",
    rights: "All rights reserved.",
    labelTech: "Technology"
  },
  es: {
    skip: "Saltar al contenido",
    nav: ["Sobre mí", "Proyectos", "Especialidades", "Método", "Contacto"],
    navMenu: "Abrir navegación",
    contact: "Contactar",
    heroLabel: "INGENIERO DE SOFTWARE FULL-STACK · URUGUAY / REMOTO",
    heroLine1: "Problemas complejos.",
    heroLine2: "Software claro.",
    heroText: "Soy Alerson Morales. Diseño y desarrollo aplicaciones web, sistemas backend y flujos prácticos de inteligencia artificial, combinando buenas interfaces con ingeniería confiable.",
    heroWork: "Explorar proyectos",
    heroMail: "Contactarme",
    heroScroll: "Deslizar para explorar",
    visualLabel: "INGENIERÍA / VISTA GENERAL",
    visualTitle: "De la interfaz a la infraestructura.",
    visualCaption: "Visión de producto e implementación integral.",
    visualLayers: ["Interfaz", "Servicios y API", "Sistemas de datos", "Flujos de IA"],
    proof1: "Sitios de clientes terminados",
    proof2: "Nivel de inglés",
    proof3: "Desde Uruguay",
    proof4: "Estudios de informática finalizados en 2025",
    aboutEyebrow: "01 / SOBRE MÍ",
    aboutTitle: "Un desarrollador que piensa en",
    aboutAccent: "todo el sistema.",
    aboutLead: "Empecé a programar a los 12 años. Hoy trabajo en frontend, backend, bases de datos y automatización, con atención al mantenimiento y a la utilidad del software.",
    aboutBody: "Fundé VYRA como iniciativa independiente de software. Mi experiencia incluye sitios web terminados para negocios y aplicaciones más complejas todavía en desarrollo. Distingo lo publicado de los prototipos y del trabajo en progreso.",
    aboutQuote: "El buen software no solo funciona: también se entiende, se mantiene y genera confianza.",
    aboutLanguages: "Idiomas",
    aboutLanguageValue: "Español (nativo) · Inglés (C1) · Portugués (intermedio)",
    aboutEducation: "Formación",
    aboutEducationValue: "Secundaria completa y bachillerato de informática finalizado en 2025.",
    aboutFocus: "Enfoque actual",
    aboutFocusValue: "Puestos remotos de ingeniería de software y desarrollo de productos técnicamente exigentes.",
    workEyebrow: "02 / PROYECTOS",
    workTitle: "Lo que terminé, desarrollo",
    workAccent: "y sigo aprendiendo.",
    workIntro: "Una visión transparente del trabajo terminado para clientes, proyectos de ingeniería activos y prototipos. Los repositorios privados se identifican expresamente.",
    filters: ["Todos", "Sistemas", "Productos", "Clientes"],
    caseStudy: "Ver detalles técnicos",
    hideCase: "Cerrar detalles",
    challenge: "Problema",
    approach: "Enfoque de ingeniería",
    evidence: "Evidencia y alcance",
    source: "Ver código",
    privateSource: "Código privado — disponible para explicación técnica",
    expertiseEyebrow: "03 / ESPECIALIDADES",
    expertiseTitle: "Muchas herramientas.",
    expertiseAccent: "Una prioridad: entregar.",
    expertiseIntro: "La tecnología se elige según el problema. Estas son herramientas con las que trabajo o he trabajado, sin afirmar que domino todas por igual.",
    expertiseCards: [
      { title: "Web y frontend", desc: "Interfaces accesibles y adaptables, y aplicaciones full-stack.", tags: ["React", "Next.js", "TypeScript", "JavaScript", "HTML / CSS"] },
      { title: "Backend y datos", desc: "Diseño de API, flujos de datos, persistencia e integraciones.", tags: ["Python", "Node.js", "C#", "SQL", "PostgreSQL", "MySQL"] },
      { title: "Automatización e IA", desc: "Flujos estructurados, integración de modelos y supervisión humana.", tags: ["REST APIs", "FastAPI", "Cloudflare", "Automation", "AI integration"] },
      { title: "Móvil y metodología", desc: "Desarrollo multiplataforma e iteración disciplinada.", tags: ["React Native", "Expo", "Supabase", "Git", "Testing"] }
    ],
    approachEyebrow: "04 / MÉTODO",
    approachTitle: "Mi manera de abordar",
    approachAccent: "la ingeniería.",
    approachIntro: "Una filosofía simple, tanto para desarrollar un sitio como para construir un sistema de automatización complejo.",
    steps: [
      { number: "01", title: "Comprender", desc: "Definir el problema real, las restricciones y los criterios de éxito." },
      { number: "02", title: "Diseñar", desc: "Elegir límites claros, modelos de datos y una arquitectura adecuada." },
      { number: "03", title: "Implementar", desc: "Escribir código legible en incrementos pequeños y verificables." },
      { number: "04", title: "Validar", desc: "Comprobar comportamiento, casos límite, accesibilidad y restricciones." }
    ],
    contactEyebrow: "05 / CONTACTO",
    contactTitle: "Construyamos algo",
    contactAccent: "que valga la pena.",
    contactText: "Me interesan oportunidades 100 % remotas con equipos de cualquier país y colaboraciones técnicamente relevantes. Si estás contratando, contame qué problema busca resolver tu equipo.",
    contactAction: "Escribir a Alerson",
    contactCv: "Solicitar mi CV",
    contactLocation: "Uruguay · Disponible para oportunidades remotas",
    footerBuilt: "Creado con React, TypeScript y dedicación.",
    footerTop: "Volver arriba",
    rights: "Todos los derechos reservados.",
    labelTech: "Tecnologías"
  }
} as const;

const sectionIds = ["about", "work", "expertise", "approach", "contact"] as const;
const groupIds: Array<"all" | ProjectGroup> = ["all", "systems", "product", "client"];
const iconList = [Code2, Database, Workflow, Layers3] as const;

export default function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | ProjectGroup>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = locale === "en"
      ? "Alerson Morales | Full-Stack Software Engineer"
      : "Alerson Morales | Desarrollador Full-Stack";
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (desc) desc.content = locale === "en"
      ? "Alerson Morales is a software engineer in Uruguay building full-stack applications, backend systems, and AI automation. Explore selected work and contact him for remote roles."
      : "Alerson Morales es desarrollador de software en Uruguay. Conocé sus proyectos full-stack, backend y automatización con IA.";
  }, [locale]);

  const visibleProjects = projects.filter((project) => filter === "all" || project.group === filter);

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Alerson Morales — home">
            <span className="brand-mark">AM<span>.</span></span>
            <span className="brand-name">ALERSON<br />MORALES</span>
          </a>

          <nav id="site-nav" className={menuOpen ? "site-nav open" : "site-nav"} aria-label="Main navigation">
            {sectionIds.map((id, i) => (
              <a key={id} href={"#" + id} onClick={() => setMenuOpen(false)}>
                <span>{String(i + 1).padStart(2, "0")}.</span> {t.nav[i]}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button className="language-switch" type="button"
              aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
              onClick={() => setLocale(locale === "en" ? "es" : "en")}>
              <Globe2 size={15} aria-hidden="true" /> {locale === "en" ? "ES" : "EN"}
            </button>
            <a href={"mailto:" + EMAIL} className="header-contact">{t.contact} <ArrowUpRight size={15} /></a>
            <button className="menu-toggle" type="button" aria-controls="site-nav"
              aria-label={t.navMenu} aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span className="tiny-square" /> {t.heroLabel}</div>
              <h1 id="hero-title">{t.heroLine1}<br /><em>{t.heroLine2}</em></h1>
              <p className="hero-description">{t.heroText}</p>
              <div className="hero-cta">
                <a className="button button-primary" href="#work">{t.heroWork}<ArrowUpRight size={18} /></a>
                <a className="button button-ghost" href={"mailto:" + EMAIL}>{t.heroMail}<ArrowRight size={18} /></a>
              </div>
              <div className="hero-meta">
                <a href={GITHUB} target="_blank" rel="noopener noreferrer"><Code2 size={18} /> GitHub <ArrowUpRight size={13} /></a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"><BriefcaseBusiness size={18} /> LinkedIn <ArrowUpRight size={13} /></a>
              </div>
            </div>

            <div className="hero-visual" aria-label={t.visualTitle}>
              <div className="visual-top"><span className="visual-dots"><i /><i /><i /></span><span>ALERSON / ENGINEERING</span><span className="visual-plus">+</span></div>
              <div className="visual-body">
                <span className="visual-kicker">{t.visualLabel}</span>
                <h2>{t.visualTitle}</h2>
                <p>{t.visualCaption}</p>
                <div className="architecture">
                  {t.visualLayers.map((name, index) => {
                    const Icon = iconList[index];
                    return (
                      <div className="architecture-node" key={name}>
                        <span className="architecture-icon"><Icon size={20} strokeWidth={1.7} /></span>
                        <div><small>0{index + 1} / LAYER</small><strong>{name}</strong></div>
                        <Check size={16} className="node-check" aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>
                <div className="visual-foot"><span><span className="live-dot" /> BUILD WITH INTENT</span><span>2026</span></div>
              </div>
            </div>
          </div>
          <div className="container hero-bottom">
            <a href="#about" className="scroll-cue">{t.heroScroll} <ArrowDown size={15} /></a>
            <span>PYTHON <b>·</b> TYPESCRIPT <b>·</b> REACT <b>·</b> SQL</span>
          </div>
        </section>

        <div className="proof-strip">
          <div className="container proof-grid">
            <div><strong>02</strong><span>{t.proof1}</span></div>
            <div><strong>C1</strong><span>{t.proof2}</span></div>
            <div><strong>UY</strong><span>{t.proof3}</span></div>
            <div><strong>2025</strong><span>{t.proof4}</span></div>
          </div>
        </div>

        <section className="section about-section" id="about" aria-labelledby="about-heading">
          <div className="container">
            <span className="section-eyebrow">{t.aboutEyebrow}</span>
            <div className="about-layout">
              <div>
                <h2 id="about-heading" className="section-title">{t.aboutTitle} <em>{t.aboutAccent}</em></h2>
                <div className="about-text"><p className="lead">{t.aboutLead}</p><p>{t.aboutBody}</p></div>
              </div>
              <aside className="about-aside">
                <div className="quote-mark">“</div>
                <blockquote>{t.aboutQuote}</blockquote>
                <dl>
                  <div><dt>{t.aboutLanguages}</dt><dd>{t.aboutLanguageValue}</dd></div>
                  <div><dt>{t.aboutEducation}</dt><dd>{t.aboutEducationValue}</dd></div>
                  <div><dt>{t.aboutFocus}</dt><dd>{t.aboutFocusValue}</dd></div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-heading">
          <div className="container">
            <div className="section-topline">
              <span className="section-eyebrow">{t.workEyebrow}</span>
              <span className="section-count">/ 05 CASES</span>
            </div>
            <div className="section-intro">
              <h2 className="section-title" id="work-heading">{t.workTitle} <em>{t.workAccent}</em></h2>
              <p>{t.workIntro}</p>
            </div>
            <div className="project-filters" role="group" aria-label="Filter projects">
              {groupIds.map((group, index) => (
                <button type="button" key={group} onClick={() => { setFilter(group); setExpanded(null); }}
                  className={filter === group ? "filter active" : "filter"} aria-pressed={filter === group}>
                  {t.filters[index]}
                </button>
              ))}
            </div>
            <div className="project-grid">
              {visibleProjects.map((project) => (
                <article className="project-card" key={project.id}>
                  <div className="project-card-top">
                    <span className="project-index">{project.number} / 05</span>
                    <span className="project-status"><span className="status-ring" />{project.status[locale]}</span>
                  </div>
                  <div className="project-glyph" aria-hidden="true"><span>{project.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span><Layers3 size={24} strokeWidth={1.4} /></div>
                  <div className="project-info">
                    <span className="project-category">{project.category[locale]}</span>
                    <h3>{project.name}</h3>
                    <p>{project.summary[locale]}</p>
                  </div>
                  <div className="tag-list" aria-label={t.labelTech}>
                    {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                  <div className="project-actions">
                    <button type="button" aria-expanded={expanded === project.id}
                      aria-controls={"notes-" + project.id}
                      onClick={() => setExpanded(expanded === project.id ? null : project.id)}>
                      {expanded === project.id ? t.hideCase : t.caseStudy}
                      <ChevronDown size={17} className={expanded === project.id ? "rotate" : ""} />
                    </button>
                    {project.source ? <a target="_blank" rel="noopener noreferrer" href={project.source}>{t.source}<ExternalLink size={15} /></a> : <span className="project-private"><ShieldCheck size={14} /> {locale === "en" ? "Private" : "Privado"}</span>}
                  </div>
                  {expanded === project.id && (
                    <div className="project-notes" id={"notes-" + project.id}>
                      <div><h4>{t.challenge}</h4><p>{project.challenge[locale]}</p></div>
                      <div><h4>{t.approach}</h4><p>{project.approach[locale]}</p></div>
                      <div><h4>{t.evidence}</h4><p>{project.evidence[locale]}</p></div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section expertise-section" id="expertise" aria-labelledby="expertise-heading">
          <div className="container">
            <span className="section-eyebrow">{t.expertiseEyebrow}</span>
            <div className="section-intro">
              <h2 className="section-title" id="expertise-heading">{t.expertiseTitle} <em>{t.expertiseAccent}</em></h2>
              <p>{t.expertiseIntro}</p>
            </div>
            <div className="expertise-list">
              {t.expertiseCards.map((item, index) => {
                const Icon = iconList[index];
                return <article className="expertise-row" key={item.title}>
                  <div className="expertise-symbol"><Icon size={23} strokeWidth={1.65} /></div>
                  <div className="expertise-info"><h3>{item.title}</h3><p>{item.desc}</p></div>
                  <div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="section approach-section" id="approach" aria-labelledby="approach-heading">
          <div className="container">
            <span className="section-eyebrow">{t.approachEyebrow}</span>
            <div className="section-intro">
              <h2 className="section-title" id="approach-heading">{t.approachTitle} <em>{t.approachAccent}</em></h2>
              <p>{t.approachIntro}</p>
            </div>
            <div className="steps">
              {t.steps.map((step) => <article key={step.number} className="step">
                <span className="step-number">{step.number} / 04</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <ArrowUpRight size={19} aria-hidden="true" />
              </article>)}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="container contact-inner">
            <div>
              <span className="section-eyebrow">{t.contactEyebrow}</span>
              <h2 id="contact-heading" className="section-title">{t.contactTitle} <em>{t.contactAccent}</em></h2>
              <p>{t.contactText}</p>
              <div className="contact-buttons">
                <a className="button button-dark" href={"mailto:" + EMAIL + "?subject=Remote%20software%20engineering%20opportunity"}><Mail size={18} /> {t.contactAction} <ArrowUpRight size={16} /></a>
                <a className="button button-outline" href={"mailto:" + EMAIL + "?subject=Resume%20request"}>{t.contactCv} <ArrowRight size={18} /></a>
              </div>
            </div>
            <div className="contact-side">
              <div className="contact-monogram">AM<span>.</span></div>
              <a href={"mailto:" + EMAIL}>{EMAIL}<ArrowUpRight size={18} /></a>
              <span>{t.contactLocation}</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <a href="#top" className="footer-brand">ALERSON MORALES<span>.</span></a>
          <div>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Code2 size={20} /></a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={20} /></a>
            <a href="#top" aria-label={t.footerTop}><ArrowUpRight size={20} /></a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Alerson Morales. {t.rights}</span>
          <span>{t.footerBuilt}</span>
        </div>
      </footer>
    </>
  );
}
