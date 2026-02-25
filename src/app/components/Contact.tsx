import { useState } from "react";
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckCircleIcon } from "./Icons";
import { useReveal } from "./useReveal";

const INFO = [
  { Icon: MailIcon,  label: "Email",    value: "alex@example.com",   href: "mailto:alex@example.com" },
  { Icon: PhoneIcon, label: "Phone",    value: "+1 (555) 123-4567",  href: "tel:+15551234567" },
  { Icon: MapPinIcon,label: "Location", value: "San Francisco, CA",  href: "#" },
];

export function Contact() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <section id="contact" className="pf-section">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">Let's Talk</p>
          <h2 className="pf-section-title reveal reveal-d1">Get In Touch</h2>
          <p className="pf-section-desc reveal reveal-d2">
            Have a project in mind or just want to chat? I'd love to hear from you.
            I typically respond within 24 hours.
          </p>
        </div>

        <div className="pf-contact-grid">
          {/* Info cards */}
          <div className="pf-contact-cards">
            {INFO.map(({ Icon, label, value, href }) => (
              <a key={label} href={href} className="pf-contact-card reveal">
                <span className="pf-contact-icon">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="pf-contact-lbl">{label}</p>
                  <p className="pf-contact-val">{value}</p>
                </div>
              </a>
            ))}

            {/* Availability card */}
            <div className="pf-avail-card reveal">
              <div className="pf-avail-header">
                <span className="pf-avail-dot" />
                Currently Available
              </div>
              <p className="pf-avail-desc">
                Open to freelance projects, part-time contracts, and full-time roles.
                Let's build something great together!
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="pf-contact-form-box reveal reveal-d2">
            {submitted ? (
              <div className="pf-success-state">
                <div className="pf-success-icon">
                  <CheckCircleIcon size={32} />
                </div>
                <p className="pf-success-title">Message Sent!</p>
                <p className="pf-success-desc">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  className="pf-btn-primary"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="pf-form-row">
                  <div className="pf-form-group">
                    <label className="pf-form-label" htmlFor="name">Your Name</label>
                    <input id="name" name="name" type="text" required
                      className="pf-form-input" placeholder="John Doe"
                      value={form.name} onChange={onChange} />
                  </div>
                  <div className="pf-form-group">
                    <label className="pf-form-label" htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" required
                      className="pf-form-input" placeholder="john@example.com"
                      value={form.email} onChange={onChange} />
                  </div>
                </div>

                <div className="pf-form-group">
                  <label className="pf-form-label" htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" type="text" required
                    className="pf-form-input" placeholder="Project collaboration"
                    value={form.subject} onChange={onChange} />
                </div>

                <div className="pf-form-group">
                  <label className="pf-form-label" htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required
                    className="pf-form-textarea"
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message} onChange={onChange} />
                </div>

                <button type="submit" className="pf-form-submit" disabled={loading}>
                  {loading ? (
                    <><span className="pf-spinner" /> Sending...</>
                  ) : (
                    <><SendIcon size={16} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
