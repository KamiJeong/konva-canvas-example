import { ColorControl, NumberControl, TextControl } from "~/components/property-control";
import { useShapesStore } from "./shapes-store";

export default function Properties() {
  const { shapes, selectedId, patchShape } = useShapesStore();

  const selectedShape = shapes.find((shape) => shape.id === selectedId) || null;

  return (
    <>
      <div className="border-b border-slate-200 p-4">
        <h2 className="text-sm font-semibold text-slate-700">Properties</h2>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">
        {!selectedShape ? (
          <p className="text-sm text-slate-500">No Shape selected</p>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-slate-500">{selectedShape.type}</div>
              {/* Common Fields - x, y, rotation, fill */}
              <div className="space-y-3">
                <label htmlFor="" className="block">
                  <div className="mb-1 text-xs text-slate-500">X</div>
                  <NumberControl
                    value={selectedShape.x}
                    onChange={(e) => patchShape(selectedShape.id, { x: Number(e.target.value) })}
                  />
                </label>
                <label htmlFor="" className="block">
                  <div className="mb-1 text-xs text-slate-500">Y</div>
                  <NumberControl
                    value={selectedShape.y}
                    onChange={(e) => patchShape(selectedShape.id, { y: Number(e.target.value) })}
                  />
                </label>
                <label htmlFor="" className="block">
                  <div className="mb-1 text-xs text-slate-500">Rotation</div>
                  <NumberControl
                    value={selectedShape.rotation}
                    onChange={(e) =>
                      patchShape(selectedShape.id, { rotation: Number(e.target.value) })
                    }
                  />
                </label>
              </div>
              {/* Type Specific Fields */}
              {selectedShape.type === "rect" && (
                <div className="space-y-3">
                  <NumberControl
                    label="Width"
                    value={selectedShape.width}
                    onChange={(e) =>
                      patchShape(selectedShape.id, { width: Number(e.target.value) })
                    }
                  />
                  <NumberControl
                    label="Height"
                    value={selectedShape.height}
                    onChange={(e) =>
                      patchShape(selectedShape.id, { height: Number(e.target.value) })
                    }
                  />
                  <ColorControl
                    label="Fill"
                    value={selectedShape.fill}
                    onChange={(e) => patchShape(selectedShape.id, { fill: e.target.value })}
                  />
                </div>
              )}
              {selectedShape.type === "circle" && (
                <div className="space-y-3">
                  <NumberControl
                    label="Radius"
                    value={selectedShape.radius}
                    onChange={(e) =>
                      patchShape(selectedShape.id, { radius: Number(e.target.value) })
                    }
                  />
                  <TextControl
                    label="Fill"
                    value={selectedShape.fill}
                    onChange={(e) => patchShape(selectedShape.id, { fill: e.target.value })}
                  />
                </div>
              )}
              {selectedShape.type === "text" && (
                <div className="space-y-3">
                  <TextControl
                    label="Text"
                    value={selectedShape.text}
                    onChange={(e) => patchShape(selectedShape.id, { text: e.target.value })}
                  />
                  <NumberControl
                    label="Width"
                    value={selectedShape.width}
                    onChange={(e) =>
                      patchShape(selectedShape.id, { width: Number(e.target.value) })
                    }
                  />
                  <NumberControl
                    label="Font Size"
                    value={selectedShape.fontSize}
                    onChange={(e) =>
                      patchShape(selectedShape.id, { fontSize: Number(e.target.value) })
                    }
                  />
                  <ColorControl
                    label="Fill"
                    value={selectedShape.fill}
                    onChange={(e) => patchShape(selectedShape.id, { fill: e.target.value })}
                  />
                </div>
              )}
              {selectedShape.type === "image" && (
                <div className="space-y-3">
                  <NumberControl
                    label="Width"
                    value={selectedShape.width}
                    onChange={(e) =>
                      patchShape(selectedShape.id, { width: Number(e.target.value) })
                    }
                  />
                  <NumberControl
                    label="Height"
                    value={selectedShape.height}
                    onChange={(e) =>
                      patchShape(selectedShape.id, { height: Number(e.target.value) })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
