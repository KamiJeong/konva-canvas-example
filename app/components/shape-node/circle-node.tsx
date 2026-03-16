import type Konva from "konva";
import { Circle, Transformer } from "react-konva";
import type { CircleShape, ShapeBaseProps } from "./types";
import { useShapeRefRegistry } from "./useShapeRefRegistry";
import { round } from "./utils";

type CircleNodeProps = ShapeBaseProps & {
  shape: CircleShape;
  onChange: (next: CircleShape) => void;
};

export default function CircleNode({ shape, isSelected, onSelect, onChange }: CircleNodeProps) {
  const { shapeRef, trRef } = useShapeRefRegistry<Konva.Circle>(isSelected);

  return (
    <>
      <Circle
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        radius={shape.radius}
        fill={shape.fill}
        stroke={isSelected ? "#111827" : undefined}
        strokeWidth={isSelected ? 4 : 0}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shape,
            x: round(e.target.x()),
            y: round(e.target.y()),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const nextRadius = round(Math.max(10, node.radius() * Math.max(scaleX, scaleY)));

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shape,
            x: round(node.x()),
            y: round(node.y()),
            rotation: round(node.rotation(), 1),
            radius: nextRadius,
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} keepRatio flipEnabled={false} />}
    </>
  );
}
