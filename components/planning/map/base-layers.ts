export const BASE_LAYERS = [
  {
    id: "osm",
    label: "OSM",
    baseLayerName: "openstreetmap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    previewUrl: "https://tile.openstreetmap.org/3/2/3.png",
  },
  {
    id: "esri",
    label: "Esri Satélite",
    baseLayerName: "esri_satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles © Esri — Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, METI, TomTom, 2012",
    previewUrl:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/3/2/2",
  },
] as const;

export type BaseLayer = (typeof BASE_LAYERS)[number];
export const DEFAULT_BASE_LAYER_ID = BASE_LAYERS[1].id;
