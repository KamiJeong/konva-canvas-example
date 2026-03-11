import { NavLink } from "react-router";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          Use Konva for canvas rendering.
        </header>
        <div className="max-w-[700px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <ul>
              {resources.map(({ link, text }) => (
                <li key={link}>
                  <NavLink
                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                    to={link}
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

/**
 * 1. Render and Select Shapes
 * 2. Move, Resize, and Rotate
 * 3. Add and Manage Element
 * 4. Refactor The Shape Model
 * 5. Edit Text and Images
 * 6. Build Editor Side Panels
 * 7. Layer Order, Zoom, and Pan
 * 8. Multi-Selection Basics
 * 9. Save, Load, and Export
 * 10. Undo, Redo, and Refactoring
 * 11. Final Demo and Next Steps
 *
 * Render link and text
 */
const resources = [
  {
    link: "/konva/1-render-and-select-shapes",
    text: "1. Render and Select Shapes",
  },
  {
    link: "/konva/2-move-resize-and-rotate",
    text: "2. Move, Resize, and Rotate",
  },
  {
    link: "/konva/3-add-and-manage-element",
    text: "3. Add and Manage Element",
  },
  {
    link: "/konva/4-refactor-the-shape-model",
    text: "4. Refactor The Shape Model",
  },
  {
    link: "/konva/5-edit-text-and-images",
    text: "5. Edit Text and Images",
  },
  {
    link: "/konva/6-build-editor-side-panels",
    text: "6. Build Editor Side Panels",
  },
  {
    link: "/konva/7-layer-order-zoom-and-pan",
    text: "7. Layer Order, Zoom, and Pan",
  },
  {
    link: "/konva/8-multi-selection-basics",
    text: "8. Multi-Selection Basics",
  },
  {
    link: "/konva/9-save-load-and-export",
    text: "9. Save, Load, and Export",
  },
  {
    link: "/konva/10-undo-redo-and-refactoring",
    text: "10. Undo, Redo, and Refactoring",
  },
  {
    link: "/konva/11-final-demo-and-next-steps",
    text: "11. Final Demo and Next Steps",
  },
];
