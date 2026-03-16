import { type ForwardedRef, forwardRef, type InputHTMLAttributes, useId } from "react";

type TextControlProps = InputHTMLAttributes<HTMLInputElement> & { label?: string };

const TextControl = forwardRef<HTMLInputElement, TextControlProps>(
  ({ type, label, ...props }: TextControlProps, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();

    return (
      <label htmlFor={`control-${id}`} className="block">
        <div className="mb-1 text-xs text-slate-500">{label}</div>
        <input
          ref={ref}
          id={`control-${id}`}
          type="text"
          {...props}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-400"
        />
      </label>
    );
  },
);

export default TextControl;
