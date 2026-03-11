import type { ImageShape } from "~/components/shape-node/types";
import type { CircleShape, RectShape, TextShape } from "~/types/canvas-shape";

export const createId = () => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const createRectShape = (): RectShape => ({
  id: createId(),
  type: "rect",
  x: 120,
  y: 120,
  width: 160,
  height: 100,
  fill: "#3b82f6",
  rotation: 0,
});

export const createCircleShape = (): CircleShape => ({
  id: createId(),
  type: "circle",
  x: 220,
  y: 180,
  radius: 50,
  fill: "#10b981",
  rotation: 0,
});

export const createTextShape = (): TextShape => ({
  id: createId(),
  type: "text",
  x: 160,
  y: 240,
  width: 220,
  text: "New Text",
  fontSize: 28,
  fill: "#111827",
  rotation: 0,
});

export const createImageShape = (src: string): ImageShape => ({
  id: createId(),
  type: "image",
  x: 180,
  y: 180,
  width: 240,
  height: 180,
  fill: "",
  rotation: 0,
  src,
});
