import { useEffect } from "react";
import { MapPinIcon, MailIcon, CalendarIcon, CoffeeIcon } from "./Icons";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useReveal } from "./useReveal";

const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "40+", label: "Projects Completed" },
  { value: "20+", label: "Happy Clients" },
  { value: "3", label: "Open Source Libs" },
];

const FACTS = [
  { Icon: MapPinIcon,  text: "San Francisco, CA" },
  { Icon: MailIcon,    text: "alex@example.com" },
  { Icon: CalendarIcon,text: "Available March 2026" },
  { Icon: CoffeeIcon,  text: "Coffee-driven developer" },
];

export function About() {
  useReveal();

  return (
    <section id="about" className="pf-section">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">About Me</p>
          <h2 className="pf-section-title reveal reveal-d1">Who I Am</h2>
        </div>

        {/* Grid */}
        <div className="pf-about-grid">
          {/* Image */}
          <div className="pf-about-img-wrap reveal">
            <div className="pf-about-img-container">
              <div className="pf-about-img-border" />
              <div className="pf-about-img-bg" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1653732212701-b729f0b08330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MTk0NTI0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Alex Johnson"
                className="pf-about-img"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="pf-about-heading reveal">
              Full Stack Developer based in San Francisco
            </h3>
            <p className="pf-about-para reveal reveal-d1">
              I'm a passionate full-stack developer with over 5 years of experience building
              scalable web applications. I specialize in React, Node.js, and cloud technologies,
              with a strong focus on creating intuitive user experiences.
            </p>
            <p className="pf-about-para reveal reveal-d2">
              When I'm not coding, you'll find me exploring the latest design trends, contributing
              to open-source projects, or enjoying a great cup of coffee while reading about
              emerging technologies.
            </p>

            {/* Facts */}
            <div className="pf-about-facts reveal reveal-d3">
              {FACTS.map(({ Icon, text }) => (
                <div key={text} className="pf-fact">
                  <span className="pf-fact-icon">
                    <Icon size={15} />
                  </span>
                  {text}
                </div>
              ))}
            </div>

            <button
              className="pf-btn-primary reveal reveal-d4"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="pf-stats-grid">
          {STATS.map(({ value, label }, i) => (
            <div key={label} className={`pf-stat-card reveal reveal-d${i + 1}`}>
              <span className="pf-stat-value">{value}</span>
              <span className="pf-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
