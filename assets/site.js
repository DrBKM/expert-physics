/* Expert Physics: everything shared by all pages.
   Change contact details, form links or the Apps Script address HERE and every page updates. */
window.EP_SITE = {
  name: 'Expert Physics',
  owner: 'Bipul Kumar Mahato',
  address: 'Pratyusha, #03-A, Purulia 723101',
  email: 'bipuliitr@gmail.com',
  phone: '+91 73650 23766',
  whatsapp: '917365023766',
  // Apps Script web app (the merged project). Ends with /exec.
  api: 'https://script.google.com/macros/s/AKfycbyoEbMxR_7akB8P2CdplXvbhHD6GEI7ACYlvhOgBI7doX-x_VAC_9lfnxc33I5ikLxF/exec',
  forms: {
    inquiry: 'https://docs.google.com/forms/d/e/1FAIpQLSfFJe0rMoyfhun2Tm6CjY4SoZ-lJblRSung5G5NBYs6rj3Zuw/viewform',
    book: 'https://docs.google.com/forms/d/e/1FAIpQLSdAWu19f7m0fSwf123W0nAP_N51cbMAhKEsQTSkS4yQC88skg/viewform'
  },
  feeDoc: 'https://drive.google.com/open?id=1o76ePKwYQ-QuatUH5hZw-VNNX0Ry2IlRCbTi-cUmBtk',
  orcid: 'https://orcid.org/0000-0002-9469-1716'
};

