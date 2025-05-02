import { clsx } from "clsx";
import { forwardRef, useId, useState } from "react";

import { cn } from "utils/cn";

type BaseProps = {
  label?: string;
  className?: {
    label?: string;
    inputWrapper?: string;
    input?: string;
    container?: string;
  };
  helperText?: string;
  error?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variants?: "primary" | "cms";
};

export type TextInputProps =
  | ({
      multiline?: false;
    } & BaseProps &
      Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">)
  | ({
      multiline: true;
    } & BaseProps &
      Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className">);

export const TextInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextInputProps
>((props, ref) => {
  const {
    label,
    className,
    helperText,
    error,
    startAdornment,
    endAdornment,
    multiline = false,
    variants = "primary",
    ...inputProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  const Component = multiline ? "textarea" : "input";

  return (
    <div className={cn("flex flex-col gap-y-1", className?.container)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            { "text-lime-900": variants === "cms" },
            className?.label,
          )}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex flex-nowrap items-center overflow-hidden rounded-lg border bg-ok_main-50 text-ok_main-600 transition-colors duration-300",

          {
            "border-ok_main-500 hover:border-ok_main-400":
              !isFocused && !error && variants === "primary",
            "border-ok_main-900": isFocused && !error && variants === "primary",

            "border-lime-700 hover:border-lime-600":
              !isFocused && !error && variants === "cms",
            "border-lime-800": isFocused && !error && variants === "cms",
            "text-lime-800": variants === "cms",

            "border-red-500": error,
          },
          className?.inputWrapper,
        )}
      >
        {startAdornment && <div className={"pl-3"}>{startAdornment}</div>}

        <Component
          id={id}
          className={cn(
            "block flex-1 bg-transparent px-3 py-2.5 caret-ok_main-700 outline-none placeholder:text-ok_main-700/30",
            {
              "caret-lime-700 outline-none placeholder:text-lime-700/40":
                variants === "cms",
            },
            { "min-h-40": multiline },
            className?.input,
          )}
          // @ts-expect-error ref discrimination error
          ref={ref}
          // @ts-expect-error ref discrimination error
          type={multiline ? undefined : (inputProps.type ?? "text")}
          {...{
            ...inputProps,
            onFocus: (e) => {
              // @ts-expect-error ref discrimination error
              inputProps?.onFocus?.(e);
              setIsFocused(true);
            },
            onBlur: (e) => {
              // @ts-expect-error ref discrimination error
              inputProps?.onBlur?.(e);
              setIsFocused(false);
            },
          }}
        />

        {endAdornment && <div className={"pr-3"}>{endAdornment}</div>}
      </div>

      {helperText && (
        <p
          className={clsx("text-sm", {
            "text-red-500": error,
            "text-gray-500": !error,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

TextInput.displayName = "TextInput";
