/* eslint-disable @typescript-eslint/no-misused-promises */
// import { yupResolver } from '@hookform/resolvers/yup';
import EastIcon from '@mui/icons-material/East';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
// import { useForm } from 'react-hook-form';
// import { ToastContainer } from 'react-toastify';

import { ControlledTextField } from 'hooks/useFormHandler';
// import { toastProps } from 'shared/components/Toast/ToastContainer';
// import { showToast } from 'shared/hooks/showToast';
// import { validationSchema } from 'utils/validationSchema';

export const ContactSupport = () => {
  const { t } = useTranslation('checkout');
  const { t: commonT } = useTranslation('common'); // Renomeia para evitar conflitos

  // const {
  //   control,
  //   handleSubmit,
  //   // getValues,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(validationSchema.contactSupport), // Verifique se existe `contactSupport`
  //   mode: 'all',
  // });

  const handleFormSubmit = () => {
    // const checkoutData = getValues();
    try {
      showToast({
        title: commonT('SUCCESS_FORM.title'),
        message: commonT('SUCCESS_FORM.message'),
        isSuccessType: true,
      });
    } catch (err) {
      console.error('Erro ao processar o formulário:', err);
    }
  };

  return (
    <div className="contactSupport">
      <form>
        <h4>Não encontrou sua resposta? Peça apoio.</h4>
        <p>Nossa linha de email está disponível para ajudá-lo.</p>
        {/* {(
          [
            { label: t('form.email'), name: 'email', type: 'email' },
            { label: t('form.confirm_email'), name: 'subject' },
            { label: t('form.phone_number'), name: 'body' },
          ] as const
        ).map((field) => (
          <ControlledTextField
            key={field.name}
            control={nil}
            errors={nil}
            className="checkout_input col-md-4"
            label={field.label}
            name={field.name}
          />
        ))} */}

        <button type="submit">
          Mandar Mensagem
          <EastIcon fontSize="small" />
        </button>
        {/* <ToastContainer {...toastProps} /> */}
      </form>
    </div>
  );
};
