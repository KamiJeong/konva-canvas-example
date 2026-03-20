import LayerOrderZoomAndPan from "~/features/layer-order-zoom-and-pan";
import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "7. Layer Order Zoom And Pan" },
    { name: "description", content: "let's learn Konva!!" },
  ];
}

export default function Page() {
  return <LayerOrderZoomAndPan />;
}
