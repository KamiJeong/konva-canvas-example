import { useShapesStore } from "./shapes-store";

export default function Zoom() {
  const { viewPort } = useShapesStore();

  return (
    <div className="absolute bottom-3 right-3 text-xs text-slate-500">{`Zoom: ${(viewPort.scale * 100).toFixed(0)}%`}</div>
  );
}
