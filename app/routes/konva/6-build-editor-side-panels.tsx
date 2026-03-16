import BuildEditorSidePanels from "~/features/build-editor-side-panels";
import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "6. Build Editor Side Panels" },
    { name: "description", content: "let's learn Konva!!" },
  ];
}

export default function Page() {
  return <BuildEditorSidePanels />;
}
