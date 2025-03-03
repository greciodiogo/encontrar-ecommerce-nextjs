import React, { useState } from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

import { AddOrEditAddress } from '../AddOrEditAddress';

export const PreviewAddress = () => {
  const [isPreviewAddress, SetIsPreviewAddress] = useState(true);
  const title = 'Seu histórico de Endereços encontra-se vazio';
  const handleClick = () => {
    SetIsPreviewAddress((status) => !status);
  };
  return (
    <>
      <Panel>
        <Panel.Icon>Icons - Location</Panel.Icon>
        <Panel.Title>Endereço</Panel.Title>
        <Panel.Description>Altere detalhes do seu Endereço</Panel.Description>
      </Panel>
      <div className="addressPreview">
        {isPreviewAddress ? (
          <EmptyPanelItem handleClick={handleClick} title={title} type="address" />
        ) : (
          <AddOrEditAddress handleClick={handleClick} />
        )}
      </div>
    </>
  );
};
