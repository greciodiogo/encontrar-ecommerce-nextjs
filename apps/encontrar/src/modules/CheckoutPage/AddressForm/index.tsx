import React, { useEffect } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { ControlledSelectField } from 'hooks/ControlledSelectField';
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

// Define os municípios de Luanda
const municipiosLuanda = [
  'Belas',
  'Cacuaco',
  'Cazenga',
  'Ícolo e Bengo',
  'Kilamba Kiaxi',
  'Quiçama',
  'Talatona',
  'Viana',
];

type AddressFormProps = {
  control: Control<AddressFormData>;
  errors: FieldErrors<AddressFormData>;
  setValue: UseFormSetValue<AddressFormData>;
};

export const AddressForm: React.FC<AddressFormProps> = ({ control, errors, setValue }) => {
  useEffect(() => {
    setValue('pais', 'Angola');
    setValue('cidade', 'Luanda');
  }, [setValue]);

  return (
    <div className="row mt-4">
      {(
        [
          { label: 'Nome Completo', name: 'name' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Confirmar Email', name: 'email_confirmation', type: 'email' },
          { label: 'Número de Telemóvel', name: 'telefone' },
        ] as const
      ).map((field) => (
        <ControlledTextField
          key={field.name}
          control={control}
          errors={errors}
          className="checkout_input col-md-4"
          label={field.label}
          name={field.name}
        />
      ))}

      {/* País fixo: Angola */}
      <ControlledTextField
        control={control}
        errors={errors}
        className="checkout_input col-md-4"
        label="País"
        name="pais"
        disabled
      />

      {/* Cidade fixa: Luanda */}
      <ControlledTextField
        control={control}
        errors={errors}
        className="checkout_input col-md-4"
        label="Cidade"
        name="cidade"
        disabled
      />

      {/* Select para Município */}
      <ControlledSelectField
        control={control}
        errors={errors}
        className="checkout_input col-md-8"
        label="Município"
        name="municipio"
        options={municipiosLuanda}
      />
    </div>
  );
};
