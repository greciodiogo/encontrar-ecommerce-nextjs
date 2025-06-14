import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { ControlledSelectField } from 'hooks/ControlledSelectField';
import { ControlledTextField } from 'hooks/useFormHandler';

// Define os campos do formulário
type AddressFormData = {
  name: string;
  email: string;
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
  const { t } = useTranslation('checkout');

  useEffect(() => {
    setValue('pais', 'Angola');
    setValue('cidade', 'Luanda');
  }, [setValue]);

  return (
    <div className="row mt-4">
      {(
        [
          { label: t('form.full_name'), name: 'name' },
          { label: t('form.email'), name: 'email', type: 'email' },
          // { label: t('form.confirm_email'), name: 'email_confirmation', type: 'email' },
          { label: t('form.phone_number'), name: 'telefone' },
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
        label={t('form.country')}
        name="pais"
        disabled
      />

      {/* Cidade fixa: Luanda */}
      <ControlledTextField
        control={control}
        errors={errors}
        className="checkout_input col-md-4"
        label={t('form.city')}
        name="cidade"
        disabled
      />

      {/* Select para Município */}
      <ControlledSelectField
        control={control}
        errors={errors}
        className="checkout_input col-md-8"
        label={t('form.municipality')}
        name="municipio"
        options={municipiosLuanda}
      />
    </div>
  );
};
