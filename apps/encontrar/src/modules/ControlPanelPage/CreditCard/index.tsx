import { useRouter } from 'next/router';
import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

export const CreditCardPage = () => {
  const title = 'Seu histórico de Cartões encontra-se vazio';
  const router = useRouter();

  const handleClick = () => {
    void router.push('/products');
  };
  return (
    <>
      <Panel>
        <Panel.Icon>CreditCard-dark</Panel.Icon>
        <Panel.Title>Cartões</Panel.Title>
        <Panel.Description>Edite seu nome, endereço, email e password</Panel.Description>
      </Panel>
      <div className="orderHistory">
        <EmptyPanelItem title={title} handleClick={handleClick} />
      </div>
    </>
  );
};
