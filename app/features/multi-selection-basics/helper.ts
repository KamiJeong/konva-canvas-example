import type { ShapeItem } from "~/components/shape-node";

type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const hasIntersection = (boxA: Box, boxB: Box) => {
  return !(
    boxB.x > boxA.x + boxA.width ||
    boxB.x + boxB.width < boxA.x ||
    boxB.y > boxA.y + boxA.height ||
    boxB.y + boxB.height < boxA.y
  );
};

export const getShapeBox = (shape: ShapeItem) => {
  switch (shape.type) {
    case "rect":
      return {
        x: shape.x,
        y: shape.y,
        width: shape.width,
        height: shape.height,
      };
    case "circle":
      return {
        x: shape.x - shape.radius,
        y: shape.y - shape.radius,
        width: shape.radius * 2,
        height: shape.radius * 2,
      };
    case "text":
      return {
        x: shape.x,
        y: shape.y,
        width: shape.width,
        height: shape.fontSize * 1.4,
      };
    default:
      return {
        x: shape.x,
        y: shape.y,
        width: shape.width,
        height: shape.height,
      };
  }
};
