import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ActionButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function ActionButton({ type = "button", children, ...props }: ActionButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className="border-1 border-slate-400 p-1 text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:border-slate-300 disabled:text-slate-300"
    >
      {children}
    </button>
  );
}