(function () {
  const S = window.EP_SITE;
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const NAV = [
    ['Home', 'index.html'],
    ['Courses', null, [
      ['Programmes', 'courses.html'], ['Syllabus & timetable', 'syllabus.html'],
      ['Enrolment & fees', 'enroll.html'], ['FAQ', 'faq.html']]],
    ['Study material', 'portal.html#study'],
    ['Mock tests', 'portal.html#tests'],
    ['Books', 'publications.html'],
    ['Career', 'career.html'],
 //   ['About', 'about.html'],
    ['Contact', 'contact.html']
  ];
  const isHere = href => href.split('#')[0] === page && (!href.includes('#') || location.hash === '#' + href.split('#')[1]);
  const link = ([t, h]) => `<a href="${h}"${isHere(h) ? ' aria-current="page"' : ''}>${t}</a>`;
  const items = NAV.map(n => n[2]
    ? `<li class="ep-has-sub"><button type="button" aria-expanded="false">${n[0]}</button><ul class="ep-sub">${n[2].map(s => '<li>' + link(s) + '</li>').join('')}</ul></li>`
    : `<li>${link(n)}</li>`).join('');
  const onPortal = page === 'portal.html';

  const header = `<a class="ep-skip" href="#main">Skip to content</a>
<header class="ep-head" id="epHead"><div class="ep-w">
  <a class="ep-logo" href="index.html" aria-label="${S.name} home"><img src="assets/img/logo.webp" width="184" height="42" alt="${S.name}"></a>
  <button class="ep-burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="epNav"><span></span><span></span><span></span></button>
  <nav class="ep-nav" id="epNav" aria-label="Main"><ul>${items}</ul></nav>
  ${onPortal ? '' : '<a class="ep-cta" href="portal.html">Student sign in</a>'}
</div></header>`;
  document.currentScript.insertAdjacentHTML('afterend', header);

  const head = document.getElementById('epHead');
  head.querySelector('.ep-burger').addEventListener('click', e => {
    const open = head.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', open);
  });
  head.querySelectorAll('.ep-has-sub>button').forEach(b => b.addEventListener('click', () => {
    const li = b.parentElement, open = li.classList.toggle('open');
    b.setAttribute('aria-expanded', open);
  }));
  document.addEventListener('click', e => {
    if (!e.target.closest('.ep-has-sub')) head.querySelectorAll('.ep-has-sub.open').forEach(li => {
      li.classList.remove('open'); li.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  });
  window.addEventListener('hashchange', () => head.querySelectorAll('.ep-nav a').forEach(a =>
    a.toggleAttribute('aria-current', isHere(a.getAttribute('href')))));

  const year = new Date().getFullYear();
  const footer = `<footer class="ep-foot"><div class="ep-w">
  <div class="ep-fgrid">
    <div>
      <div class="ep-fbrand"><img src="assets/img/mark-96.png" alt="" width="44" height="44"><b>${S.name}</b></div>
      <p>Physics coaching, notes, books and timed mock tests for HS, NEET, JEE, B.Sc., M.Sc., NET, GATE and job exams.</p>
    </div>
    <div><h2>Learn</h2><ul>
      <li><a href="portal.html#study">Study material</a></li><li><a href="portal.html#tests">Mock tests</a></li>
      <li><a href="publications.html">Books &amp; publications</a></li><li><a href="career.html">Career guidance</a></li></ul></div>
    <div><h2>Coaching</h2><ul>
      <li><a href="courses.html">Programmes</a></li><li><a href="syllabus.html">Syllabus &amp; timetable</a></li>
      <li><a href="enroll.html">Enrolment &amp; fees</a></li><li><a href="faq.html">FAQ</a></li></ul></div>
    <div><h2>Contact</h2>
      <p>${S.address}</p>
      <p><a href="mailto:${S.email}">${S.email}</a><br><a href="tel:${S.phone.replace(/\s/g, '')}">${S.phone}</a></p>
      <p><a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
    </div>
  </div>
  <div class="ep-ribbon">
    © ${year} ${S.name} | ${S.owner} | ${S.address}<br>
    Email: <a href="mailto:${S.email}">${S.email}</a> | Phone: <a href="tel:${S.phone.replace(/\s/g, '')}">${S.phone}</a><br>
    <a href="terms.html">Terms &amp; Conditions</a> | <a href="privacy.html">Privacy Policy</a> |
    <a href="refund.html">Refund &amp; Cancellation</a> | <a href="shipping.html">Shipping &amp; Delivery</a> |
    <a href="contact.html">Contact</a>
  </div>
</div></footer>
${onPortal ? '' : `<a class="ep-wa" href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg></a>`}`;

  function fill() {
    const slot = document.getElementById('site-footer');
    if (slot) slot.outerHTML = footer; else document.body.insertAdjacentHTML('beforeend', footer);
    // contact details anywhere on a page: <span data-ep="phone"></span>, <a data-ep-href="whatsapp">
    document.querySelectorAll('[data-ep]').forEach(el => { el.textContent = S[el.dataset.ep] || ''; });
    document.querySelectorAll('[data-ep-href]').forEach(el => {
      const k = el.dataset.epHref;
      el.href = k === 'whatsapp' ? 'https://wa.me/' + S.whatsapp : k === 'email' ? 'mailto:' + S.email
        : k === 'phone' ? 'tel:' + S.phone.replace(/\s/g, '') : k.indexOf('form:') === 0 ? S.forms[k.slice(5)]
        : S[k] || el.href;
      if (/^https?:/.test(el.href)) { el.target = '_blank'; el.rel = 'noopener'; }
    });
    // embedded Google Forms: <iframe data-ep-form="inquiry">
    document.querySelectorAll('iframe[data-ep-form]').forEach(f => { f.src = S.forms[f.dataset.epForm] + '?embedded=true'; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();

  // Student reviews from the portal (only on pages with <div id="liveReviews">)
  window.EP_loadReviews = async function (box, max) {
    if (!box) return;
    try {
      const r = await fetch(S.api, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body: JSON.stringify({api: 'reviews', p: {}, token: null})});
      const j = await r.json();
      const items = (j.ok && j.items || []).filter(v => v.text && v.rating >= 4).slice(0, max || 6);
      if (!items.length) { box.closest('[data-hide-empty]')?.setAttribute('hidden', ''); return; }
      const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
      box.innerHTML = items.map(v => `<figure class="quote"><blockquote>${esc(v.text)}</blockquote>
        <figcaption><span class="stars" aria-label="${v.rating} out of 5">${'★'.repeat(v.rating)}${'☆'.repeat(5 - v.rating)}</span>
        ${esc(v.name)}, ${esc(v.date)}</figcaption></figure>`).join('');
      const sum = document.getElementById('reviewSum');
      if (sum && j.count) sum.textContent = `Average ${j.avg} out of 5 from ${j.count} student review${j.count === 1 ? '' : 's'}.`;
    } catch (e) { box.closest('[data-hide-empty]')?.setAttribute('hidden', ''); }
  };
})();
