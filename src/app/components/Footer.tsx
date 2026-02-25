import { GithubIcon, LinkedinIcon, TwitterIcon, HeartIcon, ArrowUpIcon } from "./Icons";

const NAV = [
  { label: "About",      id: "about" },
  { label: "Skills",     id: "skills" },
  { label: "Projects",   id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact",    id: "contact" },
];

const SOCIALS = [
  { Icon: GithubIcon,   href: "https://github.com",   label: "GitHub" },
  { Icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: TwitterIcon,  href: "https://twitter.com",  label: "Twitter" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="pf-footer">
      <div className="pf-footer-main">
        {/* Brand */}
        <div>
          <div className="pf-footer-logo">Alex<span>.</span></div>
          <p className="pf-footer-tagline">
            Full Stack Developer passionate about building clean, scalable,
            and user-friendly web applications.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="pf-footer-heading">Quick Links</h4>
          <ul className="pf-footer-links">
            {NAV.map((n) => (
              <li key={n.id}>
                <button className="pf-footer-link-btn" onClick={() => scrollTo(n.id)}>
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="pf-footer-heading">Connect</h4>
          <div className="pf-footer-socials">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="pf-footer-social"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
          <p className="pf-footer-cta-text">
            Open to new opportunities.{" "}
            <button className="pf-footer-cta-btn" onClick={() => scrollTo("contact")}>
              Let's talk!
            </button>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pf-footer-bottom">
        <p className="pf-footer-copy">
          © {new Date().getFullYear()} Alex Johnson. Made with{" "}
          <HeartIcon size={12} style={{ display: "inline", verticalAlign: "middle", color: "#f87171" }} />{" "}
          using React & Pure CSS.
        </p>
        <button
          className="pf-footer-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          Back to top
          <span className="pf-top-icon">
            <ArrowUpIcon size={13} />
          </span>
        </button>
      </div>
    </footer>
  );
}
