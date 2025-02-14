import React from 'react';

import { Panel } from 'components/ControlPanel';

export const WishListPage = () => {
  return (
    <Panel>
      <Panel.Icon>Heart</Panel.Icon>
      <Panel.Title>Lista de Desejos</Panel.Title>
      <Panel.Description>Edite seu nome, endereço, email e password</Panel.Description>
    </Panel>
  );
};
