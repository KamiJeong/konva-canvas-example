import type { PropsWithChildren } from "react";

type LeftPanelProps = PropsWithChildren;

export default function LeftPanel({ children }: LeftPanelProps) {
  return <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">{children}</aside>;
}
