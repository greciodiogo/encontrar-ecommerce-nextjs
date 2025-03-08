import { yupResolver } from '@hookform/resolvers/yup';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useForm } from 'react-hook-form';

import { AddressForm } from 'modules/CheckoutPage/AddressForm';
import { validationSchema } from 'utils/validationSchema';

export const AddOrEditAddress = ({ handleClick }: { handleClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema.step_user),
    mode: 'all', // Validação ocorre ao sair do campo
  });
  const { t } = useTranslation('common'); // 👈 Namespace para traduções

  return (
    <div className="addOrEditAddress">
      <AddressForm setValue={setValue} errors={errors} control={control} />
      <div className="btn__container">
        <button onClick={handleClick}>{t('save')}</button>
        <button className="outlined" onClick={handleClick}>
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};
