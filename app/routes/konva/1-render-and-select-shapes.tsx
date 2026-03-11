import RenderAndSelectShapes from "~/features/RenderAndSelectShapes";
import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "1. Render And Select Shapes" },
    { name: "description", content: "let's learn Konva!!" },
  ];
}

export default function Page() {
  return <RenderAndSelectShapes />;
}
