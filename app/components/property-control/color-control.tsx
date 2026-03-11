import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from "react";

type ColorControlProps = InputHTMLAttributes<HTMLInputElement>;

function ColorControlBase(
  { type, ...props }: ColorControlProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      type="color"
      {...props}
      className="border-1 border-slate-400 p-1 text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:border-slate-300 disabled:text-slate-300"
    />
  );
}

const ColorControl = forwardRef(ColorControlBase);

export default ColorControl;
