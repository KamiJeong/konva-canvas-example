import type Konva from "konva";
import { useEffect, useRef } from "react";

type AllowedShapeTypes = Konva.Rect | Konva.Circle | Konva.Text;

export const useRefRegistry = <T extends AllowedShapeTypes>(isSelected: boolean) => {
  const shapeRef = useRef<T>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (!isSelected || !shapeRef.current || !trRef.current) return;
    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer()?.batchDraw();
  }, [isSelected]);

  return {
    shapeRef,
    trRef,
  };
};
