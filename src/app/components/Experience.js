import { BriefcaseIcon, GraduationIcon } from "./Icons";
import { useReveal } from "./useReveal";

const EXPERIENCE_ITEMS = [
  {
    id: "we_freelance_full_stack_2024",
    type: "work",
    title: "Freelance Full Stack Software Developer",
    company: "Independent",
    location: "Dublin, Ireland",
    period: "Apr 2024 – Sep 2024",
    responsibilities: [
      "Designed responsive UI screens in Figma with AI-assisted layout workflows.",
      "Built full-stack features across React/TypeScript frontend, Node middleware, and Java backend.",
      "Architected scalable API layers and robust end-to-end data flows.",
      "Implemented test suites across UI and backend endpoints for high confidence delivery.",
    ],
    tags: ["React.js", "TypeScript", "Node.js", "Java", "Figma", "AI Tools"],
  },
  {
    id: "we_incedo_verizon_2021_2024",
    type: "work",
    title: "Full Stack Software Engineer",
    company: "Incedo Technologies (Client: Verizon)",
    location: "Hyderabad, India",
    period: "Aug 2021 – Jan 2024",
    responsibilities: [
      "Optimized a core customer search dashboard using React and Redux to reduce latency.",
      "Migrated legacy monolith modules to Java Spring Boot microservices.",
      "Engineered a real-time CSV processing pipeline with Node.js and Java.",
      "Improved release quality by integrating tests and quality gates into CI/CD workflows.",
    ],
    tags: ["React.js", "Redux", "Java", "Spring Boot", "Node.js", "Jenkins", "Microservices"],
  },
  {
    id: "ed_msc_data_analytics_nci_2024_2025",
    type: "edu",
    title: "MSc in Data Analytics",
    company: "National College of Ireland",
    location: "Dublin, Ireland",
    period: "Jan 2024 – Jan 2025",
    responsibilities: ["Grade: 2:1"],
    tags: ["Education"],
  },
  {
    id: "ed_bsc_cse_sastra_2017_2021",
    type: "edu",
    title: "BSc in Computer Science & Engineering",
    company: "SASTRA University",
    location: "India",
    period: "Jul 2017 – Aug 2021",
    responsibilities: ["Grade: 7.49/10"],
    tags: ["Education"],
  },
];

export function Experience() {
  const items = EXPERIENCE_ITEMS;
  
  useReveal();

  return (
    <section id="experience" className="pf-section-alt">
      <div className="pf-container">
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">My Journey</p>
          <h2 className="pf-section-title reveal reveal-d1">Experience & Education</h2>
        </div>

        {items.length === 0 ? (
          <div className="pf-empty-state reveal">
            <p>No experience found.</p>
          </div>
        ) : (
          <div className="pf-timeline">
            {items.map((item, i) => (
              <div key={item.id || i} className={`pf-timeline-item reveal reveal-d${(i % 4) + 1}`}>
                <div className={`pf-timeline-icon ${item.type || 'work'}`}>
                  {item.type === "education" || item.type === "edu"
                    ? <GraduationIcon size={16} />
                    : <BriefcaseIcon size={16} />
                  }
                </div>

                <div className="pf-timeline-body">
                  <div className="pf-timeline-card">
                    <span className="pf-tl-period">{item.period}</span>
                    <h3 className="pf-tl-title">{item.title}</h3>
                    <p className="pf-tl-company">{item.company}</p>
                    <p className="pf-tl-location">{item.location}</p>
                    <ul className="pf-tl-list">
                      {item.responsibilities && item.responsibilities.map((resp, idx) => (
                        <li key={idx} className="pf-tl-list-item">{resp}</li>
                      ))}
                    </ul>
                    <div className="pf-tl-tags">
                      {item.tags && item.tags.map((tag) => (
                        <span key={tag} className="pf-tl-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
