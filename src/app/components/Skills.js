import { useEffect, useRef } from "react";
import { useReveal } from "./useReveal";

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    color: "indigo",
    skills: [
      { name: "React.js", pct: 90 },
      { name: "TypeScript", pct: 85 },
      { name: "JavaScript", pct: 90 },
      { name: "Redux", pct: 85 },
    ],
  },
  {
    label: "Backend",
    color: "violet",
    skills: [
      { name: "Node.js", pct: 85 },
      { name: "Java", pct: 90 },
      { name: "Spring Boot", pct: 85 },
      { name: "Microservices", pct: 80 },
    ],
  },
  {
    label: "Cloud & DevOps",
    color: "purple",
    skills: [
      { name: "CI/CD", pct: 85 },
      { name: "Jenkins", pct: 80 },
      { name: "Docker", pct: 75 },
      { name: "AWS", pct: 70 },
    ],
  },
];

const TECH_BADGES = [
  "PostgreSQL",
  "MongoDB",
  "Jest",
  "JUnit",
  "Figma",
  "Git",
  "Agile/Scrum",
  "AI Tools (Cursor, Copilot, Claude)",
];

function SkillBars({ skills, color }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fills = el.querySelectorAll(".pf-skill-fill");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fills.forEach((fill) => {
            fill.style.width = fill.dataset.pct + "%";
          });
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="pf-skill-list">
      {skills.map(({ name, pct }) => (
        <div key={name}>
          <div className="pf-skill-label-row">
            <span className="pf-skill-name">{name}</span>
            <span className="pf-skill-pct">{pct}%</span>
          </div>
          <div className="pf-skill-track">
            <div
              className={`pf-skill-fill ${color}`}
              data-pct={pct}
              style={{ width: 0 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Skills() {
  const categories = SKILL_CATEGORIES;
  const badges = TECH_BADGES;
  
  useReveal();

  return (
    <section id="skills" className="pf-section-alt">
      <div className="pf-container">
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">My Expertise</p>
          <h2 className="pf-section-title reveal reveal-d1">Skills & Technologies</h2>
          <p className="pf-section-desc reveal reveal-d2">
            A collection of technologies I work with, built through years of practice
            on real-world projects.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="pf-empty-state reveal">
            <p>No skills found.</p>
          </div>
        ) : (
          <>
            <div className="pf-skills-grid">
              {categories.map(({ label, color, skills }, i) => (
                <div key={label} className={`pf-skill-card reveal reveal-d${i + 1}`}>
                  <span className={`pf-skill-tag ${color}`}>{label}</span>
                  <SkillBars skills={skills} color={color} />
                </div>
              ))}
            </div>

            {badges.length > 0 && (
              <div className="pf-tech-cloud reveal">
                <p className="pf-tech-cloud-title">Also familiar with</p>
                <div className="pf-tech-badges">
                  {badges.map((tech) => (
                    <span key={tech} className="pf-tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
