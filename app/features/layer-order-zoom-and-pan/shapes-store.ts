import { create } from "zustand";
import {
  createCircleShape,
  createId,
  createImageShape,
  createRectShape,
  createTextShape,
  type ShapeItem,
} from "~/components/shape-node";

type ShapeStoreState = {
  shapes: ShapeItem[];
  selectedId: string | null;
  viewPort: { x: number; y: number; scale: number };
};

type ShapeStoreAction = {
  selectId: (id: string | null) => void;

  updateShape: (nextShape: ShapeItem) => void;
  patchShape: (id: string, updates: Partial<ShapeItem>) => void;

  addShape: (newShape: ShapeItem) => void;
  createRect: () => void;
  createCircle: () => void;
  createText: () => void;
  createImage: (image: string) => void;

  copySelected: () => void;
  deleteSelected: () => void;

  moveShapeByOffset: (id: string, offset: number) => void;
  moveShapeToEdge: (id: string, direction: "front" | "back") => void;

  bringForwardShape: () => void;
  sendBackwardShape: () => void;
  bringToFrontShape: () => void;
  sendToBackShape: () => void;

  updateViewPort: (nextViewPort: Partial<ShapeStoreState["viewPort"]>) => void;
};

export const useShapesStore = create<ShapeStoreState & ShapeStoreAction>((set, get) => ({
  shapes: [],
  selectedId: null,
  viewPort: { x: 0, y: 0, scale: 1 },
  selectId: (id) => set(() => ({ selectedId: id })),

  updateShape: (nextShape) => {
    set((prev) => ({
      shapes: prev.shapes.map((shape) => (shape.id === nextShape.id ? nextShape : shape)),
    }));
  },
  patchShape: (id, updates) => {
    set((prev) => ({
      shapes: prev.shapes.map((shape) =>
        shape.id === id ? ({ ...shape, ...updates } as ShapeItem) : shape,
      ),
    }));
  },

  addShape: (newShape) => {
    set((prev) => ({ shapes: [...prev.shapes, newShape], selectedId: newShape.id }));
  },
  createRect: () => {
    get().addShape(createRectShape());
  },
  createCircle: () => {
    get().addShape(createCircleShape());
  },
  createText: () => {
    get().addShape(createTextShape());
  },
  createImage: (image) => {
    get().addShape(createImageShape(image));
  },

  copySelected: () => {
    const selectedId = get().selectedId;
    if (!selectedId) return;

    const target = get().shapes.find((shape) => shape.id === selectedId);
    if (!target) return;

    const copiedShape = {
      ...target,
      id: createId(),
      x: target.x + 20,
      y: target.y + 20,
    };
    get().addShape(copiedShape);
  },
  deleteSelected: () => {
    const selectedId = get().selectedId;
    if (!selectedId) return;
    set((prev) => ({
      shapes: prev.shapes.filter((shape) => shape.id !== selectedId),
      selectedId: null,
    }));
  },

  moveShapeByOffset: (id, offset) => {
    set((prev) => {
      const index = prev.shapes.findIndex((shape) => shape.id === id);
      if (index < 0) return prev;

      const newIndex = index + offset;
      if (newIndex < 0 || newIndex >= prev.shapes.length) return prev;

      const newShapes = [...prev.shapes];
      const [movedShape] = newShapes.splice(index, 1);
      newShapes.splice(newIndex, 0, movedShape);
      return {
        shapes: newShapes,
      };
    });
  },
  moveShapeToEdge: (id, direction) => {
    set((prev) => {
      const index = prev.shapes.findIndex((shape) => shape.id === id);
      if (index < 0) return prev;

      const newShapes = [...prev.shapes];
      const [movedShape] = newShapes.splice(index, 1);

      if (direction === "front") {
        newShapes.push(movedShape);
      } else {
        newShapes.unshift(movedShape);
      }

      return {
        shapes: newShapes,
      };
    });
  },

  bringForwardShape: () => {
    const selectedId = get().selectedId;
    if (!selectedId) return;
    get().moveShapeByOffset(selectedId, 1);
  },
  sendBackwardShape: () => {
    const selectedId = get().selectedId;
    if (!selectedId) return;
    get().moveShapeByOffset(selectedId, -1);
  },
  bringToFrontShape: () => {
    const selectedId = get().selectedId;
    if (!selectedId) return;
    get().moveShapeToEdge(selectedId, "front");
  },
  sendToBackShape: () => {
    const selectedId = get().selectedId;
    if (!selectedId) return;
    get().moveShapeToEdge(selectedId, "back");
  },

  updateViewPort: (nextViewPort) =>
    set((prev) => ({ viewPort: { ...prev.viewPort, ...nextViewPort } })),
}));
