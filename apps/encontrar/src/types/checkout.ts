export type RegisterAddressDTO = {
  name?: string;
  telefone?: string;
  email?: string;
  email_confirmation?: string;
  pais?: string;
  cidade?: string;
  municipio?: string;
};

export type RegisterPaymentMethodDTO = string | null;

export type TakeCheckoutDTO = {
  registerAddressDTO?: RegisterAddressDTO;
  registerPaymentMethodDTO?: RegisterPaymentMethodDTO;
};

export type CheckoutDTO = {
  name?: string;
  telefone?: string;
  email?: string;
  email_confirmation?: string;
  pais?: string;
  cidade?: string;
  municipio?: string;
  paymentMethod?: string;
};
