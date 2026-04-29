/* ═══════════════════════════════════════════════════════════════════════════
   RACK CFMOTO — Landing Page Scripts
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Language Toggle ──────────────────────────────────────────────────────
   Reads/writes lang preference to localStorage.
   body.lang-cs / body.lang-en drives all CSS visibility.
   ─────────────────────────────────────────────────────────────────────────── */

function setLang(lang, persist) {
  document.body.className = `lang-${lang}`;

  // Update active button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update email input placeholders
  document.querySelectorAll('.email-input').forEach(input => {
    input.placeholder = input.dataset[`placeholder${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || '';
  });

  // Update html lang attribute for accessibility
  document.documentElement.lang = lang === 'cs' ? 'cs' : 'en';

  // Persist only when user explicitly switches — keyed per domain
  if (persist) {
    try {
      const key = 'rack-lang-' + window.location.hostname.replace('www.', '');
      localStorage.setItem(key, lang);
    } catch (e) {}
  }
}

// Detect default language from domain:
// sh-moto.cz → Czech, sh-moto.com → English
// User's manual switch (saved per domain) overrides domain default.
(function initLang() {
  const hostname = window.location.hostname.replace('www.', '');
  let lang = hostname.endsWith('sh-moto.com') ? 'en' : 'cs';

  try {
    const saved = localStorage.getItem('rack-lang-' + hostname);
    if (saved) lang = saved;
  } catch (e) {}

  setLang(lang, false);
})();


/* ─── Email Signup Handler ─────────────────────────────────────────────────
   Currently shows a success message in-page.

   TO INTEGRATE WITH MAILCHIMP:
   1. In Mailchimp: Audience → Signup forms → Embedded forms
   2. Copy the form "action" URL (looks like:
      https://xyz.us1.list-manage.com/subscribe/post?u=...&id=...)
   3. Replace the TODO comment below with:
      const MAILCHIMP_URL = 'https://your-url-here';
      const res = await fetch(MAILCHIMP_URL + '&EMAIL=' + encodeURIComponent(email), {method:'POST', mode:'no-cors'});
   4. The no-cors mode means you won't get a response — just show success anyway.

   TO INTEGRATE WITH BREVO (Sendinblue):
   1. In Brevo: Contacts → Forms → Create a form
   2. Use their API: POST https://api.brevo.com/v3/contacts
      with your API key in the header.
   ─────────────────────────────────────────────────────────────────────────── */

async function handleSignup(event, formId) {
  event.preventDefault();

  const form = event.target;
  const emailInput = form.querySelector('.email-input');
  const email = emailInput.value.trim();
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'cs';

  if (!email) return;

  // Disable form during processing
  const btn = form.querySelector('.btn-primary');
  const originalBtnHTML = btn.innerHTML;
  btn.disabled = true;
  btn.style.opacity = '0.6';

  const MAKE_WEBHOOK = 'https://hook.eu1.make.com/46qf1ld8yqmymka4utqes6w1uv3gbxn3';

  try {
    await fetch(MAKE_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: formId })
    });
  } catch (e) {
    // Fail silently — still show success to user
  }

  // Show success message
  const messages = {
    cs: 'Díky! Dáme ti vědět.',
    en: "Thanks! We'll let you know."
  };

  form.innerHTML = `<p class="success-msg">${messages[lang]}</p>`;

  // Optional: track conversion event if analytics is set up
  if (typeof gtag === 'function') {
    gtag('event', 'email_signup', {
      event_category: 'engagement',
      event_label: formId
    });
  }
}


/* ─── Header Scroll Effect ─────────────────────────────────────────────────
   Adds .scrolled class to header when user scrolls down — enables
   the opaque background + dark text state.
   ─────────────────────────────────────────────────────────────────────────── */

(function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // run once on load
})();


/* ─── Scroll-In Animations ─────────────────────────────────────────────────
   Adds .fade-up class to key sections, then uses IntersectionObserver
   to add .visible when they enter the viewport.
   ─────────────────────────────────────────────────────────────────────────── */

(function initScrollAnimations() {
  const selectors = [
    '.problem-text',
    '.photo-item',
    '.feature-item',
    '.builder-photo',
    '.builder-text',
    '.log-entry',
    '.signup-section h2',
    '.signup-section p',
    '.signup-form--large'
  ];

  const elements = document.querySelectorAll(selectors.join(', '));
  elements.forEach(el => el.classList.add('fade-up'));

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();
