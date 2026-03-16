import { type ForwardedRef, forwardRef, type InputHTMLAttributes, useId } from "react";

type ColorControlProps = InputHTMLAttributes<HTMLInputElement> & { label?: string };

const ColorControl = forwardRef<HTMLInputElement, ColorControlProps>(
  ({ type, label, ...props }: ColorControlProps, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();

    return (
      <label htmlFor={`control-${id}`} className="block">
        <div className="mb-1 text-xs text-slate-500">{label}</div>
        <input
          id={`control-${id}`}
          ref={ref}
          type="color"
          {...props}
          className="w-[50px] h-[50px] p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
      </label>
    );
  },
);

export default ColorControl;
