import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { AddressForm } from 'modules/CheckoutPage/AddressForm';
import { validationSchema } from 'utils/validationSchema';

export const AddOrEditAddress = ({ handleClick }: { handleClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema.step_user),
    mode: 'all', // Validação ocorre ao sair do campo
  });

  return (
    <div className="addOrEditAddress">
      <AddressForm errors={errors} control={control} />
      <div className="btn__container">
        <button onClick={handleClick}>Salvar</button>
        <button className="outlined" onClick={handleClick}>
          Cancelar
        </button>
      </div>
    </div>
  );
};
