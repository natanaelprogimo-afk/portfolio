import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowUpRight, ChevronDown, Code2,
  Database, Workflow, Layers3, ExternalLink, Globe2, BriefcaseBusiness, Mail,
  Menu, ShieldCheck, X
} from "lucide-react";
import { projects, type Locale, type ProjectGroup } from "./data/projects";
import { copy } from "./data/copy";
import VerifiedWork from "./components/VerifiedWork";
import VisitorRoutes from "./components/VisitorRoutes";
import ProjectVisual from "./components/ProjectVisual";

const GITHUB = "https://github.com/natanaelprogimo-afk";
const UPWORK = "https://www.upwork.com/freelancers/~016487e77ebf028c40";
const LINKEDIN = "https://www.linkedin.com/in/alerson-anatael-morales-pintos-4a4634325/";
const EMAIL = "moralesalerson@gmail.com";



const sectionIds = ["evidence", "about", "work", "contact"] as const;
const groupIds: Array<"all" | ProjectGroup> = ["all", "systems", "product", "client"];
const iconList = [Code2, Database, Workflow, Layers3] as const;

export default function App() {
  const [locale] = useState<Locale>(() => {
    const segment = window.location.pathname.match(/\/(en|es)\/?$/)?.[1];
    if (segment === "es" || segment === "en") return segment;
    try { return window.localStorage.getItem("alerson-portfolio-lang") === "es" ? "es" : "en"; }
    catch { return "en"; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const firstNavRef = useRef<HTMLAnchorElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [filter, setFilter] = useState<"all" | ProjectGroup>("all");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<"idle"|"success"|"failure">("idle");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const t = copy[locale];
  const localPage = (path: string) => import.meta.env.BASE_URL + locale + "/" + path;

  useEffect(() => {
    document.documentElement.lang = locale;
    try { window.localStorage.setItem("alerson-portfolio-lang", locale); } catch { /* browsing still works without storage */ }
    document.title = t.seoTitle;
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (desc) desc.content = t.seoDescription;
    const sharedTitle = document.title;
    const sharedDescription = desc?.content ?? "";
    const metaUpdates: Array<[string, string]> = [
      ['meta[property="og:title"]', sharedTitle],
      ['meta[property="og:description"]', sharedDescription],
      ['meta[name="twitter:title"]', sharedTitle],
      ['meta[name="twitter:description"]', sharedDescription]
    ];
    for (const [selector, value] of metaUpdates) {
      const meta = document.querySelector<HTMLMetaElement>(selector);
      if (meta) meta.content = value;
    }
  }, [locale, t.seoDescription, t.seoTitle]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => {
      let target: HTMLElement | null = null;
      try { target = document.getElementById(decodeURIComponent(hash)); }
      catch { return; }
      target?.scrollIntoView({ block: "start" });
      if (hash === "main") target?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    firstNavRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const header = document.querySelector<HTMLElement>(".site-header");
      if (!header) return;
      const controls = Array.from(header.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)"))
        .filter(node => node.getClientRects().length > 0 && getComputedStyle(node).visibility !== "hidden");
      if (!controls.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !header.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !header.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", onMenuKeyDown);
    return () => {
      document.removeEventListener("keydown", onMenuKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const selected=entries.find(entry=>entry.isIntersecting);
      if (selected) setActiveSection(selected.target.id);
    },{rootMargin:"-22% 0px -65% 0px",threshold:0});
    for(const id of sectionIds){
      const node=document.getElementById(id);
      if(node)observer.observe(node);
    }
    return ()=>observer.disconnect();
  }, []);

  const publicFirstOrder: Record<string, number> = {
    portfolio: 0, "client-websites": 1, "catalog-integrity": 2,
    "ai-automation": 3, "vyra-fitness": 4
  };
  const matchingProjects = projects
    .filter((project) => filter === "all" || project.group === filter)
    .sort((a,b) => publicFirstOrder[a.id] - publicFirstOrder[b.id]);
  const visibleProjects = filter === "all" && !showAllProjects
    ? matchingProjects.slice(0, 3)
    : matchingProjects;
  const displayTechnology = (technology: string) =>
    locale === "es" ? ({
      "Web development": "Desarrollo web",
      "Responsive UI": "Interfaz adaptable",
      "Frontend": "Desarrollo frontend"
    } as Record<string,string>)[technology] ?? technology : technology;

  return (
    <>
      <a className="skip-link" href="#main" onClick={() => {
        window.requestAnimationFrame(() => document.getElementById("main")?.focus({ preventScroll: true }));
      }}>{t.skip}</a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label={locale === "es" ? "AM. Alerson Morales — inicio" : "AM. Alerson Morales — home"}>
            <span className="brand-mark">AM<span>.</span></span>
            <span className="brand-name">ALERSON<br />MORALES</span>
          </a>

          <nav id="site-nav" className={menuOpen ? "site-nav open" : "site-nav"} aria-label={t.navLabel}>
            {sectionIds.map((id, i) => (
              <a key={id} ref={i === 0 ? firstNavRef : undefined} href={"#" + id} aria-current={activeSection === id ? "location" : undefined} onClick={() => {setActiveSection(id);setMenuOpen(false);}}>
                <span>{String(i + 1).padStart(2, "0")}.</span> {t.nav[i]}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button className="language-switch" type="button"
              aria-label={locale === "en" ? "ES — Switch to Spanish" : "EN — Cambiar a inglés"}
              onClick={() => {
                const next = locale === "en" ? "es" : "en";
                try { window.localStorage.setItem("alerson-portfolio-lang", next); } catch { /* optional preference */ }
                window.location.assign(import.meta.env.BASE_URL + next + "/" + window.location.hash);
              }}>
              <Globe2 size={15} aria-hidden="true" /> {locale === "en" ? "ES" : "EN"}
            </button>
            <a href={"mailto:" + EMAIL} className="header-contact">{t.contact} <ArrowUpRight size={15} /></a>
            <button className="menu-toggle" ref={menuButtonRef} type="button" aria-controls="site-nav"
              aria-label={menuOpen ? t.navMenuClose : t.navMenu} aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span className="tiny-square" /> {t.heroLabel}</div>
              <h1 id="hero-title">{t.heroLine1}<br /><em>{t.heroLine2}</em></h1>
              <p className="hero-focus">{t.heroFocus}</p>
              <p className="hero-description">{t.heroText}</p>
              <div className="hero-cta" aria-label={t.audienceActions}>
                <a className="button button-primary" href="#evidence">{t.heroEvidence}<ArrowUpRight size={18} aria-hidden="true"/></a>
                <a className="button button-ghost" href="#contact">{t.heroHireAction}<ArrowUpRight size={18} aria-hidden="true"/></a>
              </div>
              <div className="hero-meta" aria-label={t.socialLabel}>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer"><Code2 size={18} aria-hidden="true"/> GitHub <ArrowUpRight size={13} aria-hidden="true"/></a>
                <a href={UPWORK} target="_blank" rel="noopener noreferrer"><BriefcaseBusiness size={18} aria-hidden="true"/> Upwork <ArrowUpRight size={13} aria-hidden="true"/></a>
                <a href={import.meta.env.BASE_URL + (locale === "en" ? "resume-en.pdf" : "resume-es.pdf")} download>{locale === "en" ? "Résumé PDF" : "CV PDF"} <ArrowUpRight size={13} /></a>
              </div>
            </div>

            <aside className="hero-visual" aria-label={t.visualOverviewLabel}>
              <div className="visual-top"><span className="visual-dots"><i /><i /><i /></span><span>{t.visualBrand}</span><span className="visual-plus">+</span></div>
              <div className="visual-body">
                <span className="visual-kicker">{locale === "es" ? "EJEMPLO EJECUTABLE · PYTHON" : "RUNNABLE EXAMPLE · PYTHON"}</span>
                <h2>{locale === "es" ? "Conciliación CSV verificable" : "Verifiable CSV reconciliation"}</h2>
                <p>{locale === "es" ? "Datos ficticios incluidos en el repositorio. Ejecución local con Python y pruebas automáticas." : "Synthetic fixtures in the public repository. Local Python execution and automated tests."}</p>
                <div className="hero-terminal" role="group" aria-label={locale === "es" ? "Ejemplo reproducible de salida del programa Python" : "Reproducible output of the Python program"}>
                  <div className="hero-terminal-command"><span aria-hidden="true">$</span> python reconcile.py --feed feed.csv --observed observed.csv --output report.csv</div>
                  <div className="hero-terminal-results">
                    <span><strong>01</strong> match</span>
                    <span><strong>01</strong> mismatch</span>
                    <span><strong>01</strong> missing</span>
                    <span><strong>01</strong> extra</span>
                  </div>
                  <div className="hero-terminal-export"><span aria-hidden="true">✓</span> report.csv <span>{locale === "es" ? "generado localmente" : "generated locally"}</span></div>
                </div>
                <a className="hero-proof-link" href={GITHUB + "/portfolio/tree/main/examples/csv"} target="_blank" rel="noopener noreferrer">{locale === "es" ? "Ver código, datos y pruebas" : "View source, fixtures and tests"}<ArrowUpRight size={16} aria-hidden="true" /></a>
                <p className="visual-disclaimer">{locale === "es" ? "Resultado de muestra reproducible · No es una ejecución de un cliente ni una captura de una aplicación privada." : "Reproducible sample output · Not customer work or a screenshot of a private product."}</p>
              </div>
            </aside>
          </div>
          <div className="container hero-bottom">
            <a href="#about" className="scroll-cue">{t.heroScroll} <ArrowDown size={15} /></a>
            <span>PYTHON <b>·</b> TYPESCRIPT <b>·</b> REACT <b>·</b> SQL</span>
          </div>
        </section>

        <VerifiedWork locale={locale}/>
        <VisitorRoutes locale={locale}/>

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
              <span className="section-count">/ {String(projects.length).padStart(2,"0")} {t.workCasesLabel}</span>
            </div>
            <div className="section-intro">
              <h2 className="section-title" id="work-heading">{t.workTitle} <em>{t.workAccent}</em></h2>
              <p>{t.workIntro}</p>
            </div>
            <div className="project-status-guide" role="note" aria-label={t.projectGuideTitle}>
              <strong>{t.projectGuideTitle}</strong>
              <span>{t.projectGuidePublic}</span>
              <span>{t.projectGuidePrivate}</span>
              <span>{t.projectGuideClient}</span>
            </div>
            <div className="project-filters" role="group" aria-label={t.filterLabel}>
              {groupIds.map((group, index) => (
                <button type="button" key={group} onClick={() => { setFilter(group); setShowAllProjects(false); setExpanded(null); }}
                  className={filter === group ? "filter active" : "filter"} aria-pressed={filter === group}>
                  {t.filters[index]}
                </button>
              ))}
            </div>
            <div className="project-grid" id="project-list">
              {visibleProjects.map((project, index) => (
                <article className="project-card" key={project.id}>
                  <div className="project-card-top">
                    <span className="project-index">{String(index+1).padStart(2,"0")} / {String(visibleProjects.length).padStart(2,"0")}</span>
                    <span className="project-status"><span className="status-ring" />{project.status[locale]}</span>
                  </div>
                  <ProjectVisual id={project.id} locale={locale} />
                  <div className="project-info">
                    <span className="project-category">{project.category[locale]}</span>
                    <h3>{project.name}</h3>
                    <p>{project.summary[locale]}</p>
                  </div>
                  <div className="tag-list" role="list" aria-label={t.labelTech}>
                    {project.technologies.map((technology) => <span role="listitem" key={technology}>{displayTechnology(technology)}</span>)}
                  </div>
                  <div className="project-actions">
                    <a className="case-deep-link" href={localPage("cases/#" + project.id)} target="_blank" rel="noopener noreferrer">
                      {locale === "en" ? "Full case study" : "Caso de estudio"} <ArrowUpRight size={14} />
                    </a>
                    <button type="button" aria-expanded={expanded === project.id}
                      aria-controls={expanded === project.id ? "notes-" + project.id : undefined}
                      onClick={() => setExpanded(expanded === project.id ? null : project.id)}>
                      {expanded === project.id ? t.hideCase : t.caseStudy}
                      <ChevronDown size={17} className={expanded === project.id ? "rotate" : ""} />
                    </button>
                    {project.id === "catalog-integrity" && (
                      <a href={localPage("labs/")} target="_blank" rel="noopener noreferrer">{locale === "en" ? "Independent public sample" : "Ejemplo público independiente"} <ExternalLink size={15}/></a>
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
            {filter === "all" && (
              <button type="button" className="project-show-more" onClick={() => { setShowAllProjects(!showAllProjects); setExpanded(null); }}
                aria-expanded={showAllProjects} aria-controls="project-list">
                {showAllProjects ? t.showFewerProjects : t.showMoreProjects}<ArrowDown size={17} aria-hidden="true" />
              </button>
            )}
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

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="container contact-inner">
            <div>
              <span className="section-eyebrow">{t.contactEyebrow}</span>
              <h2 id="contact-heading" className="section-title">{t.contactTitle} <em>{t.contactAccent}</em></h2>
              <p>{t.contactText}</p>
              <div className="contact-paths">
                <article className="contact-path">
                  <span className="contact-path-label">{t.contactHiringLabel}</span>
                  <h3>{t.contactHiringTitle}</h3>
                  <p>{t.contactHiringDesc}</p>
                  <a className="button button-dark" href={"mailto:" + EMAIL + "?subject=" + encodeURIComponent(locale === "es" ? "Oportunidad laboral remota de programación" : "Remote software engineering opportunity")}>
                    <Mail size={18} aria-hidden="true"/>{t.contactHiringAction}<ArrowUpRight size={16} aria-hidden="true"/>
                  </a>
                  <a className="contact-secondary" href={localPage("hiring/")}>{t.hiringBrief}<ArrowUpRight size={15} aria-hidden="true"/></a>
                  <a className="contact-secondary" href={UPWORK} target="_blank" rel="noopener noreferrer">{locale === "es" ? "Contratar servicios freelance en Upwork" : "Hire freelance development on Upwork"}<ArrowUpRight size={15} aria-hidden="true"/></a>
                </article>
                <article className="contact-path contact-path-business">
                  <span className="contact-path-label">{t.contactBusinessLabel}</span>
                  <h3>{t.contactBusinessTitle}</h3>
                  <p>{t.contactBusinessDesc}</p>
                  <a className="button button-dark" href={"mailto:" + EMAIL + "?subject=" + encodeURIComponent(locale === "es" ? "Consulta sobre software empresarial VYRA" : "VYRA business software inquiry")}>
                    <Mail size={18} aria-hidden="true"/>{t.contactBusinessAction}<ArrowUpRight size={16} aria-hidden="true"/>
                  </a>
                  <a className="contact-secondary" href={localPage("trust/")}>{t.contactBuyerAction}<ShieldCheck size={15} aria-hidden="true"/></a>
                </article>
              </div>
              <div className="contact-utilities">
                <span>{t.contactCvLabel}</span>
                <a href={import.meta.env.BASE_URL + "resume.html"}>{t.contactCv}<ArrowUpRight size={15} aria-hidden="true"/></a>
                <a href={import.meta.env.BASE_URL + "resume-en.pdf"} download>{t.cvEn} (PDF)</a>
                <a href={import.meta.env.BASE_URL + "resume-es.pdf"} download>{t.cvEs} (PDF)</a>
                <button className="copy-email-button" type="button" onClick={async () => {
                  try {
                    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
                    await navigator.clipboard.writeText(EMAIL);
                    setCopyState("success");
                  } catch { setCopyState("failure"); }
                }}>{locale === "en" ? "Copy email" : "Copiar correo"} <Mail size={15} aria-hidden="true"/></button>
                <span className="copy-email-status" aria-live="polite">
                  {copyState === "success" ? (locale === "en" ? "Address copied" : "Correo copiado") :
                   copyState === "failure" ? (locale === "en" ? "Use the email link above" : "Usa el enlace de correo") : ""}
                </span>
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
            <a href="#contact" aria-label={t.footerContact}><Mail size={20} /></a>
            <a href="#top" aria-label={t.footerTop}><ArrowUpRight size={20} /></a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Alerson Morales. {t.rights}</span>
          <a href={localPage("trust/")} target="_blank" rel="noopener noreferrer">{t.businessTrust} <ArrowUpRight size={13} aria-hidden="true"/></a>
          <span>{t.footerBuilt}</span>
        </div>
      </footer>
    </>
  );
}
