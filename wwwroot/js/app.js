/* =============================================================
   Hub 317 — Frontend Logic
   SPA routing · theme switching · live clock
   ============================================================= */

'use strict';

// ─── SVG Icon Library ─────────────────────────────────────────
const ic = {
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,

  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01" stroke-width="2.4"/></svg>`,

  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,

  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,

  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,

  utensils: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="2" x2="3" y2="22"/><path d="M7 2v7a4 4 0 0 1-4 4"/><path d="M21 2v20"/><path d="M17 2v5"/><line x1="21" y1="9" x2="15" y2="9"/><path d="M15 9v13"/></svg>`,

  music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,

  github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,

  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,

  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,

  diamond: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.57a2.41 2.41 0 0 0 3.41 0l7.59-7.57a2.41 2.41 0 0 0 0-3.41L13.7 2.73a2.41 2.41 0 0 0-3.41 0z"/></svg>`,
};

// ─── Navigation Config ────────────────────────────────────────
const NAV_ITEMS = [
  {
    id:      'ai-chat',
    label:   'AI Chat',
    icon:    ic.chat,
    section: 'Apps',
    desc:    'Local AI assistant',
    note:    'Connect to Ollama, Anthropic, or OpenAI for a local chat interface right in the hub.',
  },
  {
    id:      'moodle',
    label:   'Moodle',
    icon:    ic.book,
    section: 'Apps',
    desc:    'Learning platform',
    note:    'Embed or proxy your Moodle LMS. Courses, assignments, and grades at a glance.',
  },
  {
    id:      'calendar',
    label:   'Calendar',
    icon:    ic.calendar,
    section: 'Apps',
    desc:    'Schedule & events',
    note:    'Sync with CalDAV, Google Calendar, or a local Radicale/Nextcloud instance.',
  },
  {
    id:      'catgirl-dl',
    label:   'Catgirl DL',
    icon:    ic.download,
    section: 'Apps',
    desc:    'Image downloader',
    note:    'A media downloader for your favourite sources. Configurable filters, tags, and batch queue. Meow.',
  },
  {
    id:      'recipes',
    label:   'Recipes',
    icon:    ic.utensils,
    section: 'Personal',
    desc:    'Cookbook & blog',
    note:    'Browse, add, and search your personal recipe collection. Also works as a lightweight blog.',
  },
  {
    id:      'media',
    label:   'Media',
    icon:    ic.music,
    section: 'Personal',
    desc:    'Now playing',
    note:    'Media controls via Spotify Web API, MPD, or local player. Now-playing card and queue.',
  },
  {
    id:      'github',
    label:   'GitHub',
    icon:    ic.github,
    section: 'Dev',
    desc:    'Repos & activity',
    note:    'Your GitHub activity feed, open pull requests, latest commits, and repo stats — all in one panel.',
  },
];

// ─── State ────────────────────────────────────────────────────
let currentPage   = 'dashboard';
let bigClockTimer = null;

// ─── Boot ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  initClock();
  initTheme();

  // Read hash or default to dashboard
  const initial = location.hash.replace('#', '') || 'dashboard';
  navigateTo(initial, /* pushState= */ false);

  window.addEventListener('hashchange', () => {
    const page = location.hash.replace('#', '') || 'dashboard';
    if (page !== currentPage) navigateTo(page, false);
  });
});

// ─── Sidebar ──────────────────────────────────────────────────
function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  // Dashboard item always first
  nav.innerHTML = `
    <a class="nav-item" data-page="dashboard" href="#dashboard">
      ${ic.grid}<span>Dashboard</span>
    </a>
    <div class="nav-divider"></div>
  `;

  // Group by section
  const sections = [...new Set(NAV_ITEMS.map(i => i.section))];
  sections.forEach(section => {
    const items = NAV_ITEMS.filter(i => i.section === section);
    nav.insertAdjacentHTML('beforeend', `
      <div class="nav-section-label">${section}</div>
      ${items.map(item => `
        <a class="nav-item" data-page="${item.id}" href="#${item.id}">
          ${item.icon}<span>${item.label}</span>
        </a>
      `).join('')}
    `);
  });

  // Delegate nav clicks
  nav.addEventListener('click', e => {
    const el = e.target.closest('.nav-item[data-page]');
    if (el) { e.preventDefault(); navigateTo(el.dataset.page); }
  });

  // Logo click
  document.getElementById('logo-link')?.addEventListener('click', e => {
    e.preventDefault(); navigateTo('dashboard');
  });
}

