import type { Route } from "./../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "11. Final Demo And Next Steps" },
    { name: "description", content: "let's learn Konva!!" },
  ];
}

export default function Page() {
  return <div>Page</div>;
}
