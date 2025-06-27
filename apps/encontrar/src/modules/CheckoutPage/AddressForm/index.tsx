import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { Control, FieldErrors, useFormContext, UseFormSetValue } from 'react-hook-form';

import { getAddresses, setAddress } from 'actions/products';
import { ControlledSelectField } from 'hooks/ControlledSelectField';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { ControlledTextField } from 'hooks/useFormHandler';
import { Address, RootState } from 'types/product';

// Define os campos do formulário
export type AddressFormData = {
  name: string;
  email: string;
  pais: string;
  cidade: string;
  telefone: string;
  municipio: string;
  distrito?: string;
};

type AddressFormProps = {
  control?: Control<AddressFormData>;
  errors?: FieldErrors<AddressFormData>;
  setValue?: UseFormSetValue<AddressFormData>;
};

export const AddressForm: React.FC<AddressFormProps> = (props) => {
  const { t } = useTranslation('checkout');
  const context = useFormContext<AddressFormData>();
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state: RootState) => state.products.addresses);
  const [selectedMunicipio, setSelectedMunicipio] = useState<Address | null>(null);

  const control = props.control ?? context.control;
  const errors = props.errors ?? context.formState.errors;
  const setValue = props.setValue ?? context.setValue;
  const watch = context.watch;
  const values = watch();

  const municipioValue = watch('municipio');

  // Filter for top-level addresses (municipalities) where parentAddress is null
  const municipioOptions = addresses
    ? addresses.filter((address) => !address.parentAddress).map((address) => address.name)
    : [];

  // Find children of the selected municipality from the flat list
  const distritoOptions =
    selectedMunicipio && addresses
      ? addresses
          .filter((address) => address.parentAddress?.id === selectedMunicipio.id)
          .map((distrito) => distrito.name)
      : [];

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  // When the 'municipio' form value changes, find the corresponding address object
  useEffect(() => {
    if (municipioValue && addresses) {
      const selected = addresses.find((address) => address.name === municipioValue);
      setSelectedMunicipio(selected || null);
      if (setValue) {
        setValue('distrito', ''); // Reset district when municipality changes
      }
    } else {
      setSelectedMunicipio(null);
    }
  }, [municipioValue, addresses, setValue]);

  useEffect(() => {
    if (setValue) {
      setValue('pais', 'Angola');
      setValue('cidade', 'Luanda');

      // Pre-fill name and email if user is authenticated
      if (isAuthenticated && user) {
        if (user.name) {
          setValue('name', user.name);
        }
        if (user.email) {
          setValue('email', user.email);
        }
      }
    }
  }, [setValue, isAuthenticated, user]);

  // Real-time address saving
  React.useEffect(() => {
    if (values) {
      const addressData = {
        name: values.name || '',
        email: values.email || '',
        pais: values.pais || '',
        cidade: values.cidade || '',
        telefone: values.telefone || '',
        municipio: values.municipio || '',
        distrito: values.distrito || '',
      };
      dispatch(setAddress(addressData));
    }
  }, [values, dispatch]);

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
          disabled={isAuthenticated && (field.name === 'name' || field.name === 'email')}
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
        options={municipioOptions}
      />

      {/* Conditionally render the district select if there are districts */}
      {selectedMunicipio && distritoOptions.length > 0 && (
        <ControlledSelectField
          control={control}
          errors={errors}
          className="checkout_input col-md-8"
          label={t('form.district')}
          name="distrito"
          options={distritoOptions}
        />
      )}
    </div>
  );
};
