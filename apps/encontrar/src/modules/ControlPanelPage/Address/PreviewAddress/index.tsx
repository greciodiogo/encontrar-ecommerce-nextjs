import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

export const PreviewAddress = () => {
  const title = 'Seu histórico de Endereços encontra-se vazio';
  return (
    <>
      <Panel>
        <Panel.Icon>Icons - Location</Panel.Icon>
        <Panel.Title>Endereço</Panel.Title>
        <Panel.Description>Edite seu nome, endereço, email e password</Panel.Description>
      </Panel>
      <div className="addressPreview">
        <EmptyPanelItem title={title} />
      </div>
    </>
  );
};
