import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

type ControlledSelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  className?: string;
  options: Array<string>;
};

export const ControlledSelectField = <T extends FieldValues>({
  name,
  label,
  control,
  errors,
  className,
  options,
}: ControlledSelectFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControl variant="standard" className={className} fullWidth error={!!errors[name]}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} value={field.value || ''}>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {errors[name] && <FormHelperText>{errors[name]?.message as string}</FormHelperText>}
      </FormControl>
    )}
  />
);
