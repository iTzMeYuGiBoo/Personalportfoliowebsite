import { BriefcaseIcon, GraduationIcon } from "./Icons";
import { useReveal } from "./useReveal";

const ITEMS = [
  {
    type: "work",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    period: "2022 – Present",
    desc: "Led frontend development for the core product. Architected the migration from a legacy codebase to a modern React + TypeScript stack, reducing load time by 40%. Mentored a team of 3 junior developers.",
    tags: ["React", "TypeScript", "AWS", "GraphQL"],
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Startup Studio",
    location: "Remote",
    period: "2020 – 2022",
    desc: "Built and shipped 5 SaaS products from scratch. Owned the entire tech stack from database design and API architecture to responsive UIs. Worked closely with clients to deliver on time.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    type: "work",
    title: "Junior Web Developer",
    company: "Digital Agency Co.",
    location: "New York, NY",
    period: "2019 – 2020",
    desc: "Developed marketing websites and e-commerce stores for clients across various industries. Improved site performance scores and implemented SEO best practices.",
    tags: ["JavaScript", "Vue.js", "WordPress", "PHP"],
  },
  {
    type: "edu",
    title: "B.S. Computer Science",
    company: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2015 – 2019",
    desc: "Graduated with honors. Specialized in software engineering and human-computer interaction. Thesis on adaptive UI for accessibility — awarded Best Senior Project.",
    tags: ["Algorithms", "HCI", "Software Engineering"],
  },
];

export function Experience() {
  useReveal();

  return (
    <section id="experience" className="pf-section-alt">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">My Journey</p>
          <h2 className="pf-section-title reveal reveal-d1">Experience & Education</h2>
        </div>

        {/* Timeline */}
        <div className="pf-timeline">
          {ITEMS.map((item, i) => (
            <div key={i} className={`pf-timeline-item reveal reveal-d${(i % 4) + 1}`}>
              {/* Icon */}
              <div className={`pf-timeline-icon ${item.type}`}>
                {item.type === "work"
                  ? <BriefcaseIcon size={16} />
                  : <GraduationIcon size={16} />
                }
              </div>

              {/* Card */}
              <div className="pf-timeline-body">
                <div className="pf-timeline-card">
                  <span className="pf-tl-period">{item.period}</span>
                  <h3 className="pf-tl-title">{item.title}</h3>
                  <p className="pf-tl-company">{item.company}</p>
                  <p className="pf-tl-location">{item.location}</p>
                  <p className="pf-tl-desc">{item.desc}</p>
                  <div className="pf-tl-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="pf-tl-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
