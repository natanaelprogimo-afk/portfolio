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
      "High-performance React applications with responsive, accessible interfaces and modern tooling.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile apps built with React Native and Expo, optimized for iOS and Android.",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    description:
      "AI-powered platforms for content generation, product management, and workflow automation.",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description:
      "RESTful APIs, database design, authentication flows, licensing systems, and cloud deployments.",
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
              I&apos;m Natael — a self-taught full-stack developer who
              thrives on turning complex ideas into polished, functional
              products that users actually enjoy.
            </p>

            <p>
              I work across the entire stack — React and Next.js on the
              frontend, Node.js and Express on the backend, React Native
              for mobile, and cloud services to tie it all together.
              Every project I take on is built with clean architecture,
              performance, and scalability in mind.
            </p>

            <p>
              From AI-powered platforms and automated business tools to
              cross-platform mobile apps, I focus on shipping real products
              that solve real problems — not just prototypes.
            </p>

            <a href="#projects" className="about-link">
              Explore my projects →
            </a>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <strong>4+</strong>
              <span>Projects built</span>
            </div>

            <div className="stat-card">
              <strong>2</strong>
              <span>Platforms</span>
            </div>

            <div className="stat-card">
              <strong>10+</strong>
              <span>Technologies</span>
            </div>

            <div className="stat-card">
              <strong>100%</strong>
              <span>Self-taught</span>
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
