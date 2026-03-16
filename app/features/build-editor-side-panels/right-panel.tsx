import type { PropsWithChildren } from "react";

type RightPanelProps = PropsWithChildren;

export default function RightPanel({ children }: RightPanelProps) {
  return <aside className="w-80 shrink-0 border-l border-slate-200 bg-white">{children}</aside>;
}
