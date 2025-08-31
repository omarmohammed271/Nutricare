import { Checkbox, CheckboxProps, FormControlLabel, SxProps } from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export type CheckboxInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = CheckboxProps & {
  control: Control<TFieldValues>;
  id?: string;
  label?: string;
  name: TName;
  labelSx?: SxProps;
};

const CheckboxInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  id,
  name,
  label,
  labelSx,
  ...other
}: CheckboxInputProps<TFieldValues>) => {
  return (
    <Controller<TFieldValues, TName>
      control={control}
      render={({ field, fieldState }) => (
        <FormControlLabel control={<Checkbox id={id ?? name} {...other} {...field} />} sx={labelSx} label={label} />
      )}
      name={name as TName}
    />
  );
};

export default CheckboxInput;
