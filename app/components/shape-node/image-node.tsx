import type Konva from "konva";
import { useEffect, useState } from "react";
import { Image, Transformer } from "react-konva";
import type { ImageShape, ShapeBaseProps } from "./types";
import { useShapeRefRegistry } from "./useShapeRefRegistry";

type ImageNodeProps = ShapeBaseProps & {
  shape: ImageShape;
  onChange: (next: ImageShape) => void;
};

export default function ImageNode({ shape, isSelected, onSelect, onChange }: ImageNodeProps) {
  const { shapeRef, trRef } = useShapeRefRegistry<Konva.Image>(isSelected);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = shape.src;
    img.onload = () => {
      setImage(img);
    };
  }, [shape.src]);

  return (
    <>
      <Image
        ref={shapeRef}
        image={image ?? undefined}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        rotation={shape.rotation}
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
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(40, node.width() * scaleX),
            height: Math.max(40, node.height() * scaleY),
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} flipEnabled={false} />}
    </>
  );
}
