import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { ControlledTextField } from 'hooks/useFormHandler';

// Define os campos do formulário
type AddressFormData = {
  name: string;
  email: string;
  email_confirmation: string;
  pais: string;
  cidade: string;
  telefone: string;
  municipio: string;
};

// Define os tipos das props do componente
type AddressFormProps = {
  control: Control<AddressFormData>;
  errors: FieldErrors<AddressFormData>;
};

export const AddressForm: React.FC<AddressFormProps> = ({ control, errors }) => (
  <div className="row mt-4">
    {(
      [
        { label: 'Nome Completo', name: 'name' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Confirmar Email', name: 'email_confirmation', type: 'email' },
        { label: 'País', name: 'pais' },
        { label: 'Cidade', name: 'cidade' },
        { label: 'Número de Telemóvel', name: 'telefone' },
      ] as const
    ).map((field) => (
      <ControlledTextField
        key={field.name}
        control={control}
        errors={errors}
        className="checkout_input col-md-4"
        label={field.label}
        name={field.name} // Agora reconhecido como keyof AddressFormData
      />
    ))}
    <ControlledTextField
      control={control}
      errors={errors}
      className="checkout_input col-md-8"
      label="Município"
      name="municipio"
      fullWidth
    />
  </div>
);
