import { CheckCircle, LocalShipping, AccountCircle, MapOutlined, CheckCircleOutline } from '@mui/icons-material';
import { Card, CardContent, Typography, Divider, Grid } from '@mui/material';
// import { useRouter } from 'next/router';
import React from 'react';

import { Container } from 'components/Container';
import { FnService } from 'shared/utils/FnService';

const OrderDetails = () => {
  const fnService = new FnService();
  // const router = useRouter();
  // const { id } = router.query; // Obtém o ID da rota dinâmica
  const order = {
    id: '96459761',
    date: '11 Fev, 2025 às 7:32',
    total: 2999,
    products: [
      {
        name: 'Google Pixel 6 Pro - Telefone Android 5G',
        description: 'Smartphone Desbloqueado com Câmera Avançada',
        price: 1499,
        quantity: 1,
      },
      {
        name: 'Tech21 Evo Clear para Google Pixel 6 Pro',
        description: 'Capa de Telefone Cristalina com Resistência',
        price: 1499.5,
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
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Detalhes do Pedido
      </Typography>

      {/* Informações principais */}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6">#{order.id}</Typography>
          <Typography>
            {order.products.length} Produtos - Pedido efetuado no dia {order.date}
          </Typography>
          <Typography variant="h4" style={{ marginTop: '10px' }}>
            {order.total}
          </Typography>
        </CardContent>
      </Card>

      {/* Linha do tempo */}
      <Typography variant="h6" gutterBottom>
        Order Activity
      </Typography>
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          {order.activities.map((activity, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '10px' }}>{activity.icon}</div>
              <div>
                <Typography>{activity.message}</Typography>
                <Typography color="textSecondary">{activity.date}</Typography>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Produtos */}
      <Typography variant="h6" gutterBottom>
        Produtos ({order.products.length})
      </Typography>
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Produto</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">Preço</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">Quantidade</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">Subtotal</Typography>
            </Grid>
          </Grid>
          <Divider style={{ margin: '10px 0' }} />
          {order.products.map((product, index) => (
            <Grid container spacing={2} key={index} style={{ marginBottom: '10px' }}>
              <Grid item xs={6}>
                <Typography>
                  <strong>{product.name}</strong>
                </Typography>
                <Typography color="textSecondary">{product.description}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{fnService.numberFormat(product.price)}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{fnService.formatarQuantidade(product.quantity)}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{fnService.numberFormat(product.price * product.quantity)}Kz</Typography>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>

      {/* Endereços */}
      <Typography variant="h6" gutterBottom>
        Endereço de Faturação e Entrega
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Endereço de Faturação</Typography>
              <Typography>{order.billingAddress.name}</Typography>
              <Typography>{order.billingAddress.address}</Typography>
              <Typography>{order.billingAddress.phone}</Typography>
              <Typography>{order.billingAddress.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Endereço de Entrega</Typography>
              <Typography>{order.deliveryAddress.name}</Typography>
              <Typography>{order.deliveryAddress.address}</Typography>
              <Typography>{order.deliveryAddress.phone}</Typography>
              <Typography>{order.deliveryAddress.email}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderDetails;
