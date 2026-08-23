import {
  Braces,
  Database,
  BrainCircuit,
  Wrench,
  Smartphone,
} from "lucide-react";

const skillGroups = [
  {
    icon: Braces,
    title: "Frontend",
    description: "Interfaces and web applications",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    description: "Cross-platform applications",
    skills: [
      "React Native",
      "Expo",
      "Expo Router",
      "AsyncStorage",
    ],
  },
  {
    icon: Database,
    title: "Backend & Database",
    description: "APIs and data infrastructure",
    skills: [
      "Node.js",
      "Express",
      "Supabase",
      "PostgreSQL",
      "Cloudflare D1",
    ],
  },
  {
    icon: BrainCircuit,
    title: "AI & APIs",
    description: "Intelligent products and integrations",
    skills: [
      "Workers AI",
      "Claude API",
      "REST APIs",
      "AI Integration",
    ],
  },
  {
    icon: Wrench,
    title: "Tools & Cloud",
    description: "Development and deployment",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Wrangler",
      "Cloudflare Workers",
    ],
  },
];

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">
            03 — TECHNOLOGIES
          </span>

          <h2>
            Tools I use to
            <span> build products.</span>
          </h2>
        </div>

        <div className="skills-list">
          {skillGroups.map((group) => {
            const Icon = group.icon;

            return (
              <article className="skill-group" key={group.title}>
                <div className="skill-group-header">
                  <div className="skill-icon">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                </div>

                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
