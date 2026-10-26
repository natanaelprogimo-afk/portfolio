import { ArrowUpRight, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-number">
        0{index + 1}
      </div>

      <div className="project-content">
        <div className="project-top">
          <span className="project-category">
            {project.category}
          </span>

          <span className="project-status">
            {project.status}
          </span>
        </div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="project-technologies">
          {project.technologies.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>

        <div className="project-links">
          <Link to={`/project/${project.id}`}>
            View case study
            <ArrowUpRight size={16} />
          </Link>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={16} />
              GitHub
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
