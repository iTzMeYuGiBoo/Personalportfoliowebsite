import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "./Icons";

const NAV_LINKS = [
  { label: "About",      href: "about" },
  { label: "Skills",     href: "skills" },
  { label: "Projects",   href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Contact",    href: "contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].href);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(NAV_LINKS[i].href);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    scrollTo(id);
  };

  return (
    <header className={`pf-navbar${scrolled ? " scrolled" : ""}`}>
      <div className="pf-navbar-inner">
        {/* Logo */}
        <button
          className="pf-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          Alex<span>.</span>
        </button>

        {/* Desktop nav */}
        <nav aria-label="Main navigation">
          <ul className="pf-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  className={`pf-nav-btn${active === link.href ? " active" : ""}`}
                  onClick={() => handleNav(link.href)}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button className="pf-nav-cta" onClick={() => handleNav("contact")}>
                Hire Me
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          className="pf-menu-btn"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`pf-mobile-nav${mobileOpen ? " open" : ""}`}>
        <div className="pf-mobile-nav-inner">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              className={`pf-mobile-btn${active === link.href ? " active" : ""}`}
              onClick={() => handleNav(link.href)}
            >
              {link.label}
            </button>
          ))}
          <button className="pf-mobile-cta" onClick={() => handleNav("contact")}>
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
}