// ─── Navigation ───────────────────────────────────────────────
function navigateTo(pageId, pushState = true) {
  currentPage = pageId;
  if (pushState) history.pushState(null, '', `#${pageId}`);

  // Active state
  document.querySelectorAll('.nav-item[data-page]').forEach(el =>
    el.classList.toggle('active', el.dataset.page === pageId)
  );

  // Page title
  const info = pageInfo(pageId);
  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = info.label;
  document.title = `${info.label} — Hub 317`;

  // Progress bar
  progress(0);
  requestAnimationFrame(() => {
    progress(70);
    setTimeout(() => {
      renderPage(pageId);
      progress(100);
    }, 40);
  });
}

function pageInfo(id) {
  if (id === 'dashboard') return { label: 'Dashboard' };
  const item = NAV_ITEMS.find(i => i.id === id);
  return item || { label: 'Not found' };
}

// ─── Page Rendering ───────────────────────────────────────────
function renderPage(pageId) {
  const content = document.getElementById('content');
  if (!content) return;

  clearBigClock();

  if (pageId === 'dashboard') {
    content.innerHTML = dashboardHTML();
    startBigClock();
    // Wire app-card clicks
    content.querySelectorAll('.app-card[data-page]').forEach(card =>
      card.addEventListener('click', () => navigateTo(card.dataset.page))
    );
  } else {
    const item = NAV_ITEMS.find(i => i.id === pageId);
    content.innerHTML = item ? comingSoonHTML(item) : notFoundHTML();
  }
}

// ─── Dashboard HTML ───────────────────────────────────────────
function dashboardHTML() {
  return `
    <div class="dashboard-wrap">

      <div class="panel welcome-panel">
        <div class="welcome-text">
          <div class="welcome-eyebrow">Welcome back</div>
          <h2 class="welcome-title">Hub 317</h2>
          <p class="welcome-sub">Your personal command center is online.</p>
        </div>
        <div class="welcome-time">
          <div class="clock-display" id="clock-large">--:--:--</div>
          <div class="date-display"  id="date-large"></div>
        </div>
      </div>

      <div class="app-grid">
        ${NAV_ITEMS.map(item => `
          <button class="app-card" data-page="${item.id}">
            <div class="app-card-icon">${item.icon}</div>
            <div class="app-card-info">
              <span class="app-card-name">${item.label}</span>
              <span class="app-card-desc">${item.desc}</span>
            </div>
          </button>
        `).join('')}
      </div>

    </div>
  `;
}

// ─── Coming Soon HTML ─────────────────────────────────────────
function comingSoonHTML(item) {
  return `
    <div class="coming-soon-wrap">
      <div class="coming-soon-icon">${item.icon}</div>
      <h2 class="coming-soon-title">${item.label}</h2>
      <p class="coming-soon-sub">${item.note}</p>
      <div class="coming-soon-badge">In development</div>
    </div>
  `;
}

function notFoundHTML() {
  return `
    <div class="coming-soon-wrap">
      <div class="coming-soon-icon">${ic.diamond}</div>
      <h2 class="coming-soon-title">Nothing here</h2>
      <p class="coming-soon-sub">This page doesn't exist yet.</p>
    </div>
  `;
}

// ─── Clock ────────────────────────────────────────────────────
function initClock() {
  const el = document.getElementById('clock');
  const tick = () => {
    const now = new Date();
    if (el) el.textContent = now.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  tick();
  setInterval(tick, 1000);
}

function startBigClock() {
  const tick = () => {
    const now = new Date();
    const big  = document.getElementById('clock-large');
    const date = document.getElementById('date-large');
    if (!big) { clearBigClock(); return; }
    big.textContent  = now.toLocaleTimeString('en', { hour12: false });
    date.textContent = now.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' });
  };
  tick();
  bigClockTimer = setInterval(tick, 1000);
}

function clearBigClock() {
  if (bigClockTimer) { clearInterval(bigClockTimer); bigClockTimer = null; }
}

// ─── Theme ────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('hub317.theme') || 'dark';
  applyTheme(saved, false);
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}

function applyTheme(theme, save = true) {
  document.documentElement.dataset.theme = theme;
  if (save) localStorage.setItem('hub317.theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML   = theme === 'dark' ? ic.sun : ic.moon;
    btn.title       = theme === 'dark' ? 'Switch to light' : 'Switch to dark';
    btn.ariaLabel   = btn.title;
  }
}

// ─── Progress Bar ─────────────────────────────────────────────
let progressTimer = null;

function progress(pct) {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  clearTimeout(progressTimer);

  if (pct === 0) {
    bar.style.width = '0%';
    bar.classList.remove('done', 'running');
    return;
  }

  bar.classList.add('running');
  bar.classList.remove('done');
  bar.style.width = `${pct}%`;

  if (pct >= 100) {
    progressTimer = setTimeout(() => {
      bar.classList.add('done');
      progressTimer = setTimeout(() => bar.classList.remove('running', 'done'), 500);
    }, 120);
  }
}
