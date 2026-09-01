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
      <a href="#">Destinations <span class="ep-arrow">▾</span></a>
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
      <a href="#">Tour Type <span class="ep-arrow">▾</span></a>
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
        <input class="ep-search-input" type="text" placeholder="Search..." autocomplete="off">
        <ul class="ep-search-suggestions"></ul>
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

  // ── Dropdown click toggle ────────────────────────────────────
  document.querySelectorAll('#ep-navbar .ep-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var parent = this.closest('.ep-dropdown');
      var isOpen = parent.classList.contains('open');
      // close all
      document.querySelectorAll('#ep-navbar .ep-dropdown').forEach(function (d) {
        d.classList.remove('open');
      });
      if (!isOpen) parent.classList.add('open');
    });
  });

  // close dropdown when clicking outside
  document.addEventListener('click', function () {
    document.querySelectorAll('#ep-navbar .ep-dropdown').forEach(function (d) {
      d.classList.remove('open');
    });
  });

  // ── Search toggle ─────────────────────────────────────────────
  const searchWrapper = document.querySelector('.ep-search-wrapper');
  const searchBtn = document.querySelector('.ep-search-btn');
  const searchInput = document.querySelector('.ep-search-input');
  const searchSuggestions = document.querySelector('.ep-search-suggestions');

  const destinations = [
    { name: 'Hunza Valley', page: 'hunza.html' },
    { name: 'Skardu Valley', page: 'skardu.html' },
    { name: 'Naran Kaghan', page: 'naran.html' },
    { name: 'Swat Valley', page: 'swat.html' },
    { name: 'Fairy Meadows', page: 'fairy.html' },
    { name: 'Murree', page: 'murree.html' },
    { name: 'Azad Kashmir', page: 'azad.html' },
    { name: 'Chitral Valley', page: 'chitral.html' }
  ];

  function closeSuggestions() {
    if (searchSuggestions) {
      searchSuggestions.innerHTML = '';
      searchSuggestions.classList.remove('active');
    }
  }

  function renderSuggestions(query) {
    if (!searchSuggestions) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      closeSuggestions();
      return;
    }
    const matches = destinations
      .filter(function (d) { return d.name.toLowerCase().includes(q); })
      .slice(0, 5);

    if (matches.length === 0) {
      searchSuggestions.innerHTML = '<li class="ep-no-result">No destination found</li>';
      searchSuggestions.classList.add('active');
      return;
    }

    searchSuggestions.innerHTML = matches.map(function (d) {
      return '<li data-page="' + d.page + '">' + d.name + '</li>';
    }).join('');
    searchSuggestions.classList.add('active');
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      renderSuggestions(this.value);
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const q = this.value.trim().toLowerCase();
        const match = destinations.find(function (d) { return d.name.toLowerCase().includes(q); });
        if (match) window.location.href = match.page;
      }
    });
  }

  if (searchSuggestions) {
    searchSuggestions.addEventListener('click', function (e) {
      const li = e.target.closest('li[data-page]');
      if (li) window.location.href = li.getAttribute('data-page');
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      searchWrapper.classList.toggle('active');
      if (searchWrapper.classList.contains('active')) {
        searchWrapper.querySelector('.ep-search-input').focus();
      } else {
        closeSuggestions();
      }
    });
    document.addEventListener('click', function () {
      searchWrapper.classList.remove('active');
      closeSuggestions();
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
