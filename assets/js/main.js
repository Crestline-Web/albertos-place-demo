/* ============================================================
   TERRA STAYS — behaviour
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Photo manifest
     Extensions differ per file, so they're mapped explicitly.
     `order` controls how photos appear in the gallery + lightbox;
     the first five match the mosaic tiles on the listing page.
     ---------------------------------------------------------- */

  var PNG = [2, 3, 4, 7, 8, 17, 24, 30, 31, 48];
  var DIR = "images/unit-1-baguio/";

  var order = [
    11, 39, 21, 27, 9,          // mosaic tiles, in the same order
    19, 26, 5, 1, 13, 30, 43,   // the rest of the strong shots
    6, 10, 12, 14, 15, 16, 18, 20, 22, 23, 25, 28, 29,
    32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 44, 45, 46, 47,
    3, 4, 7, 8, 17, 24, 31, 48  // host's own info graphics last
  ];

  function src(n) {
    var pad = n < 10 ? "0" + n : String(n);
    var ext = PNG.indexOf(n) !== -1 ? "png" : "jpeg";
    return DIR + "unit1-" + pad + "." + ext;
  }

  var photos = order.map(src);

  /* ----------------------------------------------------------
     Hero — the window opens onto the scene
     ---------------------------------------------------------- */

  var hero = document.getElementById("hero");
  var revealLayer = document.getElementById("revealLayer");

  if (hero && revealLayer) {
    var cards = hero.querySelectorAll("[data-reveal]");

    Array.prototype.forEach.call(cards, function (card) {
      function open() {
        revealLayer.style.backgroundImage = "url('" + card.dataset.reveal + "')";
        hero.classList.add("is-peeking");
      }
      function close() {
        hero.classList.remove("is-peeking");
      }

      card.addEventListener("mouseenter", open);
      card.addEventListener("mouseleave", close);
      card.addEventListener("focus", open);
      card.addEventListener("blur", close);
    });
  }

  /* ----------------------------------------------------------
     Step through the window — hold the zoom, then navigate
     ---------------------------------------------------------- */

  var enterLinks = document.querySelectorAll("[data-enter]");

  Array.prototype.forEach.call(enterLinks, function (link) {
    link.addEventListener("click", function (e) {
      // let modified clicks (new tab, etc.) behave normally
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      var href = link.getAttribute("href");

      if (hero && revealLayer && link.dataset.reveal) {
        revealLayer.style.backgroundImage = "url('" + link.dataset.reveal + "')";
      }
      if (hero) hero.classList.add("is-peeking");
      document.body.classList.add("is-entering");

      window.setTimeout(function () { window.location.href = href; }, 520);
    });
  });

  /* ----------------------------------------------------------
     Nav menu (small screens)
     ---------------------------------------------------------- */

  var navToggle = document.getElementById("navToggle");
  var navMenu   = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    var setMenu = function (open) {
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      navMenu.dataset.open = String(open);
    };

    navToggle.addEventListener("click", function () {
      setMenu(navToggle.getAttribute("aria-expanded") !== "true");
    });

    // click outside closes
    document.addEventListener("click", function (e) {
      if (navToggle.getAttribute("aria-expanded") !== "true") return;
      if (navMenu.contains(e.target) || navToggle.contains(e.target)) return;
      setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        navToggle.focus();
      }
    });
  }

  /* ----------------------------------------------------------
     Gallery
     Each tile is a real button so it can be reached by keyboard
     and announced as actionable.
     ---------------------------------------------------------- */

  var gallery = document.getElementById("gallery");

  if (gallery) {
    var frag = document.createDocumentFragment();

    photos.forEach(function (url, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery__item";
      btn.dataset.index = i;
      btn.setAttribute("aria-label", "Open photo " + (i + 1) + " of " + photos.length);

      var img = document.createElement("img");
      img.src = url;
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = "";

      btn.appendChild(img);
      frag.appendChild(btn);
    });

    gallery.appendChild(frag);
  }

  /* ----------------------------------------------------------
     Lightbox
     ---------------------------------------------------------- */

  var lb = document.getElementById("lightbox");

  if (lb) {
    var lbImg    = document.getElementById("lightboxImg");
    var lbCount  = document.getElementById("lbCount");
    var lbClose  = document.getElementById("lbClose");
    var lbPrev   = document.getElementById("lbPrev");
    var lbNext   = document.getElementById("lbNext");
    var list     = photos;
    var index    = 0;
    var lastFocus = null;

    function show(i) {
      index = (i + list.length) % list.length;
      lbImg.src = list[index];
      lbImg.alt = "Photo " + (index + 1) + " of " + list.length;
      lbCount.textContent = (index + 1) + " / " + list.length;

      var multi = list.length > 1;
      lbCount.hidden = !multi;
      lbPrev.hidden  = !multi;
      lbNext.hidden  = !multi;
    }

    function open(i, customList, trigger) {
      list = customList || photos;
      lastFocus = trigger || document.activeElement;
      lb.setAttribute("open", "");
      document.body.style.overflow = "hidden";
      show(i);
      lbClose.focus();
    }

    function close() {
      lb.removeAttribute("open");
      document.body.style.overflow = "";
      list = photos;
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
      lastFocus = null;
    }

    // Anything carrying data-index opens the full set at that position
    document.addEventListener("click", function (e) {
      var tile = e.target.closest("[data-index]");
      if (tile) { open(parseInt(tile.dataset.index, 10), null, tile); return; }

      var single = e.target.closest("[data-lightbox-src]");
      if (single) { open(0, [single.dataset.lightboxSrc], single); }
    });

    lbClose.addEventListener("click", close);
    lbPrev.addEventListener("click", function () { show(index - 1); });
    lbNext.addEventListener("click", function () { show(index + 1); });

    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lb.hasAttribute("open")) return;

      if (e.key === "Escape")     { close();          return; }
      if (e.key === "ArrowLeft")  { show(index - 1);  return; }
      if (e.key === "ArrowRight") { show(index + 1);  return; }

      // keep Tab inside the dialog while it's open
      if (e.key === "Tab") {
        var stops = [lbClose, lbPrev, lbNext].filter(function (b) { return !b.hidden; });
        var at = stops.indexOf(document.activeElement);
        var next = e.shiftKey ? at - 1 : at + 1;
        if (at === -1 || next < 0 || next >= stops.length) {
          e.preventDefault();
          stops[e.shiftKey ? stops.length - 1 : 0].focus();
        }
      }
    });
  }

  /* ----------------------------------------------------------
     Misc
     ---------------------------------------------------------- */

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

})();
