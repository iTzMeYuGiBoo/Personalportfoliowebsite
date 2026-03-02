import { MapPinIcon, MailIcon, CalendarIcon, CoffeeIcon } from "./Icons";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useReveal } from "./useReveal";
import profilePic from "../../assets/profilePic.jpg";

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
];

const FACTS = [
  { Icon: MapPinIcon, text: "Dublin 9, Ireland" },
  { Icon: MailIcon, text: "yugandharreddybana@outlook.com" },
  { Icon: CalendarIcon, text: "Stamp 1G – Full Working Rights" },
  { Icon: CoffeeIcon, text: "Available for Immediate Start" },
];

export function About() {
  useReveal();

  return (
    <section id="about" className="pf-section">
      <div className="pf-container">
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">About Me</p>
          <h2 className="pf-section-title reveal reveal-d1">Who I Am</h2>
        </div>

        <div className="pf-about-grid">
          <div className="pf-about-img-wrap reveal">
            <div className="pf-about-img-container">
              <div className="pf-about-img-border" />
              <div className="pf-about-img-bg" />
              <ImageWithFallback
                src={profilePic}
                alt="Yugandhar Reddy Bana"
                className="pf-about-img"
              />
            </div>
          </div>

          <div>
            <h3 className="pf-about-heading reveal">
              Full Stack Software Engineer based in Dublin, Ireland
            </h3>
            <p className="pf-about-para reveal reveal-d1">
              Full Stack Software Engineer with 2.5 years of enterprise experience, specializing in building and scaling web applications that integrate high‑performance Java and Node.js backends with modern React.js and TypeScript frontends.
            </p>
            <p className="pf-about-para reveal reveal-d2">
              Delivered measurable results by modernizing a Verizon enterprise platform, achieving a 67% reduction in system latency. Highly skilled in applying a data-driven, AI-augmented development approach—leveraging tools like Cursor, GitHub Copilot, ChatGPT, and Google Gemini—to accelerate delivery velocity, optimize legacy architectures, and ensure exceptional code quality.
            </p>

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
