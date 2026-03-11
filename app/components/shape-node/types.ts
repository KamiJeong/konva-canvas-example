export type ShapeType = "rect" | "circle" | "text" | "image";

export type BaseShape<T extends ShapeType> = {
  id: string;
  type: T;
  x: number;
  y: number;
  rotation: number;
  fill: string;
};

export type RectShape = BaseShape<"rect"> & {
  width: number;
  height: number;
};

export type CircleShape = BaseShape<"circle"> & {
  radius: number;
};

export type TextShape = BaseShape<"text"> & {
  width: number;
  text: string;
  fontSize: number;
};

export type ImageShape = BaseShape<"image"> & {
  width: number;
  height: number;
  src: string;
};

export type ShapeItem = RectShape | CircleShape | TextShape | ImageShape;

export type ShapeBaseProps = {
  isSelected: boolean;
  onSelect: () => void;
};
