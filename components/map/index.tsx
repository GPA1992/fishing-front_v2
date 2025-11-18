"use client";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen";
import { useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { type LatLngTuple } from "leaflet";

import MapClickHandler from "./MapClickHandler";
import SyncView from "./SyncView";
import { BASE_LAYERS } from "./base-layers";
import { mapStore } from "./store";
import { boundingBoxCenter } from "./bounding-box";
import { ensureDefaultMarkerConfig } from "./configure-default-marker";
import {
  type BoundingBox,
  planningStore,
  searchLocationsByBoundingBoxAction,
} from "@/core/request";
import { cn } from "@/lib/utils";
import { CurrentZoomWatcher } from "./zoom-handler";

const DEFAULT_CENTER: LatLngTuple = [-24.02323, -48.9034806];
const DEFAULT_ZOOM = 14;

ensureDefaultMarkerConfig();

interface MapProps {
  bbox?: BoundingBox;
  initialCenter?: LatLngTuple;
  zoom?: number;
  className?: string;
}

export default function Map({
  bbox,
  initialCenter = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  className,
}: MapProps) {
  const selected = planningStore((state) => state.selected);
  const syncViewEnabled = planningStore((state) => state.syncViewEnabled);
  const setSyncViewEnabled = planningStore((state) => state.setSyncViewEnabled);
  const markLoading = planningStore((state) => state.markLoading);
  const searcLoading = planningStore((state) => state.searcLoading);
  const activeBBox = selected?.boundingBox ?? bbox;
  const baseLayerId = mapStore((state) => state.baseLayerId);
  const setMapProperty = mapStore((state) => state.setProperty);
  const lastZoom = mapStore((state) => state.zoom);
  const derivedCenter = useMemo(() => {
    if (activeBBox) return boundingBoxCenter(activeBBox);
    return initialCenter;
  }, [activeBBox, initialCenter]);

  const baseLayer = useMemo(
    () =>
      BASE_LAYERS.find((layer) => layer.id === baseLayerId) ?? BASE_LAYERS[0],
    [baseLayerId]
  );
  const [baseSelectorOpen, setBaseSelectorOpen] = useState(false);
  const [manualPosition, setManualPosition] = useState<LatLngTuple | null>(
    null
  );

  const markerPosition = syncViewEnabled
    ? selected?.center ?? derivedCenter
    : manualPosition ?? selected?.center ?? derivedCenter;

  async function handleMapSelection(
    position: LatLngTuple,
    boundsBBox: BoundingBox
  ) {
    setManualPosition(position);
    setSyncViewEnabled(false);

    try {
      await searchLocationsByBoundingBoxAction({
        term: `${position[0]},${position[1]}`,
        bbox: boundsBBox,
      });
    } catch (error) {
      console.error("Erro ao buscar localização pelo mapa", error);
    }
    const latestSelection = planningStore.getState().selected;
    if (latestSelection) {
      setManualPosition(position);
    }
  }

  return (
    <>
      <div className="relative z-0 overflow-hidden rounded-2xl shadow-2xl shadow-emerald-900/10 border-none">
        <div className="absolute bottom-3 left-3 z-[1000] sm:bottom-4 sm:left-4">
          <div className="relative w-fit space-y-2 rounded-md p-1">
            {baseSelectorOpen && (
              <div
                className={cn(
                  "absolute bottom-full left-0 z-10 mb-2 flex flex-col gap-2 rounded-md bg-white p-2 shadow-lg"
                )}
              >
                {BASE_LAYERS.map((layer) => (
                  <div
                    key={layer.id}
                    onClick={() => {
                      setMapProperty("baseLayerId", layer.id);
                      setBaseSelectorOpen(false);
                    }}
                    className={cn(
                      "w-[40px] h-[40px] border-2 rounded-md overflow-hidden cursor-pointer hover:scale-105 transition",
                      baseLayer.id === layer.id && "border-emerald-700 border-2"
                    )}
                  >
                    <img
                      src={layer.previewUrl}
                      alt={layer.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="w-max rounded-md border border-emerald-700 bg-white shadow-sm">
              <div
                className="h-[56px] w-[56px] cursor-pointer overflow-hidden rounded-md border border-white sm:h-[60px] sm:w-[60px]"
                onClick={() => setBaseSelectorOpen((prev) => !prev)}
                aria-label="Alterar mapa base"
                role="button"
              >
                <img
                  src={baseLayer.previewUrl}
                  alt={`${baseLayer.label} Preview`}
                  className="w-full h-full object-cover border-emerald-700"
                />
              </div>
            </div>
          </div>
        </div>

        <MapContainer
          center={markerPosition}
          fullscreenControl={true}
          zoom={lastZoom ?? zoom}
          scrollWheelZoom
          zoomControl={false}
          attributionControl={false}
          className={"w-full h-[40vh]"}
        >
          <TileLayer
            key={baseLayer.id}
            attribution={baseLayer.attribution}
            url={baseLayer.url}
          />

          <Marker position={markerPosition} />
          {!markLoading && !searcLoading && (
            <MapClickHandler
              onClick={(position: LatLngTuple, mapBounds) => {
                handleMapSelection(position, mapBounds);
              }}
            />
          )}
          {syncViewEnabled && <SyncView center={markerPosition} />}
          <CurrentZoomWatcher onChange={(z) => setMapProperty("zoom", z)} />
        </MapContainer>
      </div>
      <span className="text-sm italic text-muted mb-3 pl-1 px-1">
        Arraste, de zoom, clique para marcar o local.
      </span>
    </>
  );
}
