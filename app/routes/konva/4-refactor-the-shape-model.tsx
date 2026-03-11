import RefactorTheShapeModel from "~/features/RefactorTheShapeModel";
import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "4. Refactor The" }, { name: "description", content: "let's learn Konva!!" }];
}

export default function Page() {
  return <RefactorTheShapeModel />;
}
