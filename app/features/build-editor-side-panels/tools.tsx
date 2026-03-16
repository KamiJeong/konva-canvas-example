import type { MouseEventHandler, PropsWithChildren } from "react";
import { ActionButton } from "~/components/action-button";

type ToolsProps = PropsWithChildren<{
  actions: {
    name: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }[];
}>;

export default function ({ actions }: ToolsProps) {
  return (
    <div className="border-b border-slate-200 p-4">
      <h2 className="text-sm font-semibold text-slate-700">Tools</h2>
      <div className="mt-3 space-y-2">
        {actions.map((action) => (
          <ActionButton key={action.name} type="button" onClick={action.onClick}>
            {action.name}
          </ActionButton>
        ))}
      </div>
    </div>
  );
}
