import {
  BrainCircuit,
  Code2,
  Database,
  Smartphone,
} from "lucide-react";

const areas = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Modern web applications, responsive interfaces and custom solutions.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications using React Native and Expo.",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    description:
      "AI-powered tools, content generation systems and API integrations.",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description:
      "APIs, databases, authentication, licensing systems and cloud infrastructure.",
  },
];

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">01 — ABOUT</span>

          <h2>
            I build software
            <span> from idea to product.</span>
          </h2>
        </div>

        <div className="about-main">
          <div className="about-text">
            <p className="about-lead">
              I&apos;m Natael, a developer focused on building digital products,
              applications and AI-powered tools.
            </p>

            <p>
              I work across frontend, backend, mobile development, APIs,
              databases and cloud services. I enjoy taking an idea and
              turning it into a functional product with a clean interface
              and a solid technical foundation.
            </p>

            <p>
              My projects include mobile applications, AI integrations,
              automation systems, backend services, licensing platforms and
              custom digital tools.
            </p>

            <a href="#projects" className="about-link">
              Explore my projects →
            </a>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <strong>AI</strong>
              <span>Powered tools</span>
            </div>

            <div className="stat-card">
              <strong>Apps</strong>
              <span>Web &amp; mobile</span>
            </div>

            <div className="stat-card">
              <strong>APIs</strong>
              <span>Backend systems</span>
            </div>

            <div className="stat-card">
              <strong>Cloud</strong>
              <span>Modern infrastructure</span>
            </div>
          </div>
        </div>

        <div className="areas-grid">
          {areas.map((area) => {
            const Icon = area.icon;

            return (
              <article className="area-card" key={area.title}>
                <div className="area-icon">
                  <Icon size={20} />
                </div>

                <h3>{area.title}</h3>

                <p>{area.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
