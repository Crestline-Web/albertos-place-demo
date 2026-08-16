/* ============================================================
   ALBERTO'S PLACE — behaviour
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Photo manifest — supplied per page by units.js, chosen with
     <body data-unit="unit-2">. Landing page has no manifest.
     ---------------------------------------------------------- */

  var UNIT   = (window.UNITS || {})[document.body.dataset.unit] || null;
  var GROUPS = UNIT ? UNIT.groups : [];

  /* An item is normally a file number inside this unit's own folder, but it
     can carry an explicit `file` instead — units 1 and 2 share a building, so
     they share the exterior and rooftop shots rather than duplicating them. */
  function src(item) {
    if (item.file) return item.file;
    var n = item.n;
    var pad = n < 10 ? "0" + n : String(n);
    var ext = UNIT.alt.indexOf(n) !== -1 ? UNIT.altExt : UNIT.ext;
    return UNIT.dir + UNIT.prefix + pad + "." + ext;
  }


  /* Flattened in section order — this is the sequence the lightbox walks,
     so paging through it moves room by room. */
  var photos = [];
  GROUPS.forEach(function (group) {
    group.items.forEach(function (item) {
      item.index = photos.length;
      photos.push({ src: src(item), alt: item.alt, room: group.title });
    });
  });

  function indexOfPhoto(path) {
    for (var i = 0; i < photos.length; i++) if (photos[i].src === path) return i;
    return -1;
  }

  /* ----------------------------------------------------------
     Hero — the window opens onto the scene
     ---------------------------------------------------------- */

  var hero = document.getElementById("hero");
  var revealLayer = document.getElementById("revealLayer");

  if (hero && revealLayer) {
    // Scoped to the cards themselves — the CTA also carries data-reveal, and
    // shouldn't trigger a peek when you hover the button.
    var cards  = Array.prototype.slice.call(hero.querySelectorAll(".window-card"));
    var cta    = document.getElementById("exploreCta");
    var layers = [revealLayer, document.getElementById("revealLayerB")].filter(Boolean);
    var front  = 0;      // which layer is currently on screen
    var shown  = -1;     // which card the hero is currently showing
    var timer  = null;

    var DWELL = 3000;
    var still = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* The hero CTA points at whichever stay is on screen, so "Explore the
       unit" always means the one you're looking at. */
    function setActive(card) {
      if (!card || !cta) return;
      cta.setAttribute("href", card.getAttribute("href"));
      if (card.dataset.reveal) cta.dataset.reveal = card.dataset.reveal;
    }

    /* Cross-fade by alternating two layers: paint the next unit onto the one
       that's currently hidden, then swap which is visible. */
    function show(i) {
      if (i === shown || !cards[i]) return;
      var card = cards[i];

      if (layers.length > 1) {
        var next = layers[(front + 1) % 2];
        var prev = layers[front];

        /* The outgoing layer keeps its opacity and simply stays underneath.
           Fading it out at the same time as fading the new one in leaves both
           semi-transparent for a moment, and the base photo shows through the
           gap — which read as a flash of the building between units. */
        next.style.backgroundImage = "url('" + card.dataset.reveal + "')";
        next.style.zIndex = "2";
        prev.style.zIndex = "1";

        /* Snap the incoming layer back to hidden with the transition off.
           From the second swap on it is still fully opaque from its last turn
           on screen, and dropping .is-on on its own would only start fading it
           out — so re-adding it a moment later had nothing left to travel and
           the unit changed in one hard cut. */
        next.style.transition = "none";
        next.classList.remove("is-on");
        void next.offsetWidth;               // land the reset un-animated
        next.style.transition = "";
        void next.offsetWidth;               // restart the slow push-in
        next.classList.add("is-on");
        front = (front + 1) % 2;
      } else {
        layers[0].style.backgroundImage = "url('" + card.dataset.reveal + "')";
        layers[0].classList.add("is-on");
      }

      hero.classList.add("is-peeking");
      cards.forEach(function (c) { c.classList.remove("is-showing"); });
      card.classList.add("is-showing");
      setActive(card);
      shown = i;
    }

    function play() {
      stop();
      if (cards.length < 2 || still.matches) return;
      timer = window.setInterval(function () {
        show((shown + 1) % cards.length);
      }, DWELL);
    }

    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }

    setActive(cards[0]);

    cards.forEach(function (card, i) {
      // Pointing at a card takes over from the rotation, and lets go of it again
      card.addEventListener("mouseenter", function () { stop(); show(i); });
      card.addEventListener("focus",      function () { stop(); show(i); });
      card.addEventListener("mouseleave", play);
      card.addEventListener("blur",       play);
    });

    // Don't cycle in a tab nobody is looking at
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else play();
    });

    still.addEventListener("change", function () { still.matches ? stop() : play(); });

    if (cards.length > 1 && !still.matches) {
      // first unit appears after one dwell, so the establishing shot lands first
      window.setTimeout(function () { show(0); play(); }, DWELL);
    }

    window.__heroStop = stop;
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
      if (window.__heroStop) window.__heroStop();
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

    GROUPS.forEach(function (group) {
      var section = document.createElement("section");
      section.className = "room";

      var head = document.createElement("div");
      head.className = "room__head";

      var h3 = document.createElement("h3");
      h3.className = "room__title";
      h3.textContent = group.title;

      head.appendChild(h3);

      /* Tile shape follows the room's own photos. One shared ratio meant
         either the portrait interiors sat in empty margins or the wide
         rooftop views got cropped in half. */
      var grid = document.createElement("div");
      grid.className = "room__grid room__grid--" + (group.orient || "portrait");

      group.items.forEach(function (item) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gallery__item" + (item.wide ? " gallery__item--wide" : "");
        btn.dataset.index = item.index;
        btn.setAttribute("aria-label", "Open photo: " + item.alt);

        var img = document.createElement("img");
        img.src = src(item);
        img.loading = "lazy";
        img.decoding = "async";
        img.alt = "";

        btn.appendChild(img);
        grid.appendChild(btn);
      });

      section.appendChild(head);
      section.appendChild(grid);
      frag.appendChild(section);
    });

    gallery.appendChild(frag);
  }

  /* A mosaic tile finds its place in the lightbox from the photo it already
     shows, so the markup can't drift out of step with the manifest. A tile
     showing something not in the gallery simply isn't clickable. */
  Array.prototype.forEach.call(
    document.querySelectorAll(".mosaic__item"),
    function (tile) {
      var img = tile.querySelector("img");
      var i = img ? indexOfPhoto(img.getAttribute("src")) : -1;
      if (i === -1) { tile.disabled = true; tile.style.cursor = "default"; return; }
      tile.dataset.index = i;
      if (!tile.getAttribute("aria-label")) {
        tile.setAttribute("aria-label", "Open photo: " + photos[i].alt);
      }
    }
  );

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
      var photo = list[index];

      lbImg.src = photo.src;
      lbImg.alt = photo.alt || "";
      lbCount.textContent = photo.room
        ? photo.room + " · " + (index + 1) + " / " + list.length
        : (index + 1) + " / " + list.length;

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
      if (single) {
        open(0, [{ src: single.dataset.lightboxSrc,
                   alt: single.dataset.lightboxAlt || "" }], single);
      }
    });

    lbClose.addEventListener("click", close);
    lbPrev.addEventListener("click", function () { show(index - 1); });
    lbNext.addEventListener("click", function () { show(index + 1); });

    /* Swipe to page through on touch screens. A swipe that starts on the
       backdrop also fires a click, which would otherwise close the viewer
       mid-gesture — hence the `swiped` guard. */
    var touchX = null, touchY = null, swiped = false;

    lb.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) { touchX = null; return; }
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
      swiped = false;
    }, { passive: true });

    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      var dy = e.changedTouches[0].clientY - touchY;
      touchX = null;

      if (list.length < 2) return;

      // deliberate and horizontal, so vertical scrolling isn't hijacked
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        swiped = true;
        show(dx < 0 ? index + 1 : index - 1);
      }
    }, { passive: true });

    lb.addEventListener("click", function (e) {
      if (swiped) { swiped = false; return; }
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
