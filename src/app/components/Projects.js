import { useRef, useCallback, useState } from "react";
import { GithubIcon } from "./Icons";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useReveal } from "./useReveal";

const FILTERS = ["All", "React", "Node.js", "Java", "TypeScript", "AI/ML"];

const PROJECTS = [
  {
    id: "proj_ai_data_extractor",
    title: "AI Learning Assistant (Flash Card Application)",
    description:
      "Developed a full-stack study app with complex state management, using GenAI to automate content creation and reducing manual input by 70%.",
    img: "https://images.unsplash.com/photo-1551281044-8b6d7f3d8f50?auto=format&fit=crop&w=1200&q=80",
    tags: ["Node.js", "React.js", "AI/ML"],
  },
  {
    id: "proj_verizon_dashboard",
    title: "Enterprise Customer Search Dashboard",
    description:
      "Optimized Verizon customer search experience with React and Redux, improving speed and usability for high-volume support flows.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js","Java"],
  },
  {
    id: "proj_microservices_migration",
    title: "Legacy-to-Microservices Migration",
    description:
      "Migrated monolithic modules to Java Spring Boot microservices with better reliability, deployment flow, and maintainability.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tags: ["Java", "Node.js"],
  },
  // {
  //   id: "proj_portfolio_site",
  //   title: "Personal Portfolio Website",
  //   description:
  //     "Designed and developed a responsive portfolio with modern UI, smooth interactions, and accessible section-based navigation.",
  //   img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  //   tags: ["React", "TypeScript"],
  // },
];

function TiltCard({ children }) {
  const cardRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
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
  const projects = PROJECTS;
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  useReveal();

  // Filter projects based on selected tag
  const filteredProjects = selectedFilter === "All" 
    ? projects 
    : projects.filter(p => p.tags && p.tags.some(tag => tag === selectedFilter));

  return (
    <section id="projects" className="pf-section">
      <div className="pf-container">
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">Portfolio</p>
          <h2 className="pf-section-title reveal reveal-d1">Featured Projects</h2>
          <p className="pf-section-desc reveal reveal-d2">
            A selection of projects I'm proud of — from concept to deployment.
          </p>
        </div>

        <div className="pf-filter-row reveal">
          {FILTERS.map((f, i) => (
            <button 
              key={f} 
              className={`pf-filter-btn${selectedFilter === f ? " active" : ""}`}
              onClick={() => setSelectedFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="pf-empty-state reveal">
            <p>No projects found.</p>
          </div>
        ) : (
          <div className="pf-projects-grid">
            {filteredProjects.map((project, i) => (
              <div key={project.id} className={`reveal reveal-d${i + 1}`}>
                <TiltCard>
                  <div className="pf-project-img-wrap">
                    <ImageWithFallback
                      src={project.img || project.image}
                      alt={project.title}
                      className="pf-project-img"
                    />
                  </div>

                  <div className="pf-project-body">
                    <h3 className="pf-project-title">{project.title}</h3>
                    <p className="pf-project-desc">{project.desc || project.description}</p>
                    <div className="pf-project-tags">
                      {project.tags && project.tags.map((tag) => (
                        <span key={tag} className="pf-project-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        )}

        <div className="pf-projects-footer reveal">
          <a
            href="https://github.com/iTzMeYuGiBoo"
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
