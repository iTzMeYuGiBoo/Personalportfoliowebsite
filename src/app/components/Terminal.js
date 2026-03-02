import { useState, useRef, useEffect, useCallback } from "react";
import { TerminalIcon, XIcon } from "./Icons";

const WELCOME = [
  { type: "green", text: "╔══════════════════════════════════════════╗" },
  { type: "green", text: "║     Welcome to Yugandhar's Portfolio Terminal  ║" },
  { type: "green", text: "╚══════════════════════════════════════════╝" },
  { type: "dim",   text: "Interactive CLI — explore the portfolio by command." },
  { type: "dim",   text: 'Type "help" to list all available commands.' },
  { type: "out",   text: "" },
];

const COMMANDS = {
  help: () => [
    { type: "yellow", text: "┌─ Available Commands ──────────────────────┐" },
    { type: "out",    text: "  about        Learn about Yugandhar" },
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
    { type: "green", text: "yugandhar@portfolio:~$" },
    { type: "out",   text: "" },
    { type: "cyan",  text: "  Name     : Yugandhar Reddy Bana" },
    { type: "cyan",  text: "  Role     : Full Stack Developer" },
    { type: "cyan",  text: "  Location : Dublin, Ireland" },
    { type: "cyan",  text: "  Status   : Open to opportunities ✓" },
    { type: "cyan",  text: "  Email    : yugandharreddybana@outlook.com" },
    { type: "out",   text: "" },
  ],
  about: () => [
    { type: "yellow", text: "── About ───────────────────────────────────" },
    { type: "out",    text: "" },
    { type: "out",    text: "  Full Stack Software Engineer with 3+ years" },
    { type: "out",    text: "  of enterprise experience building scalable" },
    { type: "out",    text: "  web applications. Specializes in React," },
    { type: "out",    text: "  TypeScript, Java, Node.js, and cloud tech." },
    { type: "out",    text: "" },
    { type: "dim",    text: "  💡 Use 'open about' to jump to the section." },
    { type: "out",    text: "" },
  ],
  skills: () => [
    { type: "yellow", text: "── Tech Skills ─────────────────────────────" },
    { type: "out",    text: "" },
    { type: "green",  text: "  Frontend  :" },
    { type: "out",    text: "    React 90%  TypeScript 85%  JavaScript 90%" },
    { type: "out",    text: "    Redux 85%" },
    { type: "out",    text: "" },
    { type: "green",  text: "  Backend   :" },
    { type: "out",    text: "    Node.js 85%  Java 90%  Spring Boot 85%" },
    { type: "out",    text: "    Microservices 80%" },
    { type: "out",    text: "" },
    { type: "green",  text: "  Cloud & DevOps :" },
    { type: "out",    text: "    CI/CD 85%  Jenkins 80%  Docker 75%  AWS 70%" },
    { type: "out",    text: "" },
  ],
  projects: () => [
    { type: "yellow", text: "── Projects ────────────────────────────────" },
    { type: "out",    text: "" },
    { type: "cyan",   text: "  [1] AI-Based Data Extraction Engine" },
    { type: "dim",    text: "      Node.js · TypeScript · AI/ML" },
    { type: "out",    text: "" },
    { type: "cyan",   text: "  [2] Enterprise Customer Search Dashboard" },
    { type: "dim",    text: "      React · Redux · TypeScript" },
    { type: "out",    text: "" },
    { type: "cyan",   text: "  [3] Legacy-to-Microservices Migration" },
    { type: "dim",    text: "      Java · Spring Boot · Node.js" },
    { type: "out",    text: "" },
    { type: "dim",    text: "  💡 Use 'open projects' to see more details." },
    { type: "out",    text: "" },
  ],
  experience: () => [
    { type: "yellow", text: "── Experience ──────────────────────────────" },
    { type: "out",    text: "" },
    { type: "green",  text: "  Apr 2024–Sep 2024  Freelance Full Stack Dev" },
    { type: "out",    text: "  Aug 2021–Jan 2024  Full Stack Dev @ Incedo" },
    { type: "out",    text: "                     (Client: Verizon)" },
    { type: "out",    text: "" },
    { type: "green",  text: "  Education:" },
    { type: "out",    text: "  2024–2025     MSc Data Analytics @ NCI Dublin" },
    { type: "out",    text: "  2017–2021     BSc Computer Science @ SASTRA" },
    { type: "out",    text: "" },
  ],
  contact: () => [
    { type: "yellow", text: "── Contact ─────────────────────────────────" },
    { type: "out",    text: "" },
    { type: "cyan",   text: "  Email    : yugandharreddybana@outlook.com" },
    { type: "cyan",   text: "  Phone    : +353 (89) 4851413" },
    { type: "cyan",   text: "  Location : Dublin, Ireland" },
    { type: "cyan",   text: "  GitHub   : github.com/iTzMeYuGiBoo" },
    { type: "cyan",   text: "  LinkedIn : linkedin.com/in/yugandhar-reddy-bana" },
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

const SUDO_HIRE = [
  { type: "out",   text: "[sudo] password for yugandhar: ••••••••" },
  { type: "green", text: "✓ Authentication successful." },
  { type: "out",   text: "" },
  { type: "yellow",text: "  Initializing hire sequence..." },
  { type: "green", text: "  Opening communication channel ✓" },
  { type: "green", text: "  Redirecting to #contact section ✓" },
  { type: "out",   text: "" },
  { type: "cyan",  text: "  You're about to work with a great developer! 🚀" },
  { type: "out",   text: "" },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

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

  const appendLines = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const promptLine = { type: "prompt", text: `yugandhar@portfolio:~$ ${raw.trim()}` };
    setHistory((h) => [raw.trim(), ...h]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setLines(WELCOME);
      return;
    }

    const extra = [promptLine];

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

  const handleKeyDown = (e) => {
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
      <button
        className="pf-terminal-trigger"
        onClick={() => setOpen((v) => !v)}
        title="Open terminal"
        aria-label="Open interactive terminal"
      >
        <span className="pf-term-tooltip">yugandhar@portfolio:~$</span>
        {open ? <XIcon size={20} /> : <TerminalIcon size={20} />}
      </button>

      {open && (
        <div className="pf-terminal-window" role="dialog" aria-label="Portfolio terminal">
          <div className="pf-term-titlebar">
            <span className="pf-term-dot red" />
            <span className="pf-term-dot yellow" />
            <span className="pf-term-dot green" />
            <span className="pf-term-title">yugandhar@portfolio: ~/portfolio</span>
          </div>

          <div className="pf-term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
            {lines.map((line, i) => (
              <span key={i} className={`pf-term-line ${line.type}`}>
                {line.text || "\u00a0"}
              </span>
            ))}
          </div>

          <div className="pf-term-input-row">
            <span className="pf-term-prompt">yugandhar@portfolio:~$</span>
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
