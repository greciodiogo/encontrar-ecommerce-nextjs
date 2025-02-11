import React from 'react';

import { ControlledTextField } from 'hooks/useFormHandler';

export const AddressForm = ({ control, errors }: { control: any; errors: any }) => (
  <div className="row mt-4">
    {[
      { label: 'Nome Completo', name: 'name' },
      { label: 'Email', name: 'email' },
      { label: 'Confirmar Email', name: 'email_confirmation' },
      { label: 'País', name: 'pais' },
      { label: 'Cidade', name: 'cidade' },
      { label: 'Número de Telemóvel', name: 'telefone' },
    ].map((field) => (
      <ControlledTextField
        key={field.name}
        control={control}
        errors={errors}
        className="checkout_input col-md-4"
        label={field.label}
        name={field.name}
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
