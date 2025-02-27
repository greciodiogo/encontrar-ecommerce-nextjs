import { useRouter } from 'next/router';
import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

export const ShoppingCartPage = () => {
  const title = 'Seu Carrinho de Compras encontra-se vazio';
  const router = useRouter();

  const handleClick = () => {
    void router.push('/products');
  };

  return (
    <>
      <Panel>
        <Panel.Icon>ShoppingCart</Panel.Icon>
        <Panel.Title>Carrinho de Compras</Panel.Title>
        <Panel.Description>Edite seu nome, endereço, email e password</Panel.Description>
      </Panel>
      <div className="shoppingCart">
        <EmptyPanelItem title={title} handleClick={handleClick} />
      </div>
    </>
  );
};
