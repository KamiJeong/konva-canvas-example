import { index, prefix, type RouteConfig, route } from "@react-router/dev/routes";

const KONVA_ROUTES = [
  "/konva/1-render-and-select-shapes",
  "/konva/2-move-resize-and-rotate",
  "/konva/3-add-and-manage-element",
  "/konva/4-refactor-the-shape-model",
  "/konva/5-edit-text-and-images",
  "/konva/6-build-editor-side-panels",
  "/konva/7-layer-order-zoom-and-pan",
  "/konva/8-multi-selection-basics",
  "/konva/9-save-load-and-export",
  "/konva/10-undo-redo-and-refactoring",
  "/konva/11-final-demo-and-next-steps",
];

export default [
  index("routes/home.tsx"),
  ...prefix(
    "konva",
    KONVA_ROUTES.map((link) => route(link.replace("/konva/", ""), `routes${link}.tsx`)),
  ),
] satisfies RouteConfig;
