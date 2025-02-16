// import { useRouter } from 'next/router';
import React from 'react';

import { Panel } from 'components/ControlPanel';
// import { EmptyPanelItem } from 'components/EmptyPanelItem';

import { OrderList } from './OrdersList';

export const OrderHistoryPage = () => {
  // const title = 'Seu histórico de pedidos encontra-se vazio';
  // const router = useRouter();

  // const handleClick = () => {
  //   void router.push('/products');
  // };

  return (
    <>
      <Panel>
        <Panel.Icon>Storefront</Panel.Icon>
        <Panel.Title>Histórico de Pedidos</Panel.Title>
        <Panel.Description>Consulte o seu histórico de encomentas</Panel.Description>
      </Panel>
      <div className="orderHistory">
        {/* <EmptyPanelItem title={title} handleClick={handleClick} /> */}
        <OrderList />
      </div>
    </>
  );
};
