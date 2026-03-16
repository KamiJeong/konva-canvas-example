import type Konva from "konva";
import { Layer, Stage } from "react-konva";
import { CircleNode, ImageNode, RectNode, type ShapeItem, TextNode } from "~/components/shape-node";
import { useStageSize } from "~/hooks/useStageSize";

type MainCanvasAreaProps = {
  shapes?: ShapeItem[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onStageMouseDown?: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onUpdateShape: (shape: ShapeItem) => void;
};

export default function MainCanvasArea({
  shapes = [],
  selectedId,
  onSelect,
  onStageMouseDown,
  onUpdateShape,
}: MainCanvasAreaProps) {
  const { containerRef, stageSize } = useStageSize();

  return (
    <main className="min-w-0 flex-1">
      <div ref={containerRef} className="w-full h-full">
        {stageSize.width > 0 && stageSize.height > 0 && (
          <Stage width={stageSize.width} height={stageSize.height} onMouseDown={onStageMouseDown}>
            <Layer>
              {shapes.map((shape) => {
                switch (shape.type) {
                  case "rect":
                    return (
                      <RectNode
                        key={shape.id}
                        shape={shape}
                        isSelected={shape.id === selectedId}
                        onSelect={() => onSelect?.(shape.id)}
                        onChange={onUpdateShape}
                      />
                    );
                  case "circle":
                    return (
                      <CircleNode
                        key={shape.id}
                        shape={shape}
                        isSelected={shape.id === selectedId}
                        onSelect={() => onSelect?.(shape.id)}
                        onChange={onUpdateShape}
                      />
                    );
                  case "text":
                    return (
                      <TextNode
                        key={shape.id}
                        shape={shape}
                        isSelected={shape.id === selectedId}
                        onSelect={() => onSelect?.(shape.id)}
                        onChange={onUpdateShape}
                      />
                    );
                  case "image":
                    return (
                      <ImageNode
                        key={shape.id}
                        shape={shape}
                        isSelected={shape.id === selectedId}
                        onSelect={() => onSelect?.(shape.id)}
                        onChange={onUpdateShape}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </Layer>
          </Stage>
        )}
      </div>
    </main>
  );
}
