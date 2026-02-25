import { useEffect, useRef } from "react";
import { useReveal } from "./useReveal";

const CATEGORIES = [
  {
    label: "Frontend",
    color: "indigo",
    skills: [
      { name: "React",        pct: 95 },
      { name: "TypeScript",   pct: 90 },
      { name: "Next.js",      pct: 85 },
      { name: "Tailwind CSS", pct: 92 },
      { name: "Vue.js",       pct: 75 },
    ],
  },
  {
    label: "Backend",
    color: "violet",
    skills: [
      { name: "Node.js",   pct: 88 },
      { name: "Python",    pct: 80 },
      { name: "PostgreSQL",pct: 82 },
      { name: "GraphQL",   pct: 78 },
      { name: "REST APIs", pct: 93 },
    ],
  },
  {
    label: "Tools & Cloud",
    color: "purple",
    skills: [
      { name: "AWS",        pct: 75 },
      { name: "Docker",     pct: 80 },
      { name: "Git & GitHub",pct: 95 },
      { name: "CI/CD",      pct: 78 },
      { name: "Figma",      pct: 72 },
    ],
  },
];

const BADGES = [
  "React", "TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL",
  "MongoDB", "GraphQL", "AWS", "Docker", "Redis", "Tailwind CSS",
  "Prisma", "tRPC", "Vercel", "Linux",
];

// Animate skill bars when they enter viewport
function SkillBars({ skills, color }: { skills: typeof CATEGORIES[0]["skills"]; color: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fills = el.querySelectorAll<HTMLElement>(".pf-skill-fill");
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
  useReveal();

  return (
    <section id="skills" className="pf-section-alt">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">My Expertise</p>
          <h2 className="pf-section-title reveal reveal-d1">Skills & Technologies</h2>
          <p className="pf-section-desc reveal reveal-d2">
            A collection of technologies I work with, built through years of practice
            on real-world projects.
          </p>
        </div>

        {/* Skill cards */}
        <div className="pf-skills-grid">
          {CATEGORIES.map(({ label, color, skills }, i) => (
            <div key={label} className={`pf-skill-card reveal reveal-d${i + 1}`}>
              <span className={`pf-skill-tag ${color}`}>{label}</span>
              <SkillBars skills={skills} color={color} />
            </div>
          ))}
        </div>

        {/* Tech badges cloud */}
        <div className="pf-tech-cloud reveal">
          <p className="pf-tech-cloud-title">Also familiar with</p>
          <div className="pf-tech-badges">
            {BADGES.map((tech) => (
              <span key={tech} className="pf-tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
