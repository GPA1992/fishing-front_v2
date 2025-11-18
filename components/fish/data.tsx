export type FishOption = {
  id: string;
  name: string;
  image: string;
  slug: string;
};

export const fishingList: FishOption[] = [
  { id: "1", name: "Traíra", slug: "traira", image: "traira.jpg" },
  { id: "2", name: "Tilápia", slug: "tilapia", image: "tilapia.jpg" },
  { id: "3", name: "Tucunaré", slug: "tucunare", image: "tucunare.png" },
  { id: "4", name: "Dourado", slug: "dourado", image: "dourado.png" },
  { id: "5", name: "Piau", slug: "piau", image: "piau.png" },
  { id: "6", name: "Pintado", slug: "pintado", image: "pintada.png" },
  { id: "7", name: "Curimbatá", slug: "curimbata", image: "curimbata.png" },
  { id: "8", name: "Pacú", slug: "pacu", image: "pacu.png" },
];
