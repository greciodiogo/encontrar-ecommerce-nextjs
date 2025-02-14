import React from 'react';

import { Panel } from 'components/ControlPanel';

export const ShoppingCartPage = () => {
  return (
    <Panel>
      <Panel.Icon>ShoppingCart</Panel.Icon>
      <Panel.Title>Carrinho de Compras</Panel.Title>
      <Panel.Description>Edite seu nome, endereço, email e password</Panel.Description>
    </Panel>
  );
};
