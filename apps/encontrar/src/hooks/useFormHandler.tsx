import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { alpha, styled } from '@mui/material/styles';
import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

type ControlledTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  className?: string;
  fullWidth?: boolean;
};

export const ControlledTextField = <T extends FieldValues>({
  name,
  label,
  type = 'text',
  control,
  errors,
  className,
  fullWidth = true,
  ...props
}: ControlledTextFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControl variant="standard" className={className} fullWidth={fullWidth}>
        <InputLabel shrink htmlFor={name}>
          {label}
        </InputLabel>
        <BootstrapInput id={name} error={!!errors[name]} {...field} type={type} {...props} />
        {errors[name] && <FormHelperText>{errors[name]?.message as string}</FormHelperText>}
      </FormControl>
    )}
  />
);

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    fontSize: 16,
    fontWeight: 500,
    color: '#191C1F',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }),
  },
}));
