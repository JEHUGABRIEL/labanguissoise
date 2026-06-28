export const manifest = {
  screens: {
    scr_lzdzid: { name: "Accueil", route: "/", position: { "x": 160, "y": 220 } },
    scr_uckj7x: { name: "Restaurant", route: "/restaurant", position: { "x": 1560, "y": 220 } },
    scr_mo31gf: { name: "Hébergement", route: "/hebergement", position: { "x": 2960, "y": 220 } },
    scr_2xgjfo: { name: "Contact", route: "/contact", position: { "x": 4360, "y": 220 } }
  },
  sections: {
    sec_mh8uvv: { name: "Main Navigation", x: 0, y: 0, width: 5720, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_mh8uvv", children: [
    { kind: "screen", id: "scr_lzdzid" },
    { kind: "screen", id: "scr_uckj7x" },
    { kind: "screen", id: "scr_mo31gf" },
    { kind: "screen", id: "scr_2xgjfo" }]
  }]

};