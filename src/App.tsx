import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2,
  Database, ExternalLink, Globe2, Layers3, BriefcaseBusiness, Mail,
  Menu, ShieldCheck, Workflow, X
} from "lucide-react";
import { projects, type Locale, type ProjectGroup } from "./data/projects";
import { copy } from "./data/copy";

const GITHUB = "https://github.com/natanaelprogimo-afk";
const LINKEDIN = "https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/";
const EMAIL = "moralesalerson@gmail.com";



const sectionIds = ["about", "work", "lab", "expertise", "approach", "contact"] as const;
const groupIds: Array<"all" | ProjectGroup> = ["all", "systems", "product", "client"];
const iconList = [Code2, Database, Workflow, Layers3] as const;

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    try { return window.localStorage.getItem("alerson-portfolio-lang") === "es" ? "es" : "en"; }
    catch { return "en"; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | ProjectGroup>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    try { window.localStorage.setItem("alerson-portfolio-lang", locale); } catch { /* browsing still works without storage */ }
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
                <a href={import.meta.env.BASE_URL + (locale === "en" ? "resume-en.pdf" : "resume-es.pdf")} download>{locale === "en" ? "Résumé PDF" : "CV PDF"} <ArrowUpRight size={13} /></a>
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
                  <div className="project-diagram" role="img" aria-label={locale === "en" ? "Conceptual architecture diagram, not a product screenshot" : "Diagrama conceptual de arquitectura; no es captura del producto"}>
                    <span className="diagram-caption">{locale === "en" ? "ARCHITECTURE CONCEPT / NOT A SCREENSHOT" : "CONCEPTO ARQUITECTÓNICO / NO ES CAPTURA"}</span>
                    <div className="diagram-flow">
                      <span>{project.technologies[0]}</span><ArrowRight size={15} aria-hidden="true"/><span>{project.technologies[1] ?? "UI"}</span><ArrowRight size={15} aria-hidden="true"/><span>{project.technologies[2] ?? "Data"}</span>
                    </div>
                    <div className="diagram-footer"><span>{project.id.toUpperCase()}</span><Layers3 size={17}/></div>
                  </div>
                  <div className="project-info">
                    <span className="project-category">{project.category[locale]}</span>
                    <h3>{project.name}</h3>
                    <p>{project.summary[locale]}</p>
                  </div>
                  <div className="tag-list" aria-label={t.labelTech}>
                    {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                  <div className="project-actions">
                    <a className="case-deep-link" href={import.meta.env.BASE_URL + "cases/#" + project.id} target="_blank" rel="noopener noreferrer">
                      {locale === "en" ? "Full case study" : "Caso de estudio"} <ArrowUpRight size={14} />
                    </a>
                    <button type="button" aria-expanded={expanded === project.id}
                      aria-controls={"notes-" + project.id}
                      onClick={() => setExpanded(expanded === project.id ? null : project.id)}>
                      {expanded === project.id ? t.hideCase : t.caseStudy}
                      <ChevronDown size={17} className={expanded === project.id ? "rotate" : ""} />
                    </button>
                    {project.id === "catalog-integrity" && (
                      <a href={import.meta.env.BASE_URL + "labs/"} target="_blank" rel="noopener noreferrer">{locale === "en" ? "Independent public sample" : "Ejemplo público independiente"} <ExternalLink size={15}/></a>
                    )}
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

        <section className="section lab-section" id="lab" aria-labelledby="lab-heading">
          <div className="container">
            <span className="section-eyebrow">{t.labEyebrow}</span>
            <div className="section-intro">
              <h2 className="section-title" id="lab-heading">{t.labTitle} <em>{t.labAccent}</em></h2>
              <p>{t.labIntro}</p>
            </div>
            <div className="lab-grid">
              {t.labCards.map(item => (
                <article key={item.number} className="lab-card">
                  <span className="lab-number">EXAMPLE / {item.number}</span>
                  <div className="lab-glyph"><Code2 size={28} strokeWidth={1.5}/><span>{item.icon === "data" ? "CSV" : item.icon === "api" ? "API" : "JSON"}</span></div>
                  <h3>{item.title}</h3><p>{item.description}</p>
                  <a href={import.meta.env.BASE_URL + "labs/#" + (item.icon === "data" ? "catalog" : item.icon === "api" ? "retry" : "metrics")} target="_blank" rel="noopener noreferrer">{t.labCTA}<ArrowUpRight size={16}/></a>
                </article>
              ))}
            </div>
            <a className="lab-source" href="https://github.com/natanaelprogimo-afk/portfolio/tree/main/public/labs" target="_blank" rel="noopener noreferrer">{t.labOpenSource}<ArrowUpRight size={15}/></a>
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
                <a className="button button-outline" href={import.meta.env.BASE_URL + "resume.html"} target="_blank" rel="noopener noreferrer">{t.contactCv} <ArrowRight size={18} /></a>
                <a className="resume-quiet-link" href={import.meta.env.BASE_URL + "resume-en.pdf"} download>{t.cvEn} (PDF)</a>
                <a className="resume-quiet-link" href={import.meta.env.BASE_URL + "resume-es.pdf"} download>{t.cvEs} (PDF)</a>
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
