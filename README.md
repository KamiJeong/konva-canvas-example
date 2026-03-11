# Konva Canvas Example

This project is a step-by-step `Konva` + `react-konva` example built with React Router and TypeScript.

Right now, the implemented part of the tutorial goes up to `5. Edit Text And Images`.
After that, routes `6` to `11` are defined as placeholders for the next stages.

It is not a single polished editor yet. It is closer to a learning playground that walks through the main pieces you need to build a canvas editor:

- rendering shapes
- selecting nodes
- dragging, resizing, and rotating
- managing shape state
- editing text and images
- building side panels
- zooming and panning
- multi-selection
- save/load/export ideas
- undo/redo and refactoring

## What You Can Learn

By reading and running this project, you can learn how to:

- use `Stage`, `Layer`, and shape components from `react-konva`
- keep canvas data in React state
- connect Konva nodes to `Transformer`
- update shape data after drag or transform
- separate shape rendering into reusable components
- organize a small editor with controls and feature modules
- think about editor features in incremental steps instead of building everything at once

## Tech Stack

- React 19
- React Router 7
- TypeScript
- Konva
- react-konva
- Vite
- Biome

## Getting Started

### 1. Install dependencies

This project uses `bun`.

```bash
bun install
```

### 2. Start the development server

```bash
bun run dev
```

Open:

```text
http://localhost:5173
```

### 3. Useful commands

```bash
bun run dev
bun run build
bun run start
bun run typecheck
bun run lint
bun run format
bun run check
```

## Current Progress

Implemented now:

- `1. Render And Select Shapes`
- `2. Move Resize And Rotate`
- `3. Add And Manage Element`
- `4. Refactor The Shape Model`
- `5. Edit Text And Images`

Planned next, but not implemented yet:

- `6. Build Editor Side Panels`
- `7. Layer Order Zoom And Pan`
- `8. Multi Selection Basics`
- `9. Save Load And Export`
- `10. Undo Redo And Refactoring`
- `11. Final Demo And Next Steps`

## Learning Route Map

The Konva examples live under `/konva/*`.

1. `/konva/1-render-and-select-shapes`
   Render basic shapes and handle selection.
2. `/konva/2-move-resize-and-rotate`
   Add dragging and `Transformer` behavior.
3. `/konva/3-add-and-manage-element`
   Add new elements and manage them in state.
4. `/konva/4-refactor-the-shape-model`
   Move toward a cleaner shared shape model.
5. `/konva/5-edit-text-and-images`
   Handle editable text and image-related cases.
6. `/konva/6-build-editor-side-panels`
   Placeholder route for the next editor UI step.
7. `/konva/7-layer-order-zoom-and-pan`
   Placeholder route for canvas navigation and ordering.
8. `/konva/8-multi-selection-basics`
   Placeholder route for multi-selection work.
9. `/konva/9-save-load-and-export`
   Placeholder route for persistence and export.
10. `/konva/10-undo-redo-and-refactoring`
    Placeholder route for history and cleanup work.
11. `/konva/11-final-demo-and-next-steps`
    Placeholder route for the final wrap-up.

## Project Structure

```text
app/
  components/
    action-button/
    property-control/
    shape-node/
  features/
    RenderAndSelectShapes.tsx
    MoveResizeAndRotate.tsx
    AddAndManageElement.tsx
    RefactorTheShapeModel.tsx
    EditTextAndImages.tsx
  routes/
    home.tsx
    konva/
  hooks/
  types/
  utils/
```

## Where To Read First

If you want the fastest path through the codebase, start here:

- `app/routes.ts`
  shows the ordered lesson routes
- `app/routes/konva/1-render-and-select-shapes.tsx`
  the first example page
- `app/features/RenderAndSelectShapes.tsx`
  basic shape rendering and selection logic
- `app/features/MoveResizeAndRotate.tsx`
  dragging and transform handling
- `app/features/EditTextAndImages.tsx`
  the current most advanced implemented example
- `app/components/shape-node/*`
  reusable shape rendering pieces

## Notes

- The home page still looks like the default starter in places, so the real learning content is under the `/konva/*` routes.
- Routes `6` to `11` currently render simple placeholder pages, so the practical learning content currently ends at `5. Edit Text And Images`.
- This repo is best used as a reference project for learning and experimentation.
- Some parts are intentionally incremental and may still be rough while the editor ideas are being explored.

## Suggested Next Improvements

If you continue this project, useful next steps would be:

- add a better home page that links to every lesson
- add image upload examples
- add keyboard shortcuts for delete, duplicate, and undo/redo
- add JSON import/export with validation
- add tests for shape state updates and editor interactions
