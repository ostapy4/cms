import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FiCheck, FiChevronUp } from "react-icons/fi";

import { cn } from "utils/cn";

type Option = {
  value: string;
  label: string;
};

type BaseProps = {
  options: Option[];
  display?: string;
  className?: {
    button?: string;
  };
  label?: string;
  helperText?: string;
  error?: boolean;
};

export type SortSelectInputProps = {
  value: string;
  onChange: (value: string) => void;
} & BaseProps;

export function SortSelectInput(props: SortSelectInputProps) {
  const { value, onChange, options, display = "", className = {} } = props;

  const { button } = className;

  return (
    <Listbox value={value} onChange={onChange}>
      <ListboxButton className={"w-full outline-none"}>
        {({ open, active }) => (
          <>
            <div
              className={cn(
                "flex flex-nowrap items-center gap-x-1.5 rounded-lg border border-ok_main-500 bg-ok_main-50 px-3 py-1.5 text-ok_main-600 transition-colors",
                {
                  "border-ok_main-900": active,
                  "hover:border-ok_main-400": !active,
                },
                button,
              )}
            >
              <span
                className={
                  "line-clamp-1 flex-1 whitespace-nowrap text-left text-sm font-medium"
                }
              >
                {display}
              </span>
              <FiChevronUp
                className={cn(
                  "size-4 transform select-none stroke-ok_main-700 transition duration-300",
                  {
                    "rotate-180": open,
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
        className={
          "z-[1000] !max-h-56 w-[var(--button-width)] min-w-fit origin-top divide-y-[1px] divide-ok_main-900 rounded-lg border border-ok_main-900 bg-ok_main-50 text-ok_main-600 transition duration-300 ease-out [--anchor-gap:4px] focus:outline-none data-[closed]:scale-95 data-[open]:scale-100 data-[closed]:opacity-0"
        }
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
                  "flex cursor-pointer select-none items-center justify-between gap-x-2 text-nowrap px-3 py-1.5 text-sm",
                  {
                    "bg-ok_orange-300/30": focus,
                    "bg-ok_orange-400 text-white": selected,
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
    </Listbox>
  );
}
