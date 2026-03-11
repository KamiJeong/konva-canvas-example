import type Konva from "konva";
import { Rect, Transformer } from "react-konva";
import type { RectShape, ShapeBaseProps } from "./types";
import { useShapeRefRegistry } from "./useShapeRefRegistry";

type RectNodeProps = ShapeBaseProps & {
  shape: RectShape;
  onChange: (next: RectShape) => void;
};

export default function RectNode({ shape, isSelected, onSelect, onChange }: RectNodeProps) {
  const { shapeRef, trRef } = useShapeRefRegistry<Konva.Rect>(isSelected);

  return (
    <>
      <Rect
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        fill={shape.fill}
        stroke={isSelected ? "#111827" : undefined}
        strokeWidth={isSelected ? 4 : 0}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shape,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} flipEnabled={false} />}
    </>
  );
}
