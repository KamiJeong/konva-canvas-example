import Konva from "konva";
import { useCallback, useState } from "react";
import { Layer, Stage } from "react-konva";
import { ActionButton } from "~/components/action-button";
import { ColorControl, NumberControl, TextControl } from "~/components/property-control";
import {
  CircleNode,
  createCircleShape,
  createId,
  createImageShape,
  createRectShape,
  createTextShape,
  ImageNode,
  RectNode,
  type ShapeItem,
  TextNode,
} from "~/components/shape-node";
import { useMounted } from "~/hooks/useMounted";
import { useStageSize } from "~/hooks/useStageSize";

export default function EditTextAndImages() {
  const mounted = useMounted();
  const { containerRef, stageSize } = useStageSize();
  const [shapes, setShapes] = useState<ShapeItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedShape = shapes.find((shape) => shape.id === selectedId) || null;

  const handleStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
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

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const newImage = createImageShape(reader.result as string);
        setShapes((prev) => [...prev, newImage]);
        setSelectedId(newImage.id);
      };
      reader.readAsDataURL(file);
    };
    input.click();
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
      <div className="flex h-screen bg-slate-100">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white">
          <div className="grid grid-cols-2 gap-2 p-3 border-b-1 border-slate-200">
            <ActionButton type="button" onClick={addRect}>
              Add Rect
            </ActionButton>
            <ActionButton type="button" onClick={addCircle}>
              Add Circle
            </ActionButton>
            <ActionButton type="button" onClick={addText}>
              Add Text
            </ActionButton>
            <ActionButton type="button" onClick={addImage}>
              Add Image
            </ActionButton>
            <ActionButton type="button" onClick={deleteSelected} disabled={!selectedId}>
              Delete
            </ActionButton>
            <ActionButton type="button" onClick={copySelected} disabled={!selectedId}>
              Copy
            </ActionButton>
          </div>
          {selectedShape?.type === "text" && (
            <div className="grid grid-cols-1 gap-2 p-3 border-b-1 border-slate-200">
              <TextControl
                value={selectedShape.text}
                onChange={(e) => {
                  patchShape(selectedShape.id, { text: e.target.value });
                }}
              />
              <NumberControl
                value={selectedShape.fontSize}
                onChange={(e) => {
                  patchShape(selectedShape.id, { fontSize: Number(e.target.value) });
                }}
              />
              <ColorControl
                value={selectedShape.fill}
                onChange={(e) => {
                  patchShape(selectedShape.id, { fill: e.target.value });
                }}
              />
            </div>
          )}
        </aside>
        {/* Main */}
        <main className="flex-1 min-w-0 h-screen">
          <div ref={containerRef} className="w-full h-full">
            <Stage
              width={stageSize.width}
              height={stageSize.height}
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
                    case "image":
                      return (
                        <ImageNode
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
          </div>
        </main>
      </div>
    );
  }

  return <div>Loading...</div>;
}
