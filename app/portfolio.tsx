"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCheck,
  FiClipboard,
  FiCode,
  FiDatabase,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMenu,
  FiX,
  FiArrowUp,
} from "react-icons/fi";
import {
  SiAngular,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const nav = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Contact", "#contact"],
];

type Project = {
  number: string;
  name: string;
  label: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
  className: string;
  visual?: Array<{ label: string; value: string }>;
};

const projects: Project[] = [
  {
    number: "01",
    name: "ResumeFlow",
    label: "Full-stack ATS resume builder",
    description:
      "A production-style Angular 13 and Node.js monorepo with 36 REST endpoints and 9 relational models, JWT authentication, drag-and-drop editing, live preview, version history, public sharing, and PDF/DOCX export.",
    tech: ["Angular 13", "TypeScript", "Node.js", "MySQL", "Sequelize"],
    image: "/projects/resumeflow.png",
    github: "https://github.com/GAURAVNEGI33/ResumeFlow",
    live: "",
    className: "project project-feature",
  },
  {
    number: "02",
    name: "AI Notification Router",
    label: "HackerRank Orchestrate · Top 14%",
    description:
      "A safety-first multimodal router for text, image, and voice messages that combines Gemini analysis, retrieval, OCR, and deterministic safeguards to choose notify, digest, or mute actions.",
    tech: ["Python", "Gemini API", "TF-IDF", "OCR", "GitHub Actions"],
    image: "",
    github: "https://github.com/GAURAVNEGI33/ai-notification-router",
    live: "",
    className: "project project-small project-code",
    visual: [
      { label: "input", value: "text | image | voice" },
      { label: "engine", value: "retrieval + Gemini + safety" },
      { label: "action", value: "notify | digest | mute" },
    ],
  },
  {
    number: "03",
    name: "FitTrack AI",
    label: "AI nutrition PWA · 300+ foods",
    description:
      "A nutrition-tracking PWA with Google OAuth, real-time Firestore sync, a 300+ item Indian and global food database, and Claude-to-Gemini fallback for complex meal analysis.",
    tech: ["React", "Firebase", "Firestore", "Claude", "Gemini"],
    image: "/projects/fittrack.png",
    github: "https://github.com/GAURAVNEGI33/fittrack-AI",
    live: "https://fittrack-ai-1227.vercel.app",
    className: "project project-wide",
  },
  {
    number: "04",
    name: "Resume API",
    label: "34 routes · relational backend",
    description:
      "A layered REST API with modular routes, controllers, models, validation, bcrypt hashing, duplicate-email checks, and a Sequelize-backed User–Resume relationship with cascade deletion.",
    tech: ["Node.js", "Express.js", "Sequelize", "MySQL", "bcrypt"],
    image: "",
    github: "https://github.com/GAURAVNEGI33/resume-api",
    live: "",
    className: "project project-wide project-code project-full-row",
    visual: [
      { label: "request", value: "validate()" },
      { label: "service", value: "controller → Sequelize" },
      { label: "response", value: "relational JSON" },
    ],
  },
];

const stack = [
  { name: "Angular", Icon: SiAngular },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "MySQL", Icon: SiMysql },
  { name: "React", Icon: SiReact },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Python", Icon: SiPython },
];

