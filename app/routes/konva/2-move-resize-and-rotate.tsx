import MoveResizeAndRotate from "~/features/MoveResizeAndRotate";
import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "2. Move Resize And Rotate" },
    { name: "description", content: "let's learn Konva!!" },
  ];
}

export default function Page() {
  return <MoveResizeAndRotate />;
}
