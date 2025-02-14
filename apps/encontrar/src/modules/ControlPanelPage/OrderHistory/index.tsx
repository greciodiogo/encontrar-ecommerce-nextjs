import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

export const OrderHistoryPage = () => {
  const title = 'Seu histórico de pedidos encontra-se vazio';
  return (
    <>
      <Panel>
        <Panel.Icon>Storefront</Panel.Icon>
        <Panel.Title>Histórico de Pedidos</Panel.Title>
        <Panel.Description>Consulte o seu histórico de encomentas</Panel.Description>
      </Panel>
      <div className="orderHistory">
        <EmptyPanelItem title={title} />
      </div>
    </>
  );
};
