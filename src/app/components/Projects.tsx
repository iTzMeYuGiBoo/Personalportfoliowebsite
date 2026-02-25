import { useRef, useCallback } from "react";
import { GithubIcon, ExternalLinkIcon } from "./Icons";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useReveal } from "./useReveal";

const PROJECTS = [
  {
    id: 1,
    title: "Analytics Dashboard",
    desc: "A comprehensive real-time analytics platform with data visualization, custom reporting, and team collaboration features built with React and D3.js.",
    img: "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBwcm9qZWN0JTIwVUklMjBkZXNpZ258ZW58MXx8fHwxNzcxOTY0NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "D3.js"],
    live: "#", github: "#",
  },
  {
    id: 2,
    title: "FitTrack Mobile App",
    desc: "A cross-platform fitness tracking application with workout logging, progress charts, nutrition tracking, and social sharing capabilities.",
    img: "https://images.unsplash.com/photo-1641862039942-5815d8f74938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBpbnRlcmZhY2UlMjBjbGVhbnxlbnwxfHx8fDE3NzE5NjQ1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React Native", "Expo", "Firebase", "Redux"],
    live: "#", github: "#",
  },
  {
    id: 3,
    title: "ShopWave E-Commerce",
    desc: "A full-featured e-commerce platform with product management, secure checkout, inventory tracking, and an admin panel for store owners.",
    img: "https://images.unsplash.com/photo-1657812159075-7f0abd98f7b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzdG9yZSUyMHdlYnNpdGUlMjBwcm9qZWN0fGVufDF8fHx8MTc3MTk2NDUzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind"],
    live: "#", github: "#",
  },
];

const FILTERS = ["All", "React", "Next.js", "Node.js", "React Native"];

// 3D tilt effect on project cards
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="pf-project-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: "transform 0.15s ease, box-shadow 0.3s ease" }}
    >
      {children}
    </div>
  );
}

export function Projects() {
  useReveal();

  return (
    <section id="projects" className="pf-section">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">Portfolio</p>
          <h2 className="pf-section-title reveal reveal-d1">Featured Projects</h2>
          <p className="pf-section-desc reveal reveal-d2">
            A selection of projects I'm proud of — from concept to deployment.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="pf-filter-row reveal">
          {FILTERS.map((f, i) => (
            <button key={f} className={`pf-filter-btn${i === 0 ? " active" : ""}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="pf-projects-grid">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className={`reveal reveal-d${i + 1}`}>
              <TiltCard>
                {/* Image */}
                <div className="pf-project-img-wrap">
                  <ImageWithFallback
                    src={project.img}
                    alt={project.title}
                    className="pf-project-img"
                  />
                  <div className="pf-project-overlay">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="pf-proj-action" aria-label="View source on GitHub">
                      <GithubIcon size={15} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="pf-proj-action" aria-label="Open live site">
                      <ExternalLinkIcon size={15} />
                    </a>
                  </div>
                </div>

                {/* Body */}
                <div className="pf-project-body">
                  <h3 className="pf-project-title">{project.title}</h3>
                  <p className="pf-project-desc">{project.desc}</p>
                  <div className="pf-project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pf-project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="pf-projects-footer reveal">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pf-github-link"
          >
            <GithubIcon size={18} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
