import { useEffect, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon, DownloadIcon, ArrowDownIcon } from "./Icons";

const TITLES = [
  "Full Stack Software Engineer",
  "React.js & TypeScript Specialist",
  "Java & Node.js Backend Expert",
  "AI-Augmented Developer",
  "Enterprise Solutions Architect",
  "Microservices & Cloud Engineer",
];

const CV_PATH = process.env.PUBLIC_URL + "/Yugandhar_Reddy_Bana_CV.pdf";

function useParticleCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0;
    let mouse = { x: -9999, y: -9999 };
    let animId;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = Math.min(80, Math.floor((width * height) / 12000));
    const particles = Array.from({ length: N || 40 }, () => ({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 600),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.6;
          p.vy += (dy / dist) * force * 0.6;
        }
        p.vx *= 0.97; p.vy *= 0.97;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 130) * 0.18})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [canvasRef]);
}

function useTypingEffect(words) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 65);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplayed(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return displayed;
}

function MagneticBtn({ children, className, onClick, href, download, as: Tag = "button" }) {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  const style = { transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)" };
  if (Tag === "a") {
    return (
      <a ref={ref} className={className} href={href} download={download}
        onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} className={className} onClick={onClick}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={style}>
      {children}
    </button>
  );
}

const SOCIALS = [
  { Icon: GithubIcon,   href: "https://github.com/iTzMeYuGiBoo",                    label: "GitHub" },
  { Icon: LinkedinIcon, href: "https://linkedin.com/in/yugandhar-reddy-bana",        label: "LinkedIn" },
  { Icon: TwitterIcon,  href: "https://twitter.com",                                 label: "Twitter" },
];

export function Hero() {
  const canvasRef = useRef(null);
  useParticleCanvas(canvasRef);
  const typedTitle = useTypingEffect(TITLES);

  return (
    <section className="pf-hero">
      <canvas
        ref={canvasRef}
        className="pf-hero-canvas"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      />

      <div className="pf-hero-content">
        <div className="pf-hero-badge">
          <span className="pf-badge-dot" />
          Available for new opportunities
        </div>

        <h1 className="pf-hero-title">
          Hi, I&#39;m{" "}
          <span className="pf-hero-gradient">Yugandhar Reddy Bana</span>
        </h1>

        <div className="pf-hero-subtitle-wrap">
          <span className="pf-hero-subtitle">
            {typedTitle}
            <span className="pf-typing-cursor" aria-hidden="true" />
          </span>
        </div>

        <p className="pf-hero-desc">
          Building and scaling enterprise web applications with modern React,
          Java, and Node.js. Leveraging AI-augmented development
          to deliver exceptional results.
        </p>

        <div className="pf-hero-actions">
          <MagneticBtn
            className="pf-btn-primary"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
          </MagneticBtn>
          <MagneticBtn
            as="a"
            className="pf-btn-secondary"
            href={CV_PATH}
            download="Yugandhar_Reddy_Bana_CV.pdf"
          >
            <DownloadIcon size={16} />
            Download CV
          </MagneticBtn>
        </div>

        <div className="pf-hero-socials">
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="pf-social-btn"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <button
        className="pf-scroll-hint"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll down"
      >
        <span>Scroll down</span>
        <ArrowDownIcon size={16} />
      </button>
    </section>
  );
}
