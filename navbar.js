(function () {
  // ── Inject HTML ──────────────────────────────────────────────
  const navHTML = `
<nav id="ep-navbar">
  <a class="ep-logo" href="index.html">
    <img src="imges/main logo.png" alt="Explore Pakistan Logo">
  </a>

  <!-- Desktop links -->
  <ul class="ep-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="#">Deals</a></li>

    <li class="ep-dropdown">
      <a href="#">Destinations</a>
      <ul class="ep-dropdown-menu">
        <li><a href="azad.html">Azad Kashmir Tours</a></li>
        <li><a href="chitral.html">Chitral Valley Tours</a></li>
        <li><a href="fairy.html">Fairy Meadows Tours</a></li>
        <li><a href="hunza.html">Hunza Valley Tours</a></li>
        <li><a href="murree.html">Murree Tours</a></li>
        <li><a href="naran.html">Naran Kaghan Tours</a></li>
        <li><a href="skardu.html">Skardu Valley Tours</a></li>
        <li><a href="swat.html">Swat Valley Tours</a></li>
      </ul>
    </li>

    <li class="ep-dropdown">
      <a href="#">Tour Type</a>
      <ul class="ep-dropdown-menu">
        <li><a href="#">Family Tours</a></li>
        <li><a href="#">Honeymoon Tours</a></li>
        <li><a href="#">Adventure Tours</a></li>
        <li><a href="#">Group Tours</a></li>
        <li><a href="#">Luxury Tours</a></li>
      </ul>
    </li>

    <li>
      <div class="ep-search-wrapper">
        <button class="ep-search-btn" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
               stroke="#49954b" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <input class="ep-search-input" type="text" placeholder="Search...">
      </div>
    </li>
  </ul>

  <!-- Hamburger -->
  <button class="ep-hamburger" aria-label="Open menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- Mobile overlay -->
<div id="ep-drawer-overlay"></div>

<!-- Mobile drawer -->
<div id="ep-drawer">
  <button class="ep-drawer-close" aria-label="Close menu">&#x2715;</button>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="#">Deals</a></li>

    <li>
      <span class="ep-drawer-toggle">Destinations</span>
      <ul class="ep-drawer-sub">
        <li><a href="azad.html">Azad Kashmir Tours</a></li>
        <li><a href="chitral.html">Chitral Valley Tours</a></li>
        <li><a href="fairy.html">Fairy Meadows Tours</a></li>
        <li><a href="hunza.html">Hunza Valley Tours</a></li>
        <li><a href="murree.html">Murree Tours</a></li>
        <li><a href="naran.html">Naran Kaghan Tours</a></li>
        <li><a href="skardu.html">Skardu Valley Tours</a></li>
        <li><a href="swat.html">Swat Valley Tours</a></li>
      </ul>
    </li>

    <li>
      <span class="ep-drawer-toggle">Tour Type</span>
      <ul class="ep-drawer-sub">
        <li><a href="#">Family Tours</a></li>
        <li><a href="#">Honeymoon Tours</a></li>
        <li><a href="#">Adventure Tours</a></li>
        <li><a href="#">Group Tours</a></li>
        <li><a href="#">Luxury Tours</a></li>
      </ul>
    </li>
  </ul>
</div>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // ── Scroll hide / show ────────────────────────────────────────
  const navbar = document.getElementById('ep-navbar');
  let lastY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentY = window.scrollY;
    if (currentY > lastY) {
      // scrolling down → hide
      navbar.classList.add('nav-hidden');
    } else {
      // scrolling up (even 1px) → show
      navbar.classList.remove('nav-hidden');
    }
    lastY = currentY;
  }, { passive: true });

  // ── Search toggle ─────────────────────────────────────────────
  const searchWrapper = document.querySelector('.ep-search-wrapper');
  const searchBtn = document.querySelector('.ep-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      searchWrapper.classList.toggle('active');
      if (searchWrapper.classList.contains('active')) {
        searchWrapper.querySelector('.ep-search-input').focus();
      }
    });
    document.addEventListener('click', function () {
      searchWrapper.classList.remove('active');
    });
    searchWrapper.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // ── Mobile drawer ─────────────────────────────────────────────
  const hamburger = document.querySelector('.ep-hamburger');
  const drawer = document.getElementById('ep-drawer');
  const overlay = document.getElementById('ep-drawer-overlay');
  const closeBtn = document.querySelector('.ep-drawer-close');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Sub-menu toggles inside drawer
  document.querySelectorAll('.ep-drawer-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const sub = this.nextElementSibling;
      if (sub) sub.classList.toggle('open');
    });
  });
})();
