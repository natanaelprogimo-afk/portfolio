import {
  ArrowUpRight,
  Code2,
  Mail,
  BriefcaseBusiness,
} from "lucide-react";

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="section-container">
        <div className="contact-card">
          <div className="contact-content">
            <span className="section-label">05 — CONTACT</span>

            <h2>
              Have an idea?
              <span> Let&apos;s build it.</span>
            </h2>

            <p>
              Whether you need a web application, mobile app, AI
              integration, backend system or automation, I&apos;m open to
              discussing your project.
            </p>

            <div className="contact-actions">
              <a
                href="mailto:TU_EMAIL_AQUI"
                className="button button-primary"
              >
                <Mail size={18} />
                Send me an email
              </a>

              <a
                href="https://github.com/natanaelprogimo-afk"
                target="_blank"
                rel="noreferrer"
                className="button button-secondary"
              >
                <Code2 size={18} />
                GitHub
              </a>
            </div>
          </div>

          <div className="contact-platforms">
            <a
              href="#"
              className="platform-link"
            >
              <div>
                <BriefcaseBusiness size={19} />

                <div>
                  <strong>Upwork</strong>
                  <span>Available for freelance projects</span>
                </div>
              </div>

              <ArrowUpRight size={18} />
            </a>

            <a
              href="#"
              className="platform-link"
            >
              <div>
                <BriefcaseBusiness size={19} />

                <div>
                  <strong>Fiverr</strong>
                  <span>View my services</span>
                </div>
              </div>

              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
