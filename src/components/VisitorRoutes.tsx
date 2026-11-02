import { ArrowUpRight, BadgeCheck, BriefcaseBusiness, ShieldCheck } from "lucide-react";
import type { Locale } from "../data/projects";
import { copy } from "../data/copy";

/**
 * Two different audiences, two honest paths. The buyer route is due diligence,
 * not a live product catalog or a promise that private products are released.
 */
export default function VisitorRoutes({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const pages = [
    {
      icon: BriefcaseBusiness,
      eyebrow: t.routeHiringLabel,
      title: t.routeHiringTitle,
      text: t.routeHiringDescription,
      bullets: t.routeHiringBullets,
      action: t.routeHiringAction,
      href: import.meta.env.BASE_URL + locale + "/hiring/"
    },
    {
      icon: ShieldCheck,
      eyebrow: t.routeBuyerLabel,
      title: t.routeBuyerTitle,
      text: t.routeBuyerDescription,
      bullets: t.routeBuyerBullets,
      action: t.routeBuyerAction,
      href: import.meta.env.BASE_URL + locale + "/trust/"
    }
  ];
  return (
    <section className="visitor-routes" id="start-here" aria-labelledby="routes-heading">
      <div className="container">
        <div className="routes-heading">
          <span className="section-eyebrow">{t.routeEyebrow}</span>
          <h2 id="routes-heading">{t.routeHeading}</h2>
          <p>{t.routeIntro}</p>
        </div>
        <div className="routes-grid">
          {pages.map(({icon: Icon, eyebrow, title, text, bullets, action, href}) => (
            <article className="route-card" key={href}>
              <div className="route-top">
                <span className="route-icon"><Icon size={21} aria-hidden="true"/></span>
                <span className="route-eyebrow">{eyebrow}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>
                {bullets.map(item => <li key={item}><BadgeCheck size={16} aria-hidden="true"/>{item}</li>)}
              </ul>
              <a className="route-link" href={href}>
                {action}<ArrowUpRight size={17} aria-hidden="true"/>
              </a>
            </article>
          ))}
        </div>
        <p className="routes-disclaimer">{t.routeDisclaimer}</p>
      </div>
    </section>
  );
}
