import React from 'react';

import { Panel } from 'components/ControlPanel';

export const CreditCardPage = () => {
  return (
    <Panel>
      <Panel.Icon>CreditCard-dark</Panel.Icon>
      <Panel.Title>Cartões</Panel.Title>
      <Panel.Description>Edite seu nome, endereço, email e password</Panel.Description>
    </Panel>
  );
};
