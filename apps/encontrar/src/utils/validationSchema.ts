import * as yup from 'yup';

export const validationSchema = {
  login: yup.object().shape({
    username: yup.string().required('É obrigatório informar o nome de Utilizador'),
    password: yup.string().required('É obrigatório informar a senha').min(6, 'A senha deve ter no mínimo 6 caracteres'),
  }),

  step_user: yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    telefone: yup
      .string()
      .matches(/^\d{9,15}$/, 'O telefone deve conter entre 9 e 15 dígitos')
      .required('O telefone é obrigatório'),
    email: yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    username: yup.string().required('O nome de usuário é obrigatório'),
    password: yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter no mínimo 6 caracteres'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem coincidir')
      .required('A confirmação de senha é obrigatória'),
  }),
};
