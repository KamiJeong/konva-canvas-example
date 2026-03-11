import EditTextAndImages from "~/features/EditTextAndImages";
import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "5. Edit Text And Images" },
    { name: "description", content: "let's learn Konva!!" },
  ];
}

export default function Page() {
  return <EditTextAndImages />;
}
