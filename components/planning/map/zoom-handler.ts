import { useMap } from "react-leaflet";
import { useEffect } from "react";

export function CurrentZoomWatcher({
  onChange,
}: {
  onChange: (z: number) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handler = () => onChange(map.getZoom());
    map.on("zoomend", handler);
    return () => {
      map.off("zoomend", handler);
    };
  }, [map, onChange]);

  return null;
}
