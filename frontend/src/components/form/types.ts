import { Control, FieldPath, FieldValues } from "react-hook-form";
import { OutlinedInputProps, SxProps } from "@mui/material";

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = OutlinedInputProps & {
  control: Control<TFieldValues>;
  id?: string;
  label?: string;
  name: TName;
  helperText?: string;
  placeholder?: string;
  containerSx?: SxProps;
};
