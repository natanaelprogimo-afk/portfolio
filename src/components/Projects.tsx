import { ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const featuredProjects = projects.filter(
    (project) => project.featured,
  );

  return (
    <section className="projects section" id="projects">
      <div className="section-container">
        <div className="projects-heading">
          <div className="section-heading">
            <span className="section-label">
              02 — PROJECTS
            </span>

            <h2>
              Things I've
              <span> built.</span>
            </h2>
          </div>

          <p>
            A selection of applications, AI tools, backend systems
            and digital products I've worked on.
          </p>
        </div>

        <div className="projects-list">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        <div className="projects-more">
          <a href="#contact">
            Have a project in mind?
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
