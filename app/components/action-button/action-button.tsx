import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ActionButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function ActionButton({
  type = "button",
  children,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={[
        "flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-left transition text-slate-600",
        "hover:border-slate-300 hover:bg-slate-50",
        "active:scale-[0.99]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
