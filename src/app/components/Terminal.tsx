import { useState, useRef, useEffect, useCallback } from "react";
import { TerminalIcon, XIcon } from "./Icons";

type LineType = "prompt" | "out" | "green" | "red" | "dim" | "yellow" | "cyan";
interface Line { type: LineType; text: string; }

const WELCOME: Line[] = [
  { type: "green", text: "╔══════════════════════════════════════════╗" },
  { type: "green", text: "║     Welcome to Alex's Portfolio Terminal  ║" },
  { type: "green", text: "╚══════════════════════════════════════════╝" },
  { type: "dim",   text: "Interactive CLI — explore the portfolio by command." },
  { type: "dim",   text: 'Type "help" to list all available commands.' },
  { type: "out",   text: "" },
];

const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { type: "yellow", text: "┌─ Available Commands ──────────────────────┐" },
    { type: "out",    text: "  about        Learn about Alex" },
    { type: "out",    text: "  skills       View technical skills" },
    { type: "out",    text: "  projects     Browse featured projects" },
    { type: "out",    text: "  experience   Work & education history" },
    { type: "out",    text: "  contact      Get in touch" },
    { type: "out",    text: "  whoami       Who am I?" },
    { type: "out",    text: "  ls           List all sections" },
    { type: "out",    text: "  open [name]  Navigate to a section" },
    { type: "out",    text: "  clear        Clear the terminal" },
    { type: "out",    text: "  sudo hire-me 👀" },
    { type: "yellow", text: "└───────────────────────────────────────────┘" },
    { type: "out",    text: "" },
  ],
  whoami: () => [
    { type: "green", text: "alex@portfolio:~$" },
    { type: "out",   text: "" },
    { type: "cyan",  text: "  Name     : Alex Johnson" },
    { type: "cyan",  text: "  Role     : Full Stack Developer" },
    { type: "cyan",  text: "  Location : San Francisco, CA" },
    { type: "cyan",  text: "  Status   : Open to opportunities ✓" },
    { type: "cyan",  text: "  Email    : alex@example.com" },
    { type: "out",   text: "" },
  ],
  about: () => [
    { type: "yellow", text: "── About ───────────────────────────────────" },
    { type: "out",    text: "" },
    { type: "out",    text: "  Alex is a passionate full-stack developer" },
    { type: "out",    text: "  with 5+ years of experience building" },
    { type: "out",    text: "  scalable web applications. Specializes in" },
    { type: "out",    text: "  React, Node.js, and cloud technologies." },
    { type: "out",    text: "" },
    { type: "dim",    text: "  💡 Use 'open about' to jump to the section." },
    { type: "out",    text: "" },
  ],
  skills: () => [
    { type: "yellow", text: "── Tech Skills ─────────────────────────────" },
    { type: "out",    text: "" },
    { type: "green",  text: "  Frontend  :" },
    { type: "out",    text: "    React 95%  TypeScript 90%  Next.js 85%" },
    { type: "out",    text: "    Tailwind 92%  Vue.js 75%" },
    { type: "out",    text: "" },
    { type: "green",  text: "  Backend   :" },
    { type: "out",    text: "    Node.js 88%  Python 80%  PostgreSQL 82%" },
    { type: "out",    text: "    GraphQL 78%  REST APIs 93%" },
    { type: "out",    text: "" },
    { type: "green",  text: "  DevOps    :" },
    { type: "out",    text: "    AWS 75%  Docker 80%  Git 95%  CI/CD 78%" },
    { type: "out",    text: "" },
  ],
  projects: () => [
    { type: "yellow", text: "── Projects ────────────────────────────────" },
    { type: "out",    text: "" },
    { type: "cyan",   text: "  [1] Analytics Dashboard" },
    { type: "dim",    text: "      React · Node.js · D3.js · PostgreSQL" },
    { type: "out",    text: "" },
    { type: "cyan",   text: "  [2] FitTrack Mobile App" },
    { type: "dim",    text: "      React Native · Expo · Firebase · Redux" },
    { type: "out",    text: "" },
    { type: "cyan",   text: "  [3] ShopWave E-Commerce" },
    { type: "dim",    text: "      Next.js · Stripe · Prisma · PostgreSQL" },
    { type: "out",    text: "" },
    { type: "dim",    text: "  💡 Use 'open projects' to see screenshots." },
    { type: "out",    text: "" },
  ],
  experience: () => [
    { type: "yellow", text: "── Experience ──────────────────────────────" },
    { type: "out",    text: "" },
    { type: "green",  text: "  2022–Present  Senior Frontend Dev @ TechCorp" },
    { type: "out",    text: "  2020–2022     Full Stack Dev @ Startup Studio" },
    { type: "out",    text: "  2019–2020     Junior Dev @ Digital Agency Co." },
    { type: "out",    text: "" },
    { type: "green",  text: "  Education:" },
    { type: "out",    text: "  2015–2019     B.S. Computer Science @ UC Berkeley" },
    { type: "out",    text: "" },
  ],
  contact: () => [
    { type: "yellow", text: "── Contact ─────────────────────────────────" },
    { type: "out",    text: "" },
    { type: "cyan",   text: "  Email    : alex@example.com" },
    { type: "cyan",   text: "  Phone    : +1 (555) 123-4567" },
    { type: "cyan",   text: "  Location : San Francisco, CA" },
    { type: "cyan",   text: "  GitHub   : github.com/alexjohnson" },
    { type: "cyan",   text: "  LinkedIn : linkedin.com/in/alexjohnson" },
    { type: "out",    text: "" },
    { type: "dim",    text: '  💡 Or type "sudo hire-me" 😄' },
    { type: "out",    text: "" },
  ],
  ls: () => [
    { type: "out",  text: "" },
    { type: "cyan", text: "  drwxr-xr-x  about/" },
    { type: "cyan", text: "  drwxr-xr-x  skills/" },
    { type: "cyan", text: "  drwxr-xr-x  projects/" },
    { type: "cyan", text: "  drwxr-xr-x  experience/" },
    { type: "cyan", text: "  drwxr-xr-x  contact/" },
    { type: "out",  text: "  -rw-r--r--  resume.pdf" },
    { type: "out",  text: "" },
  ],
};

