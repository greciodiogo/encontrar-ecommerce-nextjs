import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

// import { ToastContainer } from 'shared/components/Toast/ToastContainer';
import { validationSchema } from 'utils/validationSchema';

import { AddressForm } from './AddressForm';
import { PaymentStep } from './PaymentStep';

// const steps = ['Endereço', 'Pagamento', 'Resumo da Compra'];
const steps = ['Endereço', 'Pagamento'];

export const CheckoutPage = () => {
  const [selectedPrice, setSelectedPrice] = useState('CASH');

  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema.step_user),
    mode: 'all', // Validação ocorre ao sair do campo
  });
  const router = useRouter();

  //   ########## stepper #############
  const [activeStep, setActiveStep] = React.useState(0);
  const formRef = useRef<HTMLDivElement>(null); // Referência para o formulário

  const handleNextStep = () => {
    if (activeStep === steps.length - 1) {
      void router.push('/sucessful-order'); // Redireciona ao finalizar
    } else {
      setActiveStep((prev) => prev + 1);
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Rola para o formulário
    }
  };

  const handleSubmit = () => {
    // void router.push('/sucessful-order');
  };
  //
  //   ########## stepper #############

  return (
    <div className="checkoutPage">
      <div className="checkoutPage__container">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <div className="form__container">
                <div className="content">
                  <h4>{activeStep === 0 ? 'Adicione seu endereço' : 'Formas de Pagamento'}</h4>
                  <p>
                    {activeStep === 0
                      ? 'Abaixo, coloque o seu endereço para que possamos enviar suas merrcadorias'
                      : 'Escolha um dos métodos abaixo e conclua o pagamento da sua mercadoria'}
                  </p>
                </div>
                <Box sx={{ mt: 2, mb: 1 }}>
                  {activeStep === 0 && <AddressForm errors={errors} control={control} />}
                  {activeStep === 1 && (
                    <PaymentStep selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} />
                  )}
                  {activeStep === 2 && <></>}
                </Box>
                <div className="col-md-12">
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={handleNextStep} type="button" className="btn btn-primary">
                      <i className="fa fa-arrow-left"></i> {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                    </button>
                    {/* <ToastContainer /> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
