import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from "react";

type NumberControlProps = InputHTMLAttributes<HTMLInputElement>;

function NumberControlBase(
  { type, ...props }: NumberControlProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      type="number"
      {...props}
      className="border-1 border-slate-400 p-1 text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:border-slate-300 disabled:text-slate-300"
    />
  );
}

const NumberControl = forwardRef(NumberControlBase);

export default NumberControl;
