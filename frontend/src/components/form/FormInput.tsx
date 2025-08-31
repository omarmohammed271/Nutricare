import { Box, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { Controller, FieldPath, FieldValues, PathValue } from "react-hook-form";
import { FormInputProps } from "@src/components";

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  id,
  label,
  name,
  helperText,
  containerSx,
  ...other
}: FormInputProps<TFieldValues>) => {
  return (
    <Controller<TFieldValues, TName>
      control={control}
      defaultValue={"" as PathValue<TFieldValues, TName>}
      render={({ field, fieldState }) => (
        <Box sx={containerSx}>
          <InputLabel htmlFor={id ?? name} style={{ fontWeight: "medium" }} error={fieldState.error != null}>
            {label}
          </InputLabel>
          <OutlinedInput
            id={id ?? name}
            {...other}
            {...field}
            sx={{ width: "100%", mt: 1 }}
            error={fieldState.error != null}
            inputProps={{ style: { padding: "10px 12px" } }}
          />
          {(helperText || fieldState.error?.message) && (
            <FormHelperText error={fieldState.error != null}>{fieldState.error?.message ?? helperText}</FormHelperText>
          )}
        </Box>
      )}
      name={name as TName}
    />
  );
};

export default FormInput;
