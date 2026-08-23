import {
  Globe,
  Smartphone,
  BrainCircuit,
  Server,
  Workflow,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Globe,
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications designed around your business or product.",
    features: [
      "Responsive interfaces",
      "React applications",
      "Custom UI",
      "API integrations",
    ],
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications built with React Native and Expo.",
    features: [
      "Android & iOS",
      "React Native",
      "Expo",
      "Backend integration",
    ],
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "AI Integration",
    description:
      "AI-powered features and tools integrated directly into your website, application or workflow.",
    features: [
      "AI APIs",
      "Content generation",
      "AI workflows",
      "Custom integrations",
    ],
  },
  {
    number: "04",
    icon: Server,
    title: "Backend & APIs",
    description:
      "Reliable backend systems, APIs, authentication and database integrations.",
    features: [
      "REST APIs",
      "Node.js",
      "Supabase",
      "Cloudflare Workers",
    ],
  },
  {
    number: "05",
    icon: Workflow,
    title: "Automation",
    description:
      "Automated workflows that reduce repetitive tasks and turn manual processes into scalable systems.",
    features: [
      "Data processing",
      "Automated reports",
      "API workflows",
      "AI automation",
    ],
  },
];

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">
            04 — SERVICES
          </span>

          <h2>
            What I can
            <span> build for you.</span>
          </h2>
        </div>

        <div className="services-list">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className="service-card"
                key={service.number}
              >
                <div className="service-number">
                  {service.number}
                </div>

                <div className="service-icon">
                  <Icon size={21} />
                </div>

                <div className="service-content">
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <div className="service-features">
                    {service.features.map((feature) => (
                      <span key={feature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="service-arrow"
                  aria-label={`Ask about ${service.title}`}
                >
                  <ArrowUpRight size={19} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
