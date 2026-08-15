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
      /* Same grounds as unit 4, so these are shared rather than duplicated. */
      { title: "Exterior", orient: "landscape", items: [
        { file: "images/unit-4-baguio/unit4-01.jpeg", alt: "Moldex Residences entrance and grounds" },
        { file: "images/unit-4-baguio/unit4-15.jpeg", alt: "Moldex Residences towers under a clear sky" }
      ]}
    ]
  },

  /* ----------------------------------------------------------
     Moldex Residences, same grounds as unit 3, but a two-bedroom.
     ---------------------------------------------------------- */
  "unit-4": {
    dir: "images/unit-4-baguio/",
    prefix: "unit4-",
    ext: "jpeg",
    altExt: "png",
    alt: [8, 12, 13, 14],
    groups: [
      { title: "Bedroom 1", orient: "portrait", items: [
        { n: 4,  alt: "Double bed with a pull-out mattress beside the window" },
        { n: 5,  alt: "Double bed made up in cream below framed line art" }
      ]},
      { title: "Bedroom 2", orient: "portrait", items: [
        { n: 3,  alt: "Double bed below framed line art beside the window" },
        { n: 14, alt: "Double bed with a pull-out mattress drawn out alongside" }
      ]},
      { title: "Living room", orient: "portrait", items: [
        { n: 9,  alt: "Living area and dining table seen along the galley kitchen" },
        { n: 10, alt: "Sofa bed below a ring pendant light" }
      ]},
      { title: "Dining area", orient: "portrait", items: [
        { n: 6,  alt: "Dining table and sofa at the window end of the apartment" },
        { n: 13, alt: "Carved dining chairs and a runner on the wooden table" }
      ]},
      { title: "Kitchen", orient: "portrait", items: [
        { n: 11, alt: "Kitchen counter with sink, microwave and overhead cabinets" },
        { n: 12, alt: "Kitchen counter looking through to the dining table" }
      ]},
      { title: "Bathroom", orient: "portrait", items: [
        { n: 7,  alt: "Basin, toilet and glass-screened shower" }
      ]},
      { title: "Exterior", orient: "landscape", items: [
        { n: 1,  alt: "Moldex Residences entrance and grounds" },
        { n: 15, alt: "Moldex Residences towers under a clear sky" }
      ]}
    ]
  }
};
