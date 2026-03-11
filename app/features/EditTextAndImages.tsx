import { useCallback, useState } from "react";
import { Layer, Stage } from "react-konva";
import {
  CircleNode,
  createCircleShape,
  createId,
  createRectShape,
  createTextShape,
  RectNode,
  TextNode,
} from "~/components/shape-node";
import { useMounted } from "~/hooks/useMounted";
import type { ShapeItem } from "~/types/canvas-shape";

export default function RefactorTheShapeModel() {
  const mounted = useMounted();
  const [shapes, setShapes] = useState<ShapeItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleStageMouseDown = (e: any) => {
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const updateShape = (nextShape: ShapeItem) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) => (shape.id === nextShape.id ? nextShape : shape)),
    );
  };

  const patchShape = (id: string, updates: Partial<ShapeItem>) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id ? ({ ...shape, ...updates } as ShapeItem) : shape,
      ),
    );
  };

  const addRect = () => {
    const newRect = createRectShape();
    setShapes((prevShapes) => [...prevShapes, newRect]);
    setSelectedId(newRect.id);
  };

  const addCircle = () => {
    const newCircle = createCircleShape();
    setShapes((prev) => [...prev, newCircle]);
    setSelectedId(newCircle.id);
  };

  const addText = () => {
    const newText = createTextShape();
    setShapes((prev) => [...prev, newText]);
    setSelectedId(newText.id);
  };

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    setShapes((prev) => prev.filter((shape) => shape.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const copySelected = () => {
    if (!selectedId) return;
    const target = shapes.find((shape) => shape.id === selectedId);
    if (!target) return;

    const newShape: ShapeItem = {
      ...target,
      id: createId(),
      x: target.x + 20,
      y: target.y + 20,
    };

    setShapes((prev) => [...prev, newShape]);
    setSelectedId(newShape.id);
  };

  if (mounted) {
    return (
      <>
        <div className="flex gap-2 p-3 border-b-1 border-black">
          <button type="button" className="border-1 p-1 text-black" onClick={addRect}>
            Add Rect
          </button>
          <button type="button" className="border-1 p-1 text-black" onClick={addCircle}>
            Add Circle
          </button>
          <button type="button" className="border-1 p-1 text-black" onClick={addText}>
            Add Text
          </button>
          <button
            type="button"
            className="border-1 p-1 text-black"
            onClick={deleteSelected}
            disabled={!selectedId}
          >
            Delete
          </button>
          <button
            type="button"
            className="border-1 p-1 text-black"
            onClick={copySelected}
            disabled={!selectedId}
          >
            Copy
          </button>
        </div>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleStageMouseDown}
        >
          <Layer>
            {shapes.map((shape) => {
              switch (shape.type) {
                case "rect":
                  return (
                    <RectNode
                      key={shape.id}
                      shape={shape}
                      isSelected={shape.id === selectedId}
                      onSelect={() => setSelectedId(shape.id)}
                      onChange={updateShape}
                    />
                  );
                case "circle":
                  return (
                    <CircleNode
                      key={shape.id}
                      shape={shape}
                      isSelected={shape.id === selectedId}
                      onSelect={() => setSelectedId(shape.id)}
                      onChange={updateShape}
                    />
                  );
                case "text":
                  return (
                    <TextNode
                      key={shape.id}
                      shape={shape}
                      isSelected={shape.id === selectedId}
                      onSelect={() => setSelectedId(shape.id)}
                      onChange={updateShape}
                    />
                  );
                default:
                  return null;
              }
            })}
          </Layer>
        </Stage>
      </>
    );
  }

  return <div>Loading...</div>;
}
