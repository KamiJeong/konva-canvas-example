import type Konva from "konva";
import { useRef } from "react";
import { Group, Layer, Rect, Stage } from "react-konva";
import { CircleNode, ImageNode, RectNode, TextNode } from "~/components/shape-node";
import { getShapeBox, hasIntersection } from "~/features/multi-selection-basics/helper";
import { useStageSize } from "~/hooks/useStageSize";
import { useShapesStore } from "./shapes-store";
import Zoom from "./zoom";

export default function MainCanvasArea() {
  const { containerRef, stageSize } = useStageSize();
  const {
    shapes,
    selectionBox,
    selectedIds,
    selectBlank,
    selectShapes,
    selectSingleShape,
    updateSelectionBox,
    updateShape,
    viewPort,
    updateViewPort,
  } = useShapesStore();

  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const selectionStartRef = useRef({ x: 0, y: 0 });

  const onStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // clicked on stage - clear selection
    const clickedOnEmpty = e.target === e.target.getStage();
    if (!clickedOnEmpty) return;

    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (!pointer) return;

    selectionStartRef.current = { x: pointer.x, y: pointer.y };
    updateSelectionBox({
      visible: true,
      x: pointer.x,
      y: pointer.y,
      width: 0,
      height: 0,
    });
  };

  const onStageMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!selectionBox.visible) return;

    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (!pointer) return;

    const startX = selectionStartRef.current.x;
    const startY = selectionStartRef.current.y;

    updateSelectionBox({
      visible: true,
      x: Math.min(startX, pointer.x),
      y: Math.min(startY, pointer.y),
      width: Math.abs(pointer.x - startX),
      height: Math.abs(pointer.y - startY),
    });
  };

  const onStageMouseUp = () => {
    if (!selectionBox.visible) return;

    const selected = shapes
      .filter((shape) => hasIntersection(selectionBox, getShapeBox(shape)))
      .map((shape) => shape.id);

    selectShapes(selected);
    updateSelectionBox({
      visible: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
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
                          isSelected={selectedIds.includes(shape.id)}
                          onSelect={() => selectSingleShape(shape.id)}
                          onChange={updateShape}
                        />
                      );
                    case "circle":
                      return (
                        <CircleNode
                          key={shape.id}
                          shape={shape}
                          isSelected={selectedIds.includes(shape.id)}
                          onSelect={() => selectSingleShape(shape.id)}
                          onChange={updateShape}
                        />
                      );
                    case "text":
                      return (
                        <TextNode
                          key={shape.id}
                          shape={shape}
                          isSelected={selectedIds.includes(shape.id)}
                          onSelect={() => selectSingleShape(shape.id)}
                          onChange={updateShape}
                        />
                      );
                    case "image":
                      return (
                        <ImageNode
                          key={shape.id}
                          shape={shape}
                          isSelected={selectedIds.includes(shape.id)}
                          onSelect={() => selectSingleShape(shape.id)}
                          onChange={updateShape}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </Group>
            </Layer>
            <Layer listening={false}>
              {selectionBox.visible && (
                <Rect
                  x={selectionBox.x}
                  y={selectionBox.y}
                  width={selectionBox.width}
                  height={selectionBox.height}
                  fill="rgba(59, 130, 246, 0.12)"
                  stroke="#3b82f6"
                  strokeWidth={1}
                  dash={[4, 4]}
                  listening={false}
                />
              )}
            </Layer>
          </Stage>
        )}
        <Zoom />
      </div>
    </main>
  );
}
