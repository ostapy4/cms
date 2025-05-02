import { path } from "ramda";
import {
  Controller,
  FieldError,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

import { NumberInput, NumberInputProps } from "app/_components/common/UI";

export type FormNumberInputProps<T> = {
  fieldName: Path<T>;
} & NumberInputProps;

export function FormNumberInput<T extends FieldValues>(
  props: FormNumberInputProps<T>,
) {
  const { fieldName, ...textInputProps } = props;
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, formState: { errors } }) => {
        const error = path<FieldError>(fieldName.split("."), errors);

        return (
          <NumberInput
            {...textInputProps}
            {...field}
            onChange={(e) => {
              field.onChange(parseInt(e.target.value));
            }}
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
}
