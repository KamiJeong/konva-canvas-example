import MultiSelectionBasics from "~/features/multi-selection-basics";
import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "8. Multi Selection Basics" },
    { name: "description", content: "let's learn Konva!!" },
  ];
}

export default function Page() {
  return <MultiSelectionBasics />;
}
