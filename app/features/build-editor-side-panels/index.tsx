import type Konva from "konva";
import { useCallback, useState } from "react";
import {
  createCircleShape,
  createId,
  createImageShape,
  createRectShape,
  createTextShape,
  type ShapeItem,
} from "~/components/shape-node";
import { useMounted } from "~/hooks/useMounted";
import { useStageSize } from "~/hooks/useStageSize";
import Layers from "./layers";
import LeftPanel from "./left-panel";
import MainCanvasArea from "./main-canvas-area";
import Properties from "./properties";
import RightPanel from "./right-panel";
import Tools from "./tools";

export default function BuildEditorSidePanels() {
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
      <div className="flex h-screen overflow-hidden bg-slate-100">
        {/*  Left Panel */}
        <LeftPanel>
          <Tools
            actions={[
              { name: "Add Rect", onClick: addRect },
              { name: "Add Circle", onClick: addCircle },
              { name: "Add Text", onClick: addText },
              { name: "Add Image", onClick: addImage },
            ]}
          />
          <Layers shapes={shapes} selectedId={selectedId} onClick={(id) => setSelectedId(id)} />
        </LeftPanel>
        {/*  Main */}
        <MainCanvasArea
          shapes={shapes}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          onUpdateShape={updateShape}
          onStageMouseDown={handleStageMouseDown}
        />
        {/*  Right Panel */}
        <RightPanel>
          <Properties selectedShape={selectedShape} onPatchShape={patchShape} />
        </RightPanel>
      </div>
    );
  }

  return <div>Loading...</div>;
}
