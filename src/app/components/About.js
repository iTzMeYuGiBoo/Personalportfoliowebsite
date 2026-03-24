import { useEffect, useRef, useState } from "react";
import { MapPinIcon, MailIcon, CalendarIcon, CoffeeIcon } from "./Icons";
import { useReveal } from "./useReveal";
import profilePic from "../../assets/profilePic.jpg";

const STATS = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Completed" },
];

const FACTS = [
  { Icon: MapPinIcon,    text: "Dublin 9, Ireland" },
  { Icon: MailIcon,      text: "yugandharreddybana@outlook.com" },
  { Icon: CalendarIcon,  text: "Stamp 1G \u2013 Full Working Rights" },
  { Icon: CoffeeIcon,    text: "Available for Immediate Start" },
];

function useCountUp(target, duration, isVisible) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isVisible]);
  return count;
}

function StatCard({ value, suffix, label, isVisible }) {
  const count = useCountUp(value, 1600, isVisible);
  return (
    <div className="pf-stat-card">
      <span className="pf-stat-value">
        {count}<span className="pf-stat-suffix">{suffix}</span>
      </span>
      <span className="pf-stat-label">{label}</span>
    </div>
  );
}

export function About() {
  useReveal();
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
              <img
                src={profilePic}
                alt="Yugandhar Reddy Bana"
                className="pf-about-img"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 className="pf-about-heading reveal">
              Full Stack Software Engineer based in Dublin, Ireland
            </h3>
            <p className="pf-about-para reveal reveal-d1">
              Full Stack Software Engineer with 2.5 years of enterprise experience, specializing in
              building and scaling web applications that integrate high-performance Java and Node.js
              backends with modern React.js and TypeScript frontends.
            </p>
            <p className="pf-about-para reveal reveal-d2">
              Delivered measurable results by modernizing a Verizon enterprise platform, achieving
              a 67% reduction in system latency. Highly skilled in applying a data-driven,
              AI-augmented development approach&#8212;leveraging tools like Cursor, GitHub Copilot,
              ChatGPT, and Google Gemini&#8212;to accelerate delivery and ensure exceptional quality.
            </p>

            <div className="pf-about-facts reveal reveal-d3">
              {FACTS.map(({ Icon, text }) => (
                <div key={text} className="pf-fact">
                  <span className="pf-fact-icon"><Icon size={15} /></span>
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

        <div className="pf-stats-grid" ref={statsRef}>
          {STATS.map(({ value, suffix, label }, i) => (
            <div key={label} className={`reveal reveal-d${i + 1}`}>
              <StatCard value={value} suffix={suffix} label={label} isVisible={statsVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
