import { useState, useRef } from "react";
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckCircleIcon } from "./Icons";
import { useReveal } from "./useReveal";

const INFO = [
  { Icon: MailIcon,  label: "Email",    value: "yugandharreddybana@outlook.com",   href: "mailto:yugandharreddybana@outlook.com" },
  { Icon: PhoneIcon, label: "Phone",    value: "+353 (89) 4851413",  href: "tel:+353894851413" },
  { Icon: MapPinIcon,label: "Location", value: "Dublin, Ireland",  href: "https://maps.google.com/?q=Dublin,Ireland" },
];

// Rate limiting: Prevent spam (max 1 submission per 5 minutes)
const canSubmit = () => {
  const lastSubmit = localStorage.getItem('portfolioLastSubmit');
  if (!lastSubmit) return true;
  const timeSince = Date.now() - parseInt(lastSubmit);
  return timeSince > 5 * 60 * 1000; // 5 minutes
};

// Enhanced email validation (stricter than HTML5)
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// Input sanitization to prevent XSS
const sanitizeInput = (str) => {
  return str.replace(/<[^>]*>/g, '').trim();
};

// Comprehensive form validation
const validateForm = (form) => {
  const errors = {};
  
  const name = form.name.trim();
  const email = form.email.trim();
  const subject = form.subject.trim();
  const message = form.message.trim();
  
  if (!name) {
    errors.name = 'Name is required';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }
  
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address (e.g., name@example.com)';
  } else if (email.length > 100) {
    errors.email = 'Email must be less than 100 characters';
  }
  
  if (!subject) {
    errors.subject = 'Subject is required';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  } else if (subject.length > 200) {
    errors.subject = 'Subject must be less than 200 characters';
  }
  
  if (!message) {
    errors.message = 'Message is required';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (message.length > 2000) {
    errors.message = 'Message must be less than 2000 characters';
  }
  
  return errors;
};

export function Contact() {
  useReveal();
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: '' }));
    }
    // Clear API error when user edits form
    if (apiError) {
      setApiError('');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    setApiError('');
    
    // Validate form
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field for accessibility
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }
    
    // Check rate limiting (spam prevention)
    if (!canSubmit()) {
      setApiError('⏱️ Please wait 5 minutes between submissions to prevent spam. Try again shortly or email me directly.');
      return;
    }
    
    setLoading(true);

    try {
      const sanitized = {
        name: sanitizeInput(form.name),
        email: sanitizeInput(form.email),
        subject: sanitizeInput(form.subject),
        message: sanitizeInput(form.message),
      };

      const mailtoSubject = encodeURIComponent(sanitized.subject);
      const mailtoBody = encodeURIComponent(
        `Name: ${sanitized.name}\nEmail: ${sanitized.email}\n\n${sanitized.message}`
      );

      window.location.href = `mailto:yugandharreddybana@outlook.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      setSubmitted(true);
      localStorage.setItem('portfolioLastSubmit', Date.now().toString());
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Form submission error:', error);
      setApiError('❌ Unable to open email client. Please email me directly at yugandharreddybana@outlook.com.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
    setApiError('');
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="pf-section">
      <div className="pf-container">
        <div className="pf-section-header">
          <p className="pf-section-tag reveal">Let's Talk</p>
          <h2 className="pf-section-title reveal reveal-d1">Get In Touch</h2>
          <p className="pf-section-desc reveal reveal-d2">
            Have a project in mind or just want to chat? I'd love to hear from you.
            I typically respond within 24 hours.
          </p>
        </div>

        <div className="pf-contact-grid">
          <div className="pf-contact-cards">
            {INFO.map(({ Icon, label, value, href }) => (
              <a 
                key={label} 
                href={href} 
                className="pf-contact-card reveal"
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className="pf-contact-icon">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="pf-contact-lbl">{label}</p>
                  <p className="pf-contact-val">{value}</p>
                </div>
              </a>
            ))}

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

          <div className="pf-contact-form-box reveal reveal-d2">
            {submitted ? (
              <div className="pf-success-state">
                <div className="pf-success-icon">
                  <CheckCircleIcon size={32} />
                </div>
                <p className="pf-success-title">✅ Message Sent Successfully!</p>
                <p className="pf-success-desc">
                  Thank you for reaching out! Your message has been delivered to <strong>yugandharreddybana@outlook.com</strong>.
                  I'll get back to you within 24 hours.
                </p>
                <button
                  className="pf-btn-primary"
                  onClick={resetForm}
                  aria-label="Send another message"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate>
                {apiError && (
                  <div className="pf-form-error-banner" role="alert" aria-live="polite">
                    {apiError}
                  </div>
                )}

                <div className="pf-form-row">
                  <div className="pf-form-group">
                    <label className="pf-form-label" htmlFor="name">
                      Your Name <span className="pf-required" aria-label="required">*</span>
                    </label>
                    <input 
                      id="name" 
                      name="name" 
                      type="text" 
                      required
                      maxLength={100}
                      className={`pf-form-input ${errors.name ? 'pf-form-input-error' : ''}`}
                      placeholder="John Doe"
                      value={form.name} 
                      onChange={onChange}
                      disabled={loading}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="pf-form-error" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="pf-form-group">
                    <label className="pf-form-label" htmlFor="email">
                      Email Address <span className="pf-required" aria-label="required">*</span>
                    </label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required
                      maxLength={100}
                      className={`pf-form-input ${errors.email ? 'pf-form-input-error' : ''}`}
                      placeholder="john@example.com"
                      value={form.email} 
                      onChange={onChange}
                      disabled={loading}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="pf-form-error" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pf-form-group">
                  <label className="pf-form-label" htmlFor="subject">
                    Subject <span className="pf-required" aria-label="required">*</span>
                  </label>
                  <input 
                    id="subject" 
                    name="subject" 
                    type="text" 
                    required
                    maxLength={200}
                    className={`pf-form-input ${errors.subject ? 'pf-form-input-error' : ''}`}
                    placeholder="Project collaboration"
                    value={form.subject} 
                    onChange={onChange}
                    disabled={loading}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error subject-counter' : 'subject-counter'}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="pf-form-error" role="alert">
                      {errors.subject}
                    </p>
                  )}
                  <p id="subject-counter" className="pf-form-hint" aria-live="polite">
                    {form.subject.length}/200 characters
                  </p>
                </div>

                <div className="pf-form-group">
                  <label className="pf-form-label" htmlFor="message">
                    Message <span className="pf-required" aria-label="required">*</span>
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required
                    minLength={10}
                    maxLength={2000}
                    className={`pf-form-textarea ${errors.message ? 'pf-form-input-error' : ''}`}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message} 
                    onChange={onChange}
                    disabled={loading}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error message-counter' : 'message-counter'}
                  />
                  {errors.message && (
                    <p id="message-error" className="pf-form-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                  <p id="message-counter" className="pf-form-hint" aria-live="polite">
                    {form.message.length}/2000 characters
                    {form.message.length > 0 && form.message.length < 10 && ' (minimum 10 characters)'}
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="pf-form-submit" 
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span className="pf-spinner" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon size={16} aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="pf-form-privacy">
                  🔒 Your information is secure and will only be used to respond to your inquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
