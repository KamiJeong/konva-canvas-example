import type Konva from "konva";
import { Text, Transformer } from "react-konva";
import type { ShapeBaseProps, TextShape } from "./types";
import { useShapeRefRegistry } from "./useShapeRefRegistry";
import { round } from "./utils";

type TextNodeProps = ShapeBaseProps & {
  shape: TextShape;
  onChange: (next: TextShape) => void;
};

export default function TextNode({ shape, isSelected, onSelect, onChange }: TextNodeProps) {
  const { shapeRef, trRef } = useShapeRefRegistry<Konva.Text>(isSelected);

  return (
    <>
      <Text
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        text={shape.text}
        fontSize={shape.fontSize}
        fill={shape.fill}
        rotation={shape.rotation}
        opacity={isSelected ? 0.7 : 1}
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
        onTransform={() => {
          const node = shapeRef.current;
          if (!node) return;

          const nextWidth = round(Math.max(60, node.width() * node.scaleX()));

          node.setAttrs({
            width: nextWidth,
            scaleX: 1,
            scaleY: 1,
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;

          onChange({
            ...shape,
            x: round(node.x()),
            y: round(node.y()),
            width: round(node.width()),
            rotation: round(node.rotation(), 1),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          enabledAnchors={["middle-left", "middle-right"]}
        />
      )}
    </>
  );
}
