import { Box, FormHelperText, InputLabel, OutlinedInput, Select } from "@mui/material";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { FormInputProps } from "./types";
import { ReactNode } from "react";

type SelectProps = {
  children: ReactNode;
};

const SelectInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  children,
  id,
  label,
  name,
  helperText,
  containerSx,
  ...other
}: FormInputProps<TFieldValues> & SelectProps) => {
  return (
    <Controller<TFieldValues, TName>
      control={control}
      render={({ field, fieldState }) => (
        <Box sx={containerSx}>
          <InputLabel htmlFor={id ?? name} style={{ fontWeight: "medium" }} error={fieldState.error != null}>
            {label}
          </InputLabel>
          <Select
            size="small"
            id={id ?? name}
            {...other}
            {...field}
            sx={{ width: "100%", mt: 1, "& > .MuiSelect-outlined": { py: "10px" } }}
            error={fieldState.error != null}
            inputProps={{ style: { padding: "10px 12px" } }}>
            {children}
          </Select>
          {(helperText || fieldState.error?.message) && (
            <FormHelperText error={fieldState.error != null}>{fieldState.error?.message ?? helperText}</FormHelperText>
          )}
        </Box>
      )}
      name={name as TName}
    />
  );
};

export default SelectInput;
