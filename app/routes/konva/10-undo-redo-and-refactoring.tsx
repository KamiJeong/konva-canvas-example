import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "10. Undo Redo And Refactoring" },
    { name: "description", content: "let's learn Konva!!" },
  ];
}

export default function Page() {
  return <div>Page</div>;
}
