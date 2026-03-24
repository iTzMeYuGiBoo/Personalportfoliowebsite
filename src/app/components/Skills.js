import { useReveal } from "./useReveal";

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    color: "indigo",
    icon: "⚡",
    skills: ["React.js", "TypeScript", "JavaScript", "Redux", "HTML5", "CSS3"],
  },
  {
    label: "Backend",
    color: "violet",
    icon: "🔧",
    skills: ["Node.js", "Java", "Spring Boot", "Microservices", "REST APIs", "GraphQL"],
  },
  {
    label: "Cloud & DevOps",
    color: "purple",
    icon: "☁️",
    skills: ["AWS", "Docker", "CI/CD", "Jenkins", "Git", "Linux"],
  },
];

const TECH_BADGES = [
  "PostgreSQL", "MongoDB", "Jest", "JUnit", "Figma",
  "Agile/Scrum", "AI Tools (Cursor, Copilot, Claude)", "Google Gemini",
];

export function Skills() {
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

        <div className="pf-skills-grid">
          {SKILL_CATEGORIES.map(({ label, color, icon, skills }, i) => (
            <div key={label} className={`pf-skill-card ${color} reveal reveal-d${i + 1}`}>
              <div className="pf-skill-card-header">
                <div className={`pf-skill-card-icon ${color}`}>
                  <span role="img" aria-label={label}>{icon}</span>
                </div>
                <span className={`pf-skill-tag ${color}`}>{label}</span>
              </div>
              <div className="pf-skill-badges">
                {skills.map((skill) => (
                  <span key={skill} className={`pf-skill-badge ${color}`}>
                    <span className="pf-skill-badge-dot" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pf-tech-cloud reveal">
          <p className="pf-tech-cloud-title">Also familiar with</p>
          <div className="pf-tech-badges">
            {TECH_BADGES.map((tech) => (
              <span key={tech} className="pf-tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
