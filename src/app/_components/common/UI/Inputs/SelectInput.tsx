import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FiAlertTriangle, FiCheck, FiChevronUp } from "react-icons/fi";

import { cn } from "utils/cn";

type Option = {
  value: string;
  label: string;
};

type BaseProps = {
  options: Option[];
  display?: string;
  className?: {
    label?: string;
    wrapper?: string;
    button?: string;
  };
  label?: string;
  helperText?: string;
  error?: boolean;
  variant?: "default" | "cms";
};

export type SelectInputProps =
  | ({
      value: string;
      onChange: (value: string) => void;
      multiple?: false;
    } & BaseProps)
  | ({
      value: string[];
      onChange: (value: string[]) => void;
      multiple: true;
    } & BaseProps);

export function SelectInput(props: SelectInputProps) {
  const {
    value,
    onChange,
    options,
    display = "",
    multiple,
    label,
    helperText,
    error,
    className = {},
    variant = "default",
  } = props;

  const { label: labelClassName, wrapper, button } = className;

  let displayValue = display;
  if (multiple) {
    const activeOptionsLabel = options
      .filter((i) => value.includes(i.value))
      .map((i) => i.label)
      .join(", ");
    if (activeOptionsLabel) displayValue = activeOptionsLabel;
  } else {
    const activeOptionLabel = options.find((i) => i.value === value)?.label;
    if (activeOptionLabel) displayValue = activeOptionLabel;
  }

  return (
    <div className={cn("flex flex-col gap-y-1", wrapper)}>
      {label && (
        <label
          className={cn(
            "text-sm font-medium",
            { "text-lime-900": variant === "cms" },
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} multiple={multiple}>
        <div className={"relative"}>
          <ListboxButton className={"w-full outline-none"}>
            {({ open, active }) => (
              <>
                <div
                  className={cn(
                    "flex flex-nowrap items-center rounded-lg border px-3 py-[11px] transition-colors",
                    {
                      "border-ok_main-500 bg-ok_main-50 text-ok_main-600":
                        variant === "default",
                      "border-ok_main-900": active && variant === "default",
                      "hover:border-ok_main-400":
                        !active && variant === "default",
                    },
                    {
                      "border-lime-700 bg-ok_main-50 text-lime-800":
                        variant === "cms",
                      "border-lime-800": active && variant === "cms",
                      "hover:border-lime-600": !active && variant === "cms",
                    },
                    {
                      "border-red-500": error,
                    },
                    button,
                  )}
                >
                  <span
                    className={cn(
                      "line-clamp-1 flex-1 whitespace-nowrap text-left",
                    )}
                  >
                    {displayValue}
                  </span>
                  <FiChevronUp
                    className={cn(
                      "size-5 transform select-none stroke-ok_main-700 transition duration-300",
                      {
                        "rotate-180": open,
                        "stroke-lime-700": variant === "cms",
                      },
                    )}
                  />
                </div>
              </>
            )}
          </ListboxButton>

          <ListboxOptions
            anchor={"bottom start"}
            transition
            className={cn(
              "z-[1000] !max-h-56 w-[var(--button-width)] min-w-fit origin-top divide-y-[1px] rounded-lg border transition duration-300 ease-out [--anchor-gap:4px] focus:outline-none data-[closed]:scale-95 data-[open]:scale-100 data-[closed]:opacity-0",
              {
                "divide-ok_main-900 border-ok_main-900 bg-ok_main-50 text-ok_main-600":
                  variant === "default",
                "divide-lime-800 border-lime-800 bg-ok_main-50 text-lime-800":
                  variant === "cms",
              },
            )}
          >
            {options.map((i) => (
              <ListboxOption
                key={i.value}
                value={i.value}
                className={"overflow-x-hidden"}
              >
                {({ focus, selected }) => (
                  <div
                    className={cn(
                      "flex cursor-pointer select-none items-center justify-between gap-x-2 text-nowrap px-3 py-[11px]",
                      {
                        "bg-ok_orange-300/30": focus && variant === "default",
                        "bg-ok_orange-400 text-white":
                          selected && variant === "default",
                      },
                      {
                        "bg-lime-100/80": focus && variant === "cms",
                        "bg-lime-600 text-white": selected && variant === "cms",
                      },
                    )}
                  >
                    <span className={"truncate"}>{i.label}</span>
                    {selected && <FiCheck className={"size-5 shrink-0"} />}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {helperText && (
        <p
          className={cn("flex items-center gap-x-2 text-xs font-semibold", {
            "text-red-500": error,
            "text-gray-700": !error,
          })}
        >
          <FiAlertTriangle className={"size-4 stroke-[2.5px]"} />
          {helperText}
        </p>
      )}
    </div>
  );
}
