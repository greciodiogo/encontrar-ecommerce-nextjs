import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

// import { ToastContainer } from 'shared/components/Toast/ToastContainer';
import { validationSchema } from 'utils/validationSchema';

import { AddressForm } from './AddressForm';
import { PaymentStep } from './PaymentStep';

const steps = ['Endereço', 'Pagamento', 'Resumo da Compra'];

export const CheckoutPage = () => {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema.step_user),
    mode: 'all', // Validação ocorre ao sair do campo
  });

  //   ########## stepper #############
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNextStep = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  //   ########## stepper #############

  return (
    <div className="checkoutPage">
      <div className="checkoutPage_container">
        <div className="">
          <form>
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
                  <h4>Adicione seu endereço</h4>
                  <p>Abaixo, coloque o seu endereço para que possamos enviar suas merrcadorias</p>
                </div>
                <Box sx={{ mt: 2, mb: 1 }}>
                  {activeStep === 0 && <AddressForm errors={errors} control={control} />}
                  {activeStep === 1 && <PaymentStep />}
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
