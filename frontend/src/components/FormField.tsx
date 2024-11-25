import { TextField } from "@mui/material";
import { CAR_FORM_FIELDS } from "../utils/constants";

interface FormFieldProps {
  key: string;
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  key,
  id,
  label,
  value,
  onChange,
  disabled,
}) => (
  <TextField
    id={id}
    label={label}
    variant="standard"
    placeholder={CAR_FORM_FIELDS[key as keyof typeof CAR_FORM_FIELDS]}
    value={value}
    onChange={onChange}
    InputProps={{ style: { fontSize: "14px" } }}
    InputLabelProps={{ style: { fontSize: "14px" } }}
    disabled={disabled}
    fullWidth
  />
);

export default FormField;
