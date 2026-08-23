import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="status-dot" />
          Available for freelance work
        </div>

        <p className="hero-eyebrow">FULL-STACK DEVELOPER · AI · AUTOMATION</p>

        <h1>
          I build digital
          <span>products that work.</span>
        </h1>

        <p className="hero-description">
          I&apos;m Natael, a developer focused on building web applications,
          mobile apps, AI-powered tools, APIs and automation systems.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="button button-primary">
            View my work
            <ArrowRight size={18} />
          </a>

          <a href="#contact" className="button button-secondary">
            Let&apos;s work together
          </a>
        </div>

        <div className="hero-socials" aria-label="Social links">
          <a
            href="https://github.com/natanaelprogimo-afk"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.087 2.91.831.091-.646.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.58 9.58 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48A10.001 10.001 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
            </svg>
          </a>

          <a href="#" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.01 2.01 0 0 0 3.24 5c0 1.1.9 2 2.01 2a2 2 0 1 0 0-4ZM20.76 13.41c0-3.47-1.85-5.09-4.32-5.09-1.99 0-2.88 1.1-3.38 1.87V8.5H9.68V20h3.38v-6.4c0-1.69.32-3.33 2.42-3.33 2.07 0 2.1 1.94 2.1 3.44V20h3.18v-6.59Z" />
            </svg>
          </a>
        </div>
      </div>

      <a href="#about" className="scroll-indicator">
        <span>Scroll to explore</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
