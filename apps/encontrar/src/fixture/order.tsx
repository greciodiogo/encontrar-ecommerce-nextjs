import { CheckCircle, LocalShipping, AccountCircle, MapOutlined, CheckCircleOutline } from '@mui/icons-material';

export const order = {
  id: '96459761',
  date: '11 Fev, 2025 às 7:32',
  total: '2999.00KZS',
  products: [
    {
      name: 'Google Pixel 6 Pro - Telefone Android 5G',
      description: 'Smartphone Desbloqueado com Câmera Avançada',
      price: '1499.5KZS',
      quantity: 1,
    },
    {
      name: 'Tech21 Evo Clear para Google Pixel 6 Pro',
      description: 'Capa de Telefone Cristalina com Resistência',
      price: '1499.5KZS',
      quantity: 1,
    },
  ],
  billingAddress: {
    name: 'João Manuel',
    address: 'Viana, Luanda Sul, Engil 4',
    phone: '244921234098',
    email: 'joaomanuel@gmail.com',
  },
  deliveryAddress: {
    name: 'João Manuel',
    address: 'Viana, Luanda Sul, Engil 4',
    phone: '244921234098',
    email: 'joaomanuel@gmail.com',
  },
  activities: [
    {
      icon: <CheckCircle color="success" />,
      message: 'O seu pedido foi entregue. Obrigado por comprar na Encontrar!',
      date: '11 Fev, 2025 às 7:32',
    },
    {
      icon: <AccountCircle color="primary" />,
      message: 'O nosso entregador (John Wick) apanhou o seu pedido para entrega.',
      date: '11 Fev, 2025 às 7:32',
    },
    {
      icon: <LocalShipping color="info" />,
      message: 'O seu pedido chegou ao centro de distribuição final.',
      date: '11 Fev, 2025 às 7:32',
    },
    {
      icon: <MapOutlined color="info" />,
      message: 'O seu pedido está a caminho do centro de distribuição (última milha)..',
      date: '11 Fev, 2025 às 7:32',
    },
    {
      icon: <CheckCircleOutline color="info" />,
      message: 'O seu pedido foi verificado com sucesso.',
      date: '11 Fev, 2025 às 7:32',
    },
    {
      icon: <LocalShipping color="info" />,
      message: 'O seu pedido foi confirmado..',
      date: ' 11 Fev, 2025 às 7:32',
    },
  ],
};