function MagneticLink({
  href,
  children,
  className = "",
  download,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      className={className}
      style={{ x, y }}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - rect.left - rect.width / 2) * 0.14);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.14);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 160, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 160, damping: 20 });

  return (
    <motion.article
      ref={cardRef}
      className={project.className}
      style={{ rotateX: smoothX, rotateY: smoothY, transformPerspective: 1200 }}
      onMouseMove={(event) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        cardRef.current?.style.setProperty("--px", `${event.clientX - rect.left}px`);
        cardRef.current?.style.setProperty("--py", `${event.clientY - rect.top}px`);
        rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 3);
        rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 3);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {project.image ? (
        <div className="project-image-wrap">
          <img
            src={project.image}
            alt={`${project.name} interface`}
            className="project-image"
            loading="lazy"
          />
          <div className="project-image-shade" />
        </div>
      ) : (
        <div className="code-visual" aria-hidden="true">
          {project.visual?.map((line) => (
            <div key={line.label}>
              <span>{line.label}</span> → {line.value}
            </div>
          ))}
        </div>
      )}
      <div className="project-content">
        <div className="project-topline">
          <span>{project.number}</span>
          <span>{project.label}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-bottom">
          <ul aria-label={`${project.name} technologies`}>
            {project.tech.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="project-links">
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`}>
              <FiGithub />
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live`}>
                <FiArrowUpRight />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [copied, setCopied] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 24 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 24 });
  const glowTransform = useTransform(
    [glowX, glowY],
    ([x, y]) => `translate3d(${x}px, ${y}px, 0)`
  );

  useEffect(() => {
    const hasVisited = window.sessionStorage.getItem("gn-portfolio-visited");
    if (hasVisited) {
      setShowLoader(false);
      setLoaded(true);
    } else {
      window.sessionStorage.setItem("gn-portfolio-visited", "true");
      setLoaded(true);
      window.setTimeout(() => setShowLoader(false), 1450);
    }
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    const handleScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", handleScroll, { passive: true });

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { scrub: 0.2, start: 0, end: "max" },
    });
    gsap.utils.toArray<HTMLElement>(".parallax-orb").forEach((orb, index) => {
      gsap.to(orb, {
        yPercent: index % 2 ? 35 : -30,
        ease: "none",
        scrollTrigger: { trigger: orb, scrub: 1.2 },
      });
    });

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        const label =
          nav.find(([, href]) => href === `#${visible.target.id}`)?.[0] ??
          activeSection;
        setActiveSection(label);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("gauravnegigvps@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      onMouseMove={(event) => {
        mouseX.set(event.clientX - 210);
        mouseY.set(event.clientY - 210);
      }}
    >
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <motion.div className="mouse-glow" style={{ transform: glowTransform }} />
      <div className="noise" aria-hidden="true" />
      <div className="progress-bar" aria-hidden="true" />

      {showLoader && (
        <motion.div
          className="loader"
          initial={false}
          animate={loaded ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            GN<span>®</span>
          </motion.span>
          <div className="loader-line" />
        </motion.div>
      )}

      <header className="nav-shell">
        <a className="wordmark" href="#top" aria-label="Gaurav Negi, home">
          GN<span>®</span>
        </a>
        <nav aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <a
              href={href}
              key={label}
              className={activeSection === label ? "active" : ""}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-contact" href="mailto:gauravnegigvps@gmail.com">
          Let&apos;s talk <FiArrowUpRight />
        </a>
        <button
          className="mobile-menu-trigger"
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>
      <motion.div
        className="mobile-menu"
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -18, pointerEvents: "none" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>Navigate / 2026</span>
        {nav.map(([label, href], index) => (
          <a href={href} key={label} onClick={() => setMobileOpen(false)}>
            <small>0{index + 1}</small>{label}<FiArrowUpRight />
          </a>
        ))}
        <a className="mobile-email" href="mailto:gauravnegigvps@gmail.com">Start a conversation</a>
      </motion.div>

      <section className="hero" id="top">
        <div className="aurora aurora-one parallax-orb" />
        <div className="aurora aurora-two parallax-orb" />
        <motion.div
          className="hero-status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <span />
          Available for internships &amp; collaborative work
        </motion.div>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Software engineering student · Full-stack developer</div>
            <h1 aria-label="Gaurav Negi">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                GAURAV
              </motion.span>
              <motion.span
                className="outline"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
              >
                NEGI
              </motion.span>
            </h1>
            <motion.div
              className="hero-bottom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
            >
              <p>
                I build <strong>production-style full-stack software</strong>
                with Angular, Node.js, MySQL, and applied AI—from secure APIs
                to polished user experiences.
              </p>
              <div className="hero-actions">
                <MagneticLink href="#work" className="button button-primary">
                  View selected work <FiArrowDownRight />
                </MagneticLink>
                <MagneticLink
                  href="/resume/Gaurav-Negi-Resume.pdf"
                  className="button button-ghost"
                  download
                >
                  Résumé <FiDownload />
                </MagneticLink>
              </div>
            </motion.div>
          </div>

          <motion.aside
            className="hero-artifact"
            initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="artifact-head">
              <span>Featured build</span>
              <span>01 / 04</span>
            </div>
            <div className="artifact-screen">
              <img src="/projects/resumeflow.png" alt="ResumeFlow interface preview" />
            </div>
            <div className="artifact-info">
              <div>
                <span>ResumeFlow</span>
                <small>Full-stack ATS resume builder</small>
              </div>
              <a
                href="https://github.com/GAURAVNEGI33/ResumeFlow"
                target="_blank"
                rel="noreferrer"
                aria-label="Open ResumeFlow on GitHub"
              >
                <FiArrowUpRight />
              </a>
            </div>
          </motion.aside>
        </div>
        <div className="hero-foot">
          <div className="social-row">
            <a href="https://github.com/GAURAVNEGI33" target="_blank" rel="noreferrer">
              GitHub <FiArrowUpRight />
            </a>
            <a href="https://www.linkedin.com/in/gaurav-negi-b2b162350" target="_blank" rel="noreferrer">
              LinkedIn <FiArrowUpRight />
            </a>
          </div>
          <a href="#content" className="scroll-cue">
            Scroll to explore <span />
          </a>
        </div>
      </section>

      <div id="content">
        <section className="about section" id="about">
          <Reveal className="section-label">
            <span>01</span> About
          </Reveal>
          <div className="about-layout">
            <Reveal className="about-intro">
              <p className="display-copy">
                Product-minded engineering, from the{" "}
                <span>first interface</span> to the final deployment.
              </p>
            </Reveal>
            <Reveal className="about-body" delay={0.12}>
              <p>
                I&apos;m a B.Tech Computer Science Engineering student at
                Amrapali University, graduating in 2028. Based in Ramnagar,
                Uttarakhand, I build full-stack applications end to end—not
                just UI. My work spans authentication, REST APIs, relational
                data, AI integrations, testing, and deployment.
              </p>
              <p>
                I care about the details that make software trustworthy:
                sensible structure, accessible interactions, clean Git history,
                and the discipline to debug what happens after launch.
              </p>
              <div className="location">
                <FiMapPin /> Ramnagar, Uttarakhand, India
              </div>
            </Reveal>
          </div>
          <div className="metrics">
            {[
              ["36", "ResumeFlow REST endpoints"],
              ["Top 14%", "HackerRank Orchestrate"],
              ["23", "router automated tests"],
            ].map(([value, label], index) => (
              <Reveal className="metric" delay={index * 0.08} key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="capabilities section">
          <Reveal className="section-label">
            <span>02</span> Capabilities
          </Reveal>
          <div className="capability-grid">
            {[
              [FiCode, "Full-stack products", "Interfaces, APIs, authentication, data, and deployment working as one system."],
              [FiDatabase, "AI & live data", "Useful AI features backed by real-time persistence and thoughtful fallbacks."],
              [FiCheck, "Quality by design", "Semantic structure, responsive behavior, QA discipline, and accessible interaction."],
            ].map(([Icon, title, copy], index) => {
              const CapabilityIcon = Icon as typeof FiCode;
              return (
                <Reveal className="capability" delay={index * 0.08} key={title as string}>
                  <div className="capability-icon"><CapabilityIcon /></div>
                  <span>0{index + 1}</span>
                  <h3>{title as string}</h3>
                  <p>{copy as string}</p>
                </Reveal>
              );
            })}
          </div>
          <div className="stack-wrap">
            <Reveal>
              <div className="stack-heading">
                <h3>Technical constellation</h3>
                <span>Tools I use to turn ideas into working software</span>
              </div>
            </Reveal>
            <div className="stack-grid">
              {stack.map(({ name, Icon }, index) => (
                <motion.div
                  className="stack-item"
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.045 }}
                  whileHover={{ y: -7 }}
                >
                  <Icon />
                  <span>{name}</span>
                </motion.div>
              ))}
            </div>
            <div className="marquee" aria-label="Additional skills">
              <div className="marquee-track">
                {[...Array(2)].flatMap((_, group) =>
                  ["Java", "DSA", "DBMS", "Angular Material", "Angular CDK", "Sequelize", "Postman", "GitHub Actions"].map((item) => (
                    <span key={`${group}-${item}`}>{item}<i>✦</i></span>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="experience section" id="experience">
          <Reveal className="section-label">
            <span>03</span> Experience
          </Reveal>
          <Reveal className="experience-heading">
            <h2>Learning in public.<br />Shipping in practice.</h2>
            <p>
              Structured internships have given me a practical rhythm:
              understand the brief, build carefully, accept review, and improve.
            </p>
          </Reveal>
          <div className="timeline">
            {[
              {
                date: "June 2026 — Present",
                role: "Full-Stack & QA Intern",
                company: "Shorter Loop",
                copy: "Building ResumeFlow’s Angular 13 interface while completing structured full-stack development and QA assignments.",
                points: ["Reusable components and SCSS reduced duplicate styling by ~30%", "Interactive behavior across 5+ modules", "10+ development and QA assignments"],
              },
              {
                date: "May 2026 — June 2026",
                role: "AI/ML Intern (API Integration & NLP)",
                company: "CodeAlpha",
                copy: "Built applied language tools using a translation API and a Python/NLTK retrieval pipeline.",
                points: ["Real-time translation across 50+ languages", "TF-IDF cosine similarity matching", "Structured coverage across 20+ FAQ categories"],
              },
            ].map((item, index) => (
              <Reveal className="timeline-row" key={item.company} delay={index * 0.08}>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-main">
                  <span>{item.company}</span>
                  <h3>{item.role}</h3>
                  <p>{item.copy}</p>
                </div>
                <ul>
                  {item.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="work section" id="work">
          <Reveal className="section-label">
            <span>04</span> Selected work
          </Reveal>
          <Reveal className="work-heading">
            <h2>Proof over promises.</h2>
            <p>Selected builds that show how I think, learn, and ship.</p>
          </Reveal>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.name} />
            ))}
          </div>
        </section>

        <section className="github section">
          <Reveal className="section-label">
            <span>05</span> GitHub highlights
          </Reveal>
          <Reveal className="github-head">
            <div>
              <span className="live-dot" />
              Currently building &amp; learning
            </div>
            <a href="https://github.com/GAURAVNEGI33" target="_blank" rel="noreferrer">
              View all repositories <FiArrowUpRight />
            </a>
          </Reveal>
          <div className="repo-grid">
            {[
              ["Yassir OSS Contribution", "TypeScript · Bun", "Merged upstream PR adding machine-readable JSON output to the yassir watch command, backed by parser and output tests.", "https://github.com/goww7/yassir-oss/pull/11"],
              ["LeetCode Solutions", "DSA · Problem solving", "A growing collection of accepted solutions used to strengthen data structures, algorithms, and complexity-analysis fundamentals.", "https://github.com/GAURAVNEGI33/Leetcode-Solution"],
              ["ResumeFlow Architecture", "Angular · Node.js · MySQL", "Six engineering specifications covering authentication, editor workflows, exports, public sharing, applications, and template theming.", "https://github.com/GAURAVNEGI33/ResumeFlow/tree/main/docs/features"],
            ].map(([title, tag, copy, link], index) => (
              <Reveal className="repo-card" delay={index * 0.08} key={title}>
                <div className="repo-top"><FiGithub /><span>{tag}</span></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href={link} target="_blank" rel="noreferrer" aria-label={`Open ${title} repository`}><FiArrowUpRight /></a>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="education section" id="education">
          <Reveal className="section-label">
            <span>06</span> Education
          </Reveal>
          <div className="education-grid">
            <Reveal className="education-main">
              <span>2024 — 2028</span>
              <h2>B.Tech, Computer Science Engineering</h2>
              <p>Amrapali University · Haldwani, Uttarakhand</p>
            </Reveal>
            <Reveal className="education-side" delay={0.1}>
              <div><span>Academic performance</span><strong>CGPA 8.1 / 10</strong><p>Computer Science Engineering</p></div>
              <div><span>HackerRank Orchestrate 2026</span><strong>Rank #273 of 1,983</strong><p>Top 14% · AI agent challenge</p></div>
            </Reveal>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-orb parallax-orb" />
          <Reveal className="section-label">
            <span>07</span> Contact
          </Reveal>
          <Reveal className="contact-copy">
            <p>Have an internship opportunity, product idea, or engineering challenge?</p>
            <h2>Let&apos;s build something <span>useful.</span></h2>
          </Reveal>
          <Reveal className="contact-actions">
            <MagneticLink href="mailto:gauravnegigvps@gmail.com" className="contact-email">
              gauravnegigvps@gmail.com <FiArrowUpRight />
            </MagneticLink>
            <button className="copy-button" onClick={copyEmail}>
              {copied ? <FiCheck /> : <FiClipboard />} {copied ? "Copied" : "Copy email"}
            </button>
            <span className="sr-only" aria-live="polite">{copied ? "Email copied to clipboard" : ""}</span>
          </Reveal>
        </section>
      </div>

      <footer>
        <div className="footer-brand">GAURAV NEGI <span>© 2026</span></div>
        <p>Designed with intention. Built with care.</p>
        <div>
          <a href="https://github.com/GAURAVNEGI33" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
          <a href="https://www.linkedin.com/in/gaurav-negi-b2b162350" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
          <a href="mailto:gauravnegigvps@gmail.com"><FiMail /> Email</a>
        </div>
      </footer>
      <motion.a
        href="#top"
        className="back-to-top"
        aria-label="Back to top"
        initial={false}
        animate={showTop ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
        style={{ pointerEvents: showTop ? "auto" : "none" }}
      >
        <FiArrowUp />
      </motion.a>
    </main>
  );
}
