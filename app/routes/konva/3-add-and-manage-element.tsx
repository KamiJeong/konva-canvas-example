import AddAndManageElement from "~/features/AddAndManageElement";
import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "3. Add And Manage Element" },
    { name: "description", content: "let's learn Konva!!" },
  ];
}

export default function Page() {
  return <AddAndManageElement />;
}
