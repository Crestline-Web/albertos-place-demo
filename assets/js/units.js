/* ============================================================
   ALBERTO'S PLACE — gallery manifests
   One entry per unit. main.js picks the right one from
   <body data-unit="...">.

   `alt` lists the file numbers whose extension differs from
   `ext` — Airbnb serves a mix of .png and .jpeg per listing.

   Per group:
     orient : "portrait" | "landscape"  tile shape for the room
     wide   : true on an item far wider than its room's tile,
              so it gets a double-width slot instead of a crop
   ============================================================ */

window.UNITS = {

  /* ---------------------------------------------------------- */
  "unit-1": {
    dir: "images/unit-1-baguio/",
    prefix: "unit1-",
    ext: "jpeg",
    altExt: "png",
    alt: [2, 3, 4, 7, 8, 17, 24, 30, 31, 48],
    groups: [
      { title: "Bedroom 1", orient: "portrait", items: [
        { n: 23, alt: "Double bed with a dark storage headboard beside a bright window" },
        { n: 3,  alt: "Double bed and a single bed made up with tan throws" }
      ]},
      { title: "Bedroom 2", orient: "portrait", items: [
        { n: 25, alt: "Bunk bed with a lower single bed beside a window" },
        { n: 5,  alt: "Bunk bed with folded towels and a pull-out mattress below" }
      ]},
      { title: "Living room", orient: "portrait", items: [
        { n: 10, alt: "Sofa bed below floating shelves in the living area" },
        { n: 9,  alt: "Flat-screen television mounted on the wood-slat feature wall" }
      ]},
      { title: "Dining area", orient: "portrait", items: [
        { n: 18, alt: "Dining table dressed with a runner, television on the slat wall behind" },
        { n: 21, alt: "Dining table looking through to the living area and front door" }
      ]},
      { title: "Kitchen", orient: "portrait", items: [
        { n: 16, alt: "Kitchen counter with rice cooker, kettle, hob and fridge" },
        { n: 15, alt: "Open lower cabinet holding pots, a kettle and a slow cooker" },
        { n: 13, alt: "Drawer of cutlery, cooking utensils and knives", wide: true }
      ]},
      { title: "Bathroom", orient: "portrait", items: [
        { n: 30, alt: "Rain shower head and handheld shower in the tiled stall" },
        { n: 31, alt: "Shower stall, toilet and towel rail" },
        { n: 7,  alt: "Basin with a mirrored cabinet and hanging greenery" }
      ]},
      { title: "Exterior", orient: "landscape", items: [
        { n: 39, alt: "Megatower 1 Residences seen from the street" },
        { n: 1,  alt: "Glass main entrance at the top of the front steps" },
        { n: 42, alt: "Ground-floor reception desk" },
        { n: 45, alt: "Lit Megatower 1 sign above the lobby at night" }
      ]},
      { title: "Rooftop", orient: "landscape", items: [
        { n: 33, alt: "Rooftop garden and paved deck looking over Baguio" },
        { n: 37, alt: "Daytime view over the pines and hillside houses" },
        { n: 32, alt: "Baguio city lights at night from the rooftop" }
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  "unit-2": {
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
        { n: 11, alt: "Yellow cushions and bolsters on the cream sofa bed" }
      ]},
      { title: "Dining area", orient: "portrait", items: [
        { n: 19, alt: "Glass-topped dining table with four chairs" },
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
      { title: "Exterior", orient: "portrait", items: [
        { n: 37, alt: "Ground-floor reception desk at Megatower 1 Residences" }
      ]},
      { title: "Rooftop", orient: "portrait", items: [
        { n: 1,  alt: "Rooftop garden and paved deck looking over Baguio" }
      ]}
    ]
  },

  /* ----------------------------------------------------------
     Different building to units 1 and 2 — Moldex Residences,
     one bedroom, and a balcony rather than a shared rooftop.
     No bathroom photo exists in this listing's set.
     ---------------------------------------------------------- */
  "unit-3": {
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
      { title: "Exterior", orient: "landscape", items: [
        { n: 20, alt: "Moldex Residences entrance and grounds" }
      ]}
    ]
  }
};
