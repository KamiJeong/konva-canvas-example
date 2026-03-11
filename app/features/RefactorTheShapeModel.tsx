import { useCallback, useState } from "react";
import { Layer, Stage } from "react-konva";
import CircleNode from "~/components/shape-node/circle-node";
import RectNode from "~/components/shape-node/rect-node";
import TextNode from "~/components/shape-node/text-node";
import { useMounted } from "~/hooks/useMounted";
import type { CircleShape, RectShape, ShapeItem, TextShape } from "~/types/canvas-shape";
import { createId } from "~/utils/id";

export default function AddAndManageElement() {
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

  const addRect = () => {
    const newRect: RectShape = {
      id: createId(),
      type: "rect",
      x: 120,
      y: 120,
      width: 160,
      height: 100,
      fill: "#3b82f6",
      rotation: 0,
    };

    setShapes((prevShapes) => [...prevShapes, newRect]);
    setSelectedId(newRect.id);
  };

  const addCircle = () => {
    const newCircle: CircleShape = {
      id: createId(),
      type: "circle",
      x: 220,
      y: 180,
      radius: 50,
      fill: "#10b981",
      rotation: 0,
    };

    setShapes((prev) => [...prev, newCircle]);
    setSelectedId(newCircle.id);
  };

  const addText = () => {
    const newText: TextShape = {
      id: createId(),
      type: "text",
      x: 160,
      y: 240,
      width: 220,
      text: "New Text",
      fontSize: 28,
      fill: "#111827",
      rotation: 0,
    };

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

    const newShape = {
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
