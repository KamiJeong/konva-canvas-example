import type Konva from "konva";
import { useRef } from "react";
import { Group, Layer, Rect, Stage } from "react-konva";
import { CircleNode, ImageNode, RectNode, TextNode } from "~/components/shape-node";
import { useStageSize } from "~/hooks/useStageSize";
import { useShapesStore } from "./shapes-store";
import Zoom from "./zoom";

export default function MainCanvasArea() {
  const { containerRef, stageSize } = useStageSize();
  const { shapes, selectedId, selectId, updateShape, viewPort, updateViewPort } = useShapesStore();

  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  const onStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      selectId(null);
      isPanningRef.current = true;
      panStartRef.current = { x: e.evt.clientX - viewPort.x, y: e.evt.clientY - viewPort.y };
    }
  };

  const onStageMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isPanningRef.current) return;
    updateViewPort({
      x: e.evt.clientX - panStartRef.current.x,
      y: e.evt.clientY - panStartRef.current.y,
    });
  };

  const onStageMouseUp = () => {
    isPanningRef.current = false;
  };

  const onWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (!stage) return;

    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const scaleBy = 1.05;
    const oldScale = viewPort.scale;

    const mousePointTo = {
      x: (pointer.x - viewPort.x) / oldScale,
      y: (pointer.y - viewPort.y) / oldScale,
    };

    const nextScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    const clampedScale = Math.min(4, Math.max(0.25, nextScale));

    const nextX = pointer.x - mousePointTo.x * clampedScale;
    const nextY = pointer.y - mousePointTo.y * clampedScale;

    updateViewPort({ x: nextX, y: nextY, scale: clampedScale });
  };

  return (
    <main className="min-w-0 flex-1">
      <div ref={containerRef} className="w-full h-full relative">
        {stageSize.width > 0 && stageSize.height > 0 && (
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={onStageMouseDown}
            onMouseMove={onStageMouseMove}
            onMouseUp={onStageMouseUp}
            onWheel={onWheel}
          >
            <Layer listening={false}>
              <Rect x={0} y={0} width={stageSize.width} height={stageSize.height} fill="#f8fafc" />
            </Layer>
            <Layer>
              <Group x={viewPort.x} y={viewPort.y} scaleX={viewPort.scale} scaleY={viewPort.scale}>
                {shapes.map((shape) => {
                  switch (shape.type) {
                    case "rect":
                      return (
                        <RectNode
                          key={shape.id}
                          shape={shape}
                          isSelected={shape.id === selectedId}
                          onSelect={() => selectId(shape.id)}
                          onChange={updateShape}
                        />
                      );
                    case "circle":
                      return (
                        <CircleNode
                          key={shape.id}
                          shape={shape}
                          isSelected={shape.id === selectedId}
                          onSelect={() => selectId(shape.id)}
                          onChange={updateShape}
                        />
                      );
                    case "text":
                      return (
                        <TextNode
                          key={shape.id}
                          shape={shape}
                          isSelected={shape.id === selectedId}
                          onSelect={() => selectId(shape.id)}
                          onChange={updateShape}
                        />
                      );
                    case "image":
                      return (
                        <ImageNode
                          key={shape.id}
                          shape={shape}
                          isSelected={shape.id === selectedId}
                          onSelect={() => selectId(shape.id)}
                          onChange={updateShape}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </Group>
            </Layer>
          </Stage>
        )}
        <Zoom />
      </div>
    </main>
  );
}
