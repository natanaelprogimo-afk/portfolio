import { ArrowLeft, Code2, ExternalLink, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <main className="project-not-found">
        <div>
          <h1>Project not found</h1>

          <Link to="/">
            <ArrowLeft size={17} />
            Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="project-details">
      <div className="project-details-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <header className="project-details-header">
          <span className="section-label">
            PROJECT — {project.category}
          </span>

          <h1>{project.title}</h1>

          <p>{project.description}</p>

          <div className="project-details-actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary"
              >
                <Code2 size={17} />
                GitHub
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="button button-primary"
              >
                Live Demo
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </header>

        <div className="project-hero-placeholder">
          <span>Project screenshots coming soon</span>
        </div>

        <section className="case-study-section">
          <span className="section-label">OVERVIEW</span>

          <h2>About the project</h2>

          <p>{project.longDescription}</p>
        </section>

        <section className="case-study-section">
          <span className="section-label">KEY FEATURES</span>

          <h2>What it does</h2>

          <ul className="case-study-features">
            {project.features.map((feature) => (
              <li key={feature}>
                <CheckCircle2 size={16} />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="case-study-section">
          <span className="section-label">CHALLENGES</span>

          <h2>Technical challenges</h2>

          <p>{project.challenges}</p>
        </section>

        <section className="case-study-section">
          <span className="section-label">TECHNOLOGY</span>

          <h2>Tech stack</h2>

          <div className="case-study-tech">
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>

        <section className="case-study-section">
          <span className="section-label">STATUS</span>

          <h2>Current status</h2>

          <p>{project.status}</p>
        </section>
      </div>
    </main>
  );
}
