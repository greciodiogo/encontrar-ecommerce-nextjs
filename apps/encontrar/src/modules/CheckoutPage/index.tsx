/* eslint-disable @typescript-eslint/no-misused-promises */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import { setAddress, setPaymentMethod, setOrder } from 'actions/products';
import { CustomStepIcon } from 'components/icon/CheckIcon';
import { useAuth } from 'hooks/useAuth';
import { toastProps } from 'shared/components/Toast/ToastContainer';
import { validationSchema } from 'utils/validationSchema';

import { useAppDispatch } from '../../hooks';

import { AddressForm } from './AddressForm';
import { PaymentStep } from './PaymentStep';
import { ReviewStep } from './Review';

// Passos do checkout
const steps = ['Endereço', 'Pagamento', 'Revisão'];

export const CheckoutPage = () => {
  const router = useRouter();
  const { selectedPrice } = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);
  const formRef = useRef<HTMLDivElement>(null); // Referência correta para o formulário
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema.step_user),
    mode: 'all', // Validação ao sair do campo
  });

  const saveOrder = () => {
    dispatch(
      setOrder({
        order_id: '1',
        created_at: new Date(),
        estado: 'ANDAMENTO',
      }),
    );
    toast.success('Pedido Realizado com Sucesso!');
    void router.push('/sucessful-order'); // Redireciona ao finalizar
  };

  const handleNextStep = async () => {
    // Valida o formulário antes de avançar
    const isValid = await trigger(); // Valida todos os campos do formulário

    if (activeStep === 0 && !isValid) {
      toast.warning('Por favor, preencha todos os campos obrigatórios.');
      return;
    } else if (activeStep === 1 && selectedPrice !== 'CASH') {
      toast.warning('Método de pagamento indisponível');
      return;
    } else if (activeStep === steps.length - 1) {
      dispatch(setPaymentMethod(selectedPrice));
      saveOrder();
    }

    setActiveStep((prev) => prev + 1);
    // Scroll para o topo do formulário após avançar
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
    <div className="checkoutPage" id="checkout-container">
      {' '}
      {/* ID adicionado para rolagem correta */}
      <div className="checkoutPage__container">
        <div ref={formRef}>
          <form onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)}>
            <div className="modal-body">
              <Stepper activeStep={activeStep + 1} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <div className="form__container">
                <div className="content">
                  <h4>{activeStep === 0 ? 'Adicione seu endereço' : 'Formas de Pagamento'}</h4>
                  <p>
                    {activeStep === 1 && 'Abaixo, coloque o seu endereço para que possamos enviar suas mercadorias'}
                    {activeStep === 2 && 'Escolha um dos métodos abaixo e conclua o pagamento da sua mercadoria'}
                    {activeStep === 3 && 'Abaixo, uma visão revisão geral da sua compra '}
                  </p>
                </div>
                <Box sx={{ mt: 2, mb: 1 }}>
                  {activeStep === 0 && <AddressForm setValue={setValue} errors={errors} control={control} />}
                  {activeStep === 1 && <PaymentStep />}
                  {activeStep === 2 && <ReviewStep handleNextStep={handleNextStep} />}
                </Box>
                {activeStep != steps.length - 1 && (
                  <div className="col-md-12">
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button onClick={handleNextStep} type="button" className="btn btn-primary">
                        <i className="fa fa-arrow-left"></i> {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
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
  );
};
