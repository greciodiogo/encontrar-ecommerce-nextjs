import * as yup from 'yup';

export const validationSchema = {
  login: yup.object().shape({
    email: yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().required('É obrigatório informar a senha').min(4, 'A senha deve ter no mínimo 6 caracteres'),
  }),

  signup: yup.object().shape({
    nome: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().required('É obrigatório informar a senha').min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: yup
      .string()
      .required('As senhas devem ser iguais')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  }),

  verifyCode: yup.object().shape({
    code: yup.string().required('É obrigatório informar o código').min(4, 'O código deve ter 6 digitos').max(6),
  }),

  step_user: yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    pais: yup.string().required('O País é obrigatório'),
    cidade: yup.string().required('A cidade é obrigatória'),
    municipio: yup.string().required('O Municipio é obrigatório'),
    telefone: yup
      .string()
      .matches(/^\d{9,10}$/, 'O telefone deve conter 9 dígitos')
      .required('O telefone é obrigatório'),
    email: yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    email_confirmation: yup
      .string()
      .oneOf([yup.ref('email')], 'O email deve coincidir')
      .required('O campo Email é obrigatório'),
    // paymentMethod: yup.string().required('O nome é obrigatório'),
  }),

  contactSupport: yup.object().shape({
    email: yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    subject: yup.string().required('O campo Assunto é obrigatório'),
    body: yup.string().required('O Corpo da mensagem é obrigatório'),
  }),
};
