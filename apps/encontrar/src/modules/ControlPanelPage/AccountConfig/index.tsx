import React from 'react';

import { Panel } from 'components/ControlPanel';

export const AccountConfigPage = () => {
  return (
    <Panel>
      <Panel.Icon>Stack</Panel.Icon>
      <Panel.Title>Configurações da Conta</Panel.Title>
      <Panel.Description>Edite seu nome, endereço, email e password</Panel.Description>
    </Panel>
  );
};
