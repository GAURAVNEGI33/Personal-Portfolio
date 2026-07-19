gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ---------- Terminal typing sequence ---------- */
const terminalLines = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "Gaurav Negi — B.Tech CSE, Amrapali University" },
  { type: "cmd", text: "cat status.txt" },
  { type: "out", text: "Full-Stack & QA Intern @ Shorter Loop x Snapied" },
  { type: "out", text: "AI/ML Intern @ CodeAlpha" },
  { type: "cmd", text: 'grep -i "looking for" resume.txt' },
  { type: "out", text: "Frontend / Full-Stack / QA-SDET internships" },
  { type: "cmd", text: "_", cursor: true },
];

const termEl = document.getElementById("terminal-body");

function typeTerminal() {
  let i = 0;
  function next() {
    if (i >= terminalLines.length) return;
    const line = terminalLines[i];
    const div = document.createElement("div");

    if (line.cursor) {
      div.innerHTML = `<span class="prompt">$</span> <span class="cursor-blink">_</span>`;
      termEl.appendChild(div);
      i++;
      return;
    }

    if (line.type === "cmd") {
      div.innerHTML = `<span class="prompt">$</span> `;
      termEl.appendChild(div);
      const span = document.createElement("span");
      span.className = "out";
      div.appendChild(span);
      let ci = 0;
      const typeSpeed = reduceMotion ? 0 : 28;
      const typer = setInterval(() => {
        span.textContent += line.text[ci];
        ci++;
        if (ci >= line.text.length) {
          clearInterval(typer);
          i++;
          setTimeout(next, 260);
        }
      }, typeSpeed);
    } else {
      div.innerHTML = `<span class="comment">${line.text}</span>`;
      div.style.paddingLeft = "18px";
      termEl.appendChild(div);
      i++;
      setTimeout(next, reduceMotion ? 0 : 160);
    }
  }
  next();
}

/* ---------- Cursor glow trail ---------- */
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
  const glow = document.getElementById("cursorGlow");
  const quickX = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3.out" });
  const quickY = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3.out" });
  window.addEventListener("mousemove", (e) => {
    glow.style.opacity = "1";
    quickX(e.clientX);
    quickY(e.clientY);
  });
  window.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });
}

/* ---------- Hero entrance ---------- */
window.addEventListener("DOMContentLoaded", () => {
  gsap.to(".hero-title .line", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.2,
  });
  gsap.to(".hero-sub, .hero-actions", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.7,
    ease: "power3.out",
    onStart: () => {
      gsap.set(".hero-sub, .hero-actions", { opacity: 0, y: 20 });
      gsap.to(".hero-sub, .hero-actions", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
  });
  setTimeout(typeTerminal, 500);
});

/* ---------- Pipeline stages: reveal + "pass" checkmarks ---------- */
function clearStage(stage, i) {
  const status = stage.querySelector(".stage-status");
  if (stage.classList.contains("passed")) return;
  status.textContent = "RUNNING…";
  setTimeout(() => {
    status.textContent = "CHALLENGE CLEARED";
    stage.classList.add("passed");
    if (!reduceMotion) {
      stage.classList.add("cleared-shake");
      setTimeout(() => stage.classList.remove("cleared-shake"), 400);
    }
  }, 400);
}

gsap.utils.toArray(".pipeline-stage").forEach((stage, i) => {
  ScrollTrigger.create({
    trigger: stage,
    start: "top 82%",
    onEnter: () => {
      gsap.to(stage, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      setTimeout(() => clearStage(stage, i), 200 + i * 150);
    },
    once: true,
  });
});

ScrollTrigger.create({
  trigger: ".pipeline-track",
  start: "top 70%",
  onEnter: () => {
    document.getElementById("pipelineFill").style.width = "100%";
  },
  once: true,
});

gsap.set(".soft-skills", { opacity: 0, y: 16 });
gsap.to(".soft-skills", {
  opacity: 1,
  y: 0,
  duration: 0.7,
  ease: "power2.out",
  scrollTrigger: { trigger: ".soft-skills", start: "top 88%" },
});

/* ---------- Project cards: fade + zoom-in on scroll ---------- */
gsap.utils.toArray(".repo-card").forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: { trigger: card, start: "top 88%" },
    delay: (i % 2) * 0.1,
  });
});

/* ---------- Custom cursor label on project cards ---------- */
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
  const label = document.getElementById("cursorLabel");
  const quickLX = gsap.quickTo(label, "x", {
    duration: 0.35,
    ease: "power3.out",
  });
  const quickLY = gsap.quickTo(label, "y", {
    duration: 0.35,
    ease: "power3.out",
  });
  window.addEventListener("mousemove", (e) => {
    quickLX(e.clientX);
    quickLY(e.clientY);
  });

  document.querySelectorAll(".repo-card[data-cursor]").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      label.textContent = card.dataset.cursor;
      label.classList.add("active");
    });
    card.addEventListener("mouseleave", () => {
      label.classList.remove("active");
    });
  });
}

/* ---------- Kinetic hero title: leans with scroll velocity ---------- */
if (!reduceMotion) {
  let skewProxy = { skew: 0 };
  const skewSetter = gsap.quickTo(".hero-title", "skewY", {
    duration: 0.5,
    ease: "power3",
  });
  const clampSkew = gsap.utils.clamp(-6, 6);

  ScrollTrigger.create({
    onUpdate: (self) => {
      const skew = clampSkew(self.getVelocity() / -400);
      if (Math.abs(skew) > Math.abs(skewProxy.skew)) {
        skewProxy.skew = skew;
        skewSetter(skew);
      }
    },
  });
  gsap.ticker.add(() => {
    if (Math.abs(skewProxy.skew) > 0.05) {
      skewProxy.skew *= 0.9;
      skewSetter(skewProxy.skew);
    }
  });
}

/* ---------- Commit log ---------- */
gsap.utils.toArray(".commit").forEach((commit, i) => {
  gsap.to(commit, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: { trigger: commit, start: "top 88%" },
    delay: i * 0.1,
  });
});

/* ---------- Section titles / eyebrows fade in ---------- */
gsap.utils.toArray("section").forEach((sec) => {
  const title = sec.querySelector(".section-title");
  const eyebrow = sec.querySelector(".section-eyebrow");
  if (!title) return;
  gsap.set([eyebrow, title], { opacity: 0, y: 16 });
  gsap.to([eyebrow, title], {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: { trigger: sec, start: "top 75%" },
  });
});

/* ---------- Contact terminal reveal ---------- */
gsap.set(".contact-terminal", { opacity: 0, y: 24 });
gsap.to(".contact-terminal", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: { trigger: ".contact-terminal", start: "top 85%" },
});
