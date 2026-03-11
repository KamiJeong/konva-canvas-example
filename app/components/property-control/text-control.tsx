import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from "react";

type TextControlProps = InputHTMLAttributes<HTMLInputElement>;

function TextControlBase(
  { type, ...props }: TextControlProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      type="text"
      {...props}
      className="border-1 border-slate-400 p-1 text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:border-slate-300 disabled:text-slate-300"
    />
  );
}

const TextControl = forwardRef(TextControlBase);

export default TextControl;
