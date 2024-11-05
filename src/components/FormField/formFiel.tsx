import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { FormData } from '../../types/FormType';

interface FormFieldProps {
  id: keyof FormData;
  label: string;
  type?: string;
  options?: { value: string | number; label: string }[];
  register: UseFormRegister<FormData>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  disabled?: boolean;
  width?: string;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, type = 'text', options, register, onChange, disabled, width }) => {
  return (
    <FormControl width={width}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {options ? (
        <Select id={id} {...register(id)} onChange={onChange} disabled={disabled}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input id={id} type={type} {...register(id)} onChange={onChange} disabled={disabled} />
      )}
    </FormControl>
  );
};

export default FormField;