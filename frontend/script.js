// =============================================================
// CONFIG — fill in your real profile links here.
// The prompt this site was generated from did not include your
// actual LinkedIn / GitHub URLs, so these are placeholders.
// Replace them, then the hero, and footer links will update.
// =============================================================
const PROFILE_LINKS = {
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle'
  github: '',   // e.g. 'https://github.com/your-username'
};

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initProfileLinks();
  initNav();
  initScrollSpy();
  initScrollTop();
  initRevealAnimations();
  initHeroTyping();
  initContactForm();
  loadProjects();
});

// -------------------------------------------------------------
// Footer year
// -------------------------------------------------------------
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// -------------------------------------------------------------
// Wire up profile links (LinkedIn / GitHub) or hide if unset
// -------------------------------------------------------------
function initProfileLinks() {
  const pairs = [
    ['linkedinLink', PROFILE_LINKS.linkedin],
    ['githubLink', PROFILE_LINKS.github],
    ['footerLinkedin', PROFILE_LINKS.linkedin],
    ['footerGithub', PROFILE_LINKS.github],
  ];

  pairs.forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (url) {
      el.href = url;
    } else {
      el.setAttribute('href', '#');
      el.setAttribute('title', 'Add your profile URL in script.js (PROFILE_LINKS)');
      el.style.opacity = '0.5';
    }
  });
}

// -------------------------------------------------------------
// Sticky nav: mobile menu + smooth scroll + close on select
// -------------------------------------------------------------
function initNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// -------------------------------------------------------------
// Active nav-link highlighting based on scroll position
// -------------------------------------------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');

  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

// -------------------------------------------------------------
// Scroll-to-top button
// -------------------------------------------------------------
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 480);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// -------------------------------------------------------------
// Section reveal-on-scroll animations
// -------------------------------------------------------------
function initRevealAnimations() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

// -------------------------------------------------------------
// Hero "editor" typing animation
// -------------------------------------------------------------
function initHeroTyping() {
  const codeEl = document.getElementById('typedCode');
  const cursorEl = document.getElementById('typedCursor');
  if (!codeEl) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { text: '// developer profile', className: 'cmt' },
    { text: 'const developer = {', className: '' },
    { text: "  name: 'Shiva Sai Rayakanti',", className: '' },
    { text: "  role: 'B.Tech CSE (IoT) Student',", className: '' },
    { text: "  languages: ['Python', 'Java'],", className: '' },
    { text: "  web: ['HTML', 'CSS', 'JavaScript'],", className: '' },
    { text: "  learning: true,", className: '' },
    { text: "  openToWork: true,", className: '' },
    { text: '};', className: '' },
  ];

  const colorize = (line) => {
    return line
      .replace(/^(\s*\/\/.*)$/, '<span class="cmt">$1</span>')
      .replace(/(const|true|false)/g, '<span class="kw">$1</span>')
      .replace(/'([^']*)'/g, "<span class=\"str\">'$1'</span>");
  };

  if (prefersReducedMotion) {
    codeEl.innerHTML = lines.map((l) => colorize(l.text)).join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let rendered = '';

  function typeNextChar() {
    if (lineIndex >= lines.length) {
      if (cursorEl) cursorEl.style.animationDuration = '1s';
      return;
    }

    const currentLine = lines[lineIndex].text;

    if (charIndex <= currentLine.length) {
      const partial = rendered + colorize(currentLine.slice(0, charIndex));
      codeEl.innerHTML = partial;
      charIndex += 1;
      setTimeout(typeNextChar, 14 + Math.random() * 20);
    } else {
      rendered += colorize(currentLine) + '\n';
      lineIndex += 1;
      charIndex = 0;
      setTimeout(typeNextChar, 90);
    }
  }

  setTimeout(typeNextChar, 500);
}

// -------------------------------------------------------------
// Projects — fetch from backend, render cards, handle states
// -------------------------------------------------------------
async function loadProjects() {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="skeleton"></div>
    <div class="skeleton"></div>
  `;

  try {
    const res = await fetch('/api/projects');

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const payload = await res.json();
    const projects = payload.data || [];

    if (!projects.length) {
      container.innerHTML = `<p class="state-message">No projects yet — check back soon.</p>`;
      return;
    }

    container.innerHTML = projects.map(renderProjectCard).join('');
  } catch (err) {
    console.error('Failed to load projects:', err);
    container.innerHTML = `<p class="state-message error">Couldn't load projects right now. Make sure the backend server and MongoDB are running.</p>`;
  }
}

function renderProjectCard(project) {
  const tech = (project.technologies || [])
    .map((t) => `<span class="tech-pill">${escapeHtml(t)}</span>`)
    .join('');

  const features = (project.features || [])
    .map((f) => `<li>${escapeHtml(f)}</li>`)
    .join('');

  const links = [];
  if (project.github) {
    links.push(`<a href="${escapeAttr(project.github)}" target="_blank" rel="noopener noreferrer">GitHub →</a>`);
  }
  if (project.liveDemo) {
    links.push(`<a href="${escapeAttr(project.liveDemo)}" target="_blank" rel="noopener noreferrer">Live Demo →</a>`);
  }

  return `
    <div class="project-card">
      <h3 class="project-title">${escapeHtml(project.title)}</h3>
      <p class="project-desc">${escapeHtml(project.description)}</p>
      ${tech ? `<div class="project-tech">${tech}</div>` : ''}
      ${features ? `<ul class="project-features">${features}</ul>` : ''}
      ${links.length ? `<div class="project-links">${links.join('')}</div>` : ''}
    </div>
  `;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}

// -------------------------------------------------------------
// Contact form — client-side validation + POST /api/messages
// -------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('formSubmit');
  const statusEl = document.getElementById('formStatus');

  const fields = {
    name: { input: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
    message: { input: document.getElementById('message'), error: document.getElementById('messageError') },
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(field, message) {
    fields[field].error.textContent = message || '';
    fields[field].input.closest('.form-group').classList.toggle('invalid', Boolean(message));
  }

  function validate() {
    let valid = true;

    if (!fields.name.input.value.trim()) {
      setFieldError('name', 'Please enter your name.');
      valid = false;
    } else {
      setFieldError('name', '');
    }

    const emailVal = fields.email.input.value.trim();
    if (!emailVal) {
      setFieldError('email', 'Please enter your email.');
      valid = false;
    } else if (!emailRegex.test(emailVal)) {
      setFieldError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      setFieldError('email', '');
    }

    if (!fields.message.input.value.trim()) {
      setFieldError('message', 'Please enter a message.');
      valid = false;
    } else {
      setFieldError('message', '');
    }

    return valid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    if (!validate()) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.input.value.trim(),
          email: fields.email.input.value.trim(),
          message: fields.message.input.value.trim(),
        }),
      });

      const payload = await res.json();

      if (!res.ok || !payload.success) {
        throw new Error(payload.message || 'Something went wrong.');
      }

      statusEl.textContent = "Message sent — thanks for reaching out! I'll get back to you soon.";
      statusEl.className = 'form-status success';
      form.reset();
    } catch (err) {
      console.error('Contact form error:', err);
      statusEl.textContent = err.message || 'Could not send your message. Please try again later.';
      statusEl.className = 'form-status error';
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}
