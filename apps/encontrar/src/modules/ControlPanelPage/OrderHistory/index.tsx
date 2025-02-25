import { useRouter } from 'next/router';
import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';
import { useAppSelector } from 'hooks';
import { RootState } from 'types/product';

import { OrderList } from './OrdersList';

export const OrderHistoryPage = () => {
  const order = useAppSelector((state: RootState) => state.products.order);

  const title = 'Seu histórico de pedidos encontra-se vazio';
  const router = useRouter();

  const handleClick = () => {
    void router.push('/products');
  };

  return (
    <>
      <Panel>
        <Panel.Icon>Storefront</Panel.Icon>
        <Panel.Title>Histórico de Pedidos</Panel.Title>
        <Panel.Description>Consulte o seu histórico de encomentas</Panel.Description>
      </Panel>
      <div className="orderHistory">
        {order?.estado === 'ANDAMENTO' ? <OrderList /> : <EmptyPanelItem title={title} handleClick={handleClick} />}
      </div>
    </>
  );
};
