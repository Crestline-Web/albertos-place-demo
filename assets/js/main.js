/* ============================================================
   TERRA STAYS — behaviour
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Photo manifest, grouped by room.
     Section order and per-room picks were set by the client.
     `n` is the file number in images/unit-1-baguio/.
     ---------------------------------------------------------- */

  var PNG = [2, 3, 4, 7, 8, 17, 24, 30, 31, 48];
  var DIR = "images/unit-1-baguio/";

  var GROUPS = [
    { title: "Bedroom 1", items: [
      { n: 23, alt: "Double bed with a dark storage headboard beside a bright window" },
      { n: 3,  alt: "Double bed and a single bed made up with tan throws" }
    ]},
    { title: "Bedroom 2", items: [
      { n: 25, alt: "Bunk bed with a lower single bed beside a window" },
      { n: 5,  alt: "Bunk bed with folded towels and a pull-out mattress below" }
    ]},
    { title: "Living room", items: [
      { n: 10, alt: "Sofa bed below floating shelves in the living area" },
      { n: 9,  alt: "Flat-screen television mounted on the wood-slat feature wall" }
    ]},
    { title: "Dining area", items: [
      { n: 18, alt: "Dining table dressed with a runner, television on the slat wall behind" },
      { n: 21, alt: "Dining table looking through to the living area and front door" }
    ]},
    { title: "Kitchen", items: [
      { n: 16, alt: "Kitchen counter with rice cooker, kettle, hob and fridge" },
      { n: 15, alt: "Open lower cabinet holding pots, a kettle and a slow cooker" },
      { n: 13, alt: "Drawer of cutlery, cooking utensils and knives" }
    ]},
    { title: "Bathroom", items: [
      { n: 30, alt: "Rain shower head and handheld shower in the tiled stall" },
      { n: 31, alt: "Shower stall, toilet and towel rail" },
      { n: 7,  alt: "Basin with a mirrored cabinet and hanging greenery" }
    ]},
    { title: "Exterior", items: [
      { n: 39, alt: "Megatower 1 Residences seen from the street" },
      { n: 1,  alt: "Glass main entrance at the top of the front steps" },
      { n: 42, alt: "Ground-floor reception desk" },
      { n: 45, alt: "Lit Megatower 1 sign above the lobby at night" }
    ]},
    { title: "Rooftop", items: [
      { n: 33, alt: "Rooftop garden and paved deck looking over Baguio" },
      { n: 37, alt: "Daytime view over the pines and hillside houses" },
      { n: 32, alt: "Baguio city lights at night from the rooftop" }
    ]}
  ];

  function src(n) {
    var pad = n < 10 ? "0" + n : String(n);
    var ext = PNG.indexOf(n) !== -1 ? "png" : "jpeg";
    return DIR + "unit1-" + pad + "." + ext;
  }

  /* Flattened in section order — this is the sequence the lightbox walks,
     so paging through it moves room by room. */
  var photos = [];
  GROUPS.forEach(function (group) {
    group.items.forEach(function (item) {
      item.index = photos.length;
      photos.push({ n: item.n, src: src(item.n), alt: item.alt, room: group.title });
    });
  });

  function indexOfPhoto(n) {
    for (var i = 0; i < photos.length; i++) if (photos[i].n === n) return i;
    return 0;
  }

  /* ----------------------------------------------------------
     Hero — the window opens onto the scene
     ---------------------------------------------------------- */

  var hero = document.getElementById("hero");
  var revealLayer = document.getElementById("revealLayer");

  if (hero && revealLayer) {
    // Scoped to the cards themselves — the CTA also carries data-reveal, and
    // shouldn't trigger a peek when you hover the button.
    var cards = hero.querySelectorAll(".window-card");
    var cta   = document.getElementById("exploreCta");

    /* The hero CTA points at whichever stay is currently being previewed, so
       "Explore the stay" stays truthful once the rail holds more than one. */
    function setActive(card) {
      if (!card || !cta) return;
      cta.setAttribute("href", card.getAttribute("href"));
      if (card.dataset.reveal) cta.dataset.reveal = card.dataset.reveal;
    }

    setActive(cards[0]);

    Array.prototype.forEach.call(cards, function (card) {
      function open() {
        revealLayer.style.backgroundImage = "url('" + card.dataset.reveal + "')";
        hero.classList.add("is-peeking");
        setActive(card);
      }
      function close() {
        hero.classList.remove("is-peeking");
      }

      card.addEventListener("mouseenter", open);
      card.addEventListener("mouseleave", close);
      card.addEventListener("focus", open);
      card.addEventListener("blur", close);
    });

    /* Touch screens have no hover, so follow whichever card is scrolled into
       the rail instead. Only meaningful once the rail actually scrolls. */
    if (cards.length > 1 && "IntersectionObserver" in window) {
      var rail = hero.querySelector(".window-rail");

      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            setActive(entry.target);
            revealLayer.style.backgroundImage =
              "url('" + entry.target.dataset.reveal + "')";
          }
        });
      }, { root: rail, threshold: [0.75] });

      Array.prototype.forEach.call(cards, function (card) { spy.observe(card); });
    }
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

    GROUPS.forEach(function (group) {
      var section = document.createElement("section");
      section.className = "room";

      var head = document.createElement("div");
      head.className = "room__head";

      var h3 = document.createElement("h3");
      h3.className = "room__title";
      h3.textContent = group.title;

      head.appendChild(h3);

      var grid = document.createElement("div");
      grid.className = "room__grid";

      group.items.forEach(function (item) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gallery__item";
        btn.dataset.index = item.index;
        btn.setAttribute("aria-label", "Open photo: " + item.alt);

        var img = document.createElement("img");
        img.src = src(item.n);
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

  /* Mosaic tiles reference photos by file number, so reordering the groups
     above can't silently point them at the wrong image. */
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-photo]"),
    function (tile) {
      var i = indexOfPhoto(parseInt(tile.dataset.photo, 10));
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
