import * as yup from 'yup';

export const validationSchema = {
  login: yup.object().shape({
    username: yup.string().required('É obrigatório informar o nome de Utilizador'),
    password: yup.string().required('É obrigatório informar a senha').min(6, 'A senha deve ter no mínimo 6 caracteres'),
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
};
