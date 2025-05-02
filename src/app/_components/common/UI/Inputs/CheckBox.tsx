import { Checkbox, Field, Label, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";

export type CheckBoxProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export const CheckBoxInput = (props: CheckBoxProps) => {
  const { label, value, onChange } = props;

  return (
    <Field
      className={"flex flex-row-reverse items-center gap-x-3 text-ok_main-600"}
    >
      <Label
        className={"flex-1 first-letter:uppercase data-[disabled]:opacity-50"}
      >
        {label}
      </Label>
      <Checkbox
        checked={value}
        onChange={onChange}
        className={
          "group flex size-5 items-center justify-center rounded-md bg-ok_main-100 transition-all duration-75 data-[disabled]:cursor-not-allowed data-[checked]:bg-ok_orange-400 data-[checked]:data-[disabled]:bg-gray-500 data-[disabled]:opacity-50"
        }
      >
        {({ checked }) => (
          <Transition
            show={checked}
            enter={"transition duration-75 ease-out"}
            enterFrom={"transform scale-0 opacity-0"}
            enterTo={"transform scale-100 opacity-100"}
            leave={"transition duration-75 ease-out"}
            leaveFrom={"transform scale-100 opacity-100"}
            leaveTo={"transform scale-0 opacity-0"}
          >
            <FaCheck className={"text-white"} />
          </Transition>
        )}
      </Checkbox>
    </Field>
  );
};

CheckBoxInput.displayName = "CheckBoxInput";
