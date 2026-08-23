import { ArrowUp, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <a href="#home" className="footer-logo">
            NATAEL<span>.</span>
          </a>

          <p>
            Full-Stack Developer · AI · Automation
          </p>
        </div>

        <div className="footer-right">
          <a
            href="https://github.com/natanaelprogimo-afk"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Code2 size={18} />
          </a>

          <a href="#home" aria-label="Back to top">
            <ArrowUp size={18} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Natael. All rights reserved.</span>

        <span>Built with React &amp; TypeScript.</span>
      </div>
    </footer>
  );
}