const SUDO_HIRE: Line[] = [
  { type: "out",   text: "[sudo] password for alex: ••••••••" },
  { type: "green", text: "✓ Authentication successful." },
  { type: "out",   text: "" },
  { type: "yellow",text: "  Initializing hire sequence..." },
  { type: "green", text: "  Opening communication channel ✓" },
  { type: "green", text: "  Redirecting to #contact section ✓" },
  { type: "out",   text: "" },
  { type: "cyan",  text: "  You're about to work with a great developer! 🚀" },
  { type: "out",   text: "" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollBottom = useCallback(() => {
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, 30);
  }, []);

  useEffect(() => {
    if (open) {
      scrollBottom();
      inputRef.current?.focus();
    }
  }, [open, lines, scrollBottom]);

  const appendLines = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const promptLine: Line = { type: "prompt", text: `alex@portfolio:~$ ${raw.trim()}` };
    setHistory((h) => [raw.trim(), ...h]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setLines(WELCOME);
      return;
    }

    const extra: Line[] = [promptLine];

    if (cmd === "sudo hire-me") {
      extra.push(...SUDO_HIRE);
      appendLines(extra);
      setTimeout(() => scrollToSection("contact"), 1200);
      return;
    }

    if (cmd.startsWith("open ")) {
      const section = cmd.replace("open ", "").trim();
      const valid = ["about", "skills", "projects", "experience", "contact"];
      if (valid.includes(section)) {
        extra.push(
          { type: "green", text: `✓ Navigating to #${section}...` },
          { type: "out", text: "" }
        );
        appendLines(extra);
        setTimeout(() => scrollToSection(section), 400);
      } else {
        extra.push(
          { type: "red", text: `  section "${section}" not found.` },
          { type: "dim", text: `  Available: ${valid.join(", ")}` },
          { type: "out", text: "" }
        );
        appendLines(extra);
      }
      return;
    }

    if (COMMANDS[cmd]) {
      extra.push(...COMMANDS[cmd]());
    } else {
      extra.push(
        { type: "red",  text: `  command not found: ${cmd}` },
        { type: "dim",  text: '  Type "help" to see available commands.' },
        { type: "out",  text: "" }
      );
    }

    appendLines(extra);
  }, [appendLines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = [...Object.keys(COMMANDS), "clear", "sudo hire-me", "open about", "open projects", "open contact", "open skills", "open experience"];
      const match = cmds.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        className="pf-terminal-trigger"
        onClick={() => setOpen((v) => !v)}
        title="Open terminal"
        aria-label="Open interactive terminal"
      >
        <span className="pf-term-tooltip">alex@portfolio:~$</span>
        {open ? <XIcon size={20} /> : <TerminalIcon size={20} />}
      </button>

      {/* Terminal window */}
      {open && (
        <div className="pf-terminal-window" role="dialog" aria-label="Portfolio terminal">
          {/* Title bar */}
          <div className="pf-term-titlebar">
            <span className="pf-term-dot red" />
            <span className="pf-term-dot yellow" />
            <span className="pf-term-dot green" />
            <span className="pf-term-title">alex@portfolio: ~/portfolio</span>
          </div>

          {/* Output body */}
          <div className="pf-term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
            {lines.map((line, i) => (
              <span key={i} className={`pf-term-line ${line.type}`}>
                {line.text || "\u00a0"}
              </span>
            ))}
          </div>

          {/* Input row */}
          <div className="pf-term-input-row">
            <span className="pf-term-prompt">alex@portfolio:~$</span>
            <input
              ref={inputRef}
              className="pf-term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              placeholder="type a command..."
              aria-label="Terminal input"
            />
          </div>
        </div>
      )}
    </>
  );
}
