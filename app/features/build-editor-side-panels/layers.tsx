import type { ShapeItem } from "~/components/shape-node";

type LayersProps = {
  shapes?: ShapeItem[];
  selectedId?: string | null;
  onClick?: (id: string) => void;
};

export default function Layers({ shapes = [], selectedId, onClick }: LayersProps) {
  return (
    <div className="min-h-0 flex-1 overflow-auto p-4">
      <h2 className="text-sm font-semibold text-slate-700">Layers</h2>
      <div className="mt-3 space-y-2">
        {shapes.map((shape) => {
          const isSelected = shape.id === selectedId;
          return (
            <button
              key={shape.id}
              type="button"
              className={[
                "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm text-slate-500",
                isSelected
                  ? "border-slate-900 bg-slate-100"
                  : "border-slate-200 bg-white hover:bg-slate-50",
              ].join(" ")}
              onClick={() => onClick?.(shape.id)}
            >
              <span>{shape.type}</span>
              <span className="text-xs text-slate-500">{shape.id.split("-")[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
