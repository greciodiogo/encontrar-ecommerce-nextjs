/* eslint-disable @typescript-eslint/no-misused-promises */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';

import { setAddress, setPaymentMethod, setOrder } from 'actions/products';
import { Container } from 'components/Container';
import { CustomStepIcon } from 'components/icon/CheckIcon';
import { useAuth } from 'hooks/useAuth';
import { toastProps } from 'shared/components/Toast/ToastContainer';
import { showToast } from 'shared/hooks/showToast';
import { validationSchema } from 'utils/validationSchema';

import { useAppDispatch } from '../../hooks';

import { AddressForm } from './AddressForm';
import { PaymentStep } from './PaymentStep';
import { ReviewStep } from './Review';

export const CheckoutPage = () => {
  const { t } = useTranslation('checkout');
  const common = useTranslation('common');
  const router = useRouter();
  const { selectedPrice } = useAuth();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const formRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const steps = [t('steps.address'), t('steps.payment'), t('steps.review')];

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema.step_user),
    mode: 'all',
  });

  const saveOrder = () => {
    dispatch(
      setOrder({
        order_id: '1',
        created_at: new Date(),
        estado: 'ANDAMENTO',
      }),
    );
    showToast({
      title: common.t('SUCCESS_FORM.title'),
      message: common.t('SUCCESS_FORM.message'),
      isSuccessType: true,
    });
    void router.push('/sucessful-order');
  };

  const handleNextStep = async () => {
    const isValid = await trigger();

    if (activeStep === 0 && !isValid) {
      showToast({
        title: common.t('INVALID_FORM.title'),
        message: common.t('INVALID_FORM.message'),
      });
      return;
    } else if (activeStep === 1 && selectedPrice?.name !== 'CASH') {
      showToast({
        title: common.t('UNVAILABLE_PAYMENT_METHOD.title'),
        message: common.t('UNVAILABLE_PAYMENT_METHOD.message'),
      });
      return;
    } else if (activeStep === steps.length - 1) {
      selectedPrice && dispatch(setPaymentMethod(selectedPrice.id));
      saveOrder();
      return; // Impede de avançar para um passo extra
    }

    setActiveStep((prev) => prev + 1);
    setTimeout(() => {
      document.getElementById('checkout-container')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleFormSubmit = () => {
    const checkoutData = getValues();
    try {
      dispatch(setAddress(checkoutData));
    } catch (err) {
      console.error('Erro ao processar o formulário:', err);
    }
  };

  return (
    <Container useStyle={false}>
      <div className="checkoutPage" id="checkout-container">
        <div className="checkoutPage__container">
          <div ref={formRef}>
            <form onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)}>
              <div className="modal-body">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <div className="form__container">
                  <div className="content">
                    <h4>{t(`titles.step${String(activeStep)}`)}</h4>
                    <p>{t(`descriptions.step${String(activeStep)}`)}</p>
                  </div>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    {activeStep === 0 && <AddressForm setValue={setValue} errors={errors} control={control} />}
                    {activeStep === 1 && <PaymentStep />}
                    {activeStep === 2 && <ReviewStep handleNextStep={handleNextStep} />}
                  </Box>
                  {activeStep !== steps.length - 1 && (
                    <div className="col-md-12">
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={handleNextStep} type="button" className="btn btn-primary">
                          <i className="fa fa-arrow-left"></i>{' '}
                          {activeStep === steps.length - 1 ? t('finish') : t('next')}
                        </button>
                        <ToastContainer {...toastProps} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};
