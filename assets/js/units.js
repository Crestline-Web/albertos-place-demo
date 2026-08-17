/* ============================================================
   ALBERTO'S PLACE — gallery manifests
   One entry per unit. main.js picks the right one from
   <body data-unit="...">.

   `alt` lists the file numbers whose extension differs from
   `ext` — Airbnb serves a mix of .png and .jpeg per listing.

   Folder names no longer line up with the unit numbers, and that is fine —
   two listings have been removed over time and the pages were renumbered
   down while the folders stayed put. Renaming them would only churn paths.
   The mapping is whatever `dir` says below; don't infer it from the number.

   images/unit-4-baguio/ outlives its page: the 2-bedroom it belonged to is
   gone, but unit4-01 and unit4-15 are the shared Moldex exterior shots that
   unit 2, unit 3 and the landing page all still point at. Don't delete it.

   Per group:
     orient : "portrait" | "landscape"  tile shape for the room
     wide   : true on an item far wider than its room's tile,
              so it gets a double-width slot instead of a crop
   ============================================================ */

window.UNITS = {


  /* ---------------------------------------------------------- */
  "unit-1": {
    dir: "images/unit-2-baguio/",
    prefix: "unit2-",
    ext: "png",
    altExt: "jpeg",
    alt: [16, 32, 33, 34, 35, 38],
    groups: [
      { title: "Bedroom 1", orient: "portrait", items: [
        { n: 4,  alt: "Double bed with a dark storage headboard beside the window" },
        { n: 22, alt: "Double bed dressed in a patterned cover with brown curtains" }
      ]},
      { title: "Bedroom 2", orient: "portrait", items: [
        { n: 6,  alt: "Bunk bed beside the window with a single bed below" },
        { n: 7,  alt: "Bunk bed with an extra pull-out mattress made up on the floor" }
      ]},
      { title: "Living room", orient: "portrait", items: [
        { n: 10, alt: "Corner sofa bed with yellow cushions below floating shelves" },
        { n: 9,  alt: "Sofa bed seen along the living area" },
        { n: 5,  alt: "Sofa bed beside the fridge at the edge of the kitchen" }
      ]},
      { title: "Dining area", orient: "portrait", items: [
        { n: 21, alt: "Glass-topped dining table for four below framed wall art" },
        { n: 3,  alt: "Dining table and television on the wood-slat wall" }
      ]},
      { title: "Kitchen", orient: "portrait", items: [
        { n: 8,  alt: "White kitchen units with a stainless fridge and speckled counter" },
        { n: 14, alt: "Open cabinet holding pots, a steamer and a wok" },
        { n: 16, alt: "Drawer of cutlery, knives and cooking utensils", wide: true }
      ]},
      { title: "Bathroom", orient: "portrait", items: [
        { n: 25, alt: "Basin with mirrored cabinet, toilet and towel rail" },
        { n: 28, alt: "Rain shower in the glass-screened stall" }
      ]},
      /* The images/unit-1-baguio/ folder is kept as the Megatower photo set:
         the original unit-1 listing was a duplicate of this one and its page
         is gone, but its building and rooftop shots are the ones in use here. */
      { title: "Exterior", orient: "landscape", items: [
        { file: "images/unit-1-baguio/unit1-39.jpeg", alt: "Megatower 1 Residences seen from the street" },
        { file: "images/unit-1-baguio/unit1-01.jpeg", alt: "Glass main entrance at the top of the front steps" },
        { file: "images/unit-1-baguio/unit1-42.jpeg", alt: "Ground-floor reception desk" },
        { file: "images/unit-1-baguio/unit1-45.jpeg", alt: "Lit Megatower 1 sign above the lobby at night" }
      ]},
      { title: "Rooftop", orient: "landscape", items: [
        { file: "images/unit-1-baguio/unit1-33.jpeg", alt: "Rooftop garden and paved deck looking over Baguio" },
        { file: "images/unit-1-baguio/unit1-37.jpeg", alt: "Daytime view over the pines and hillside houses" },
        { file: "images/unit-1-baguio/unit1-32.jpeg", alt: "Baguio city lights at night from the rooftop" }
      ]}
    ]
  },

  /* ----------------------------------------------------------
     Different building to units 1 and 2 — Moldex Residences,
     one bedroom, and a balcony rather than a shared rooftop.
     No bathroom photo exists in this listing's set.
     ---------------------------------------------------------- */
  "unit-2": {
    dir: "images/unit-3-baguio/",
    prefix: "unit3-",
    ext: "jpeg",
    altExt: "png",
    alt: [1, 2, 12],
    groups: [
      { title: "Bedroom", orient: "portrait", items: [
        { n: 1,  alt: "Double bed under a ring pendant light beside the balcony doors" },
        { n: 16, alt: "Double bed made up in cream with floor-length curtains" },
        { n: 17, alt: "Arched floor mirror and trailing greenery beside the bed" }
      ]},
      { title: "Living room", orient: "portrait", items: [
        { n: 10, alt: "Sofa bed and bar stools under a globe chandelier" },
        { n: 9,  alt: "Sofa bed facing the wall-mounted television" },
        { n: 11, alt: "Television and shelf styling above the shag rug" }
      ]},
      { title: "Kitchen", orient: "portrait", items: [
        { n: 13, alt: "Galley kitchen looking through to the bedroom" },
        { n: 14, alt: "Microwave, kettle and induction hob along the counter" },
        { n: 15, alt: "Sink and counter under warm strip lighting" },
        { n: 12, alt: "Open upper cabinets with crockery, mugs and utensils", wide: true }
      ]},
      { title: "Balcony", orient: "portrait", items: [
        { n: 2,  alt: "Balcony table and chairs looking over the pines at sunset" },
        { n: 19, alt: "Sunset over the hillside seen from the balcony" }
      ]},
      /* Same grounds as unit 3, so these are shared rather than duplicated. */
      { title: "Exterior", orient: "landscape", items: [
        { file: "images/unit-4-baguio/unit4-01.jpeg", alt: "Moldex Residences entrance and grounds" },
        { file: "images/unit-4-baguio/unit4-15.jpeg", alt: "Moldex Residences towers under a clear sky" }
      ]}
    ]
  },

  /* ----------------------------------------------------------
     Moldex again — a one-bedroom on a high floor. Not listed on
     Airbnb, so its page points at the Facebook page instead.
     Same grounds as unit 2, so the exterior shots are shared.
     ---------------------------------------------------------- */
  "unit-3": {
    dir: "images/moldex-highfloor/",
    prefix: "hf-",
    ext: "jpg",
    altExt: "jpg",
    alt: [],
    groups: [
      { title: "Bedroom", orient: "portrait", items: [
        { n: 3, alt: "Double bed with sage cushions beside the bedside lamp" }
      ]},
      { title: "Living room", orient: "portrait", items: [
        { n: 8, alt: "Sofa bed under a floor lamp in the living area" }
      ]},
      { title: "Kitchen", orient: "portrait", items: [
        { n: 4, alt: "Kitchen counter with sink, kettle, induction hob and open shelving" }
      ]},
      { title: "Bathroom", orient: "portrait", items: [
        { n: 1, alt: "Basin, toilet and towel rail with trailing greenery" },
        { n: 7, alt: "Shower with a wall-mounted water heater" }
      ]},
      { title: "Balcony", orient: "portrait", items: [
        { n: 2, alt: "Balcony table and chairs looking over the pines at sunset" },
        { n: 5, alt: "Baguio city lights seen from the balcony at night" },
        { n: 6, alt: "Balcony table with a lantern lit, fog rolling past the building" }
      ]},
      /* Same grounds as units 2 and 3 */
      { title: "Exterior", orient: "landscape", items: [
        { file: "images/unit-4-baguio/unit4-01.jpeg", alt: "Moldex Residences entrance and grounds" },
        { file: "images/unit-4-baguio/unit4-15.jpeg", alt: "Moldex Residences towers under a clear sky" }
      ]}
    ]
  }
};
