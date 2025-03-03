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
        <Panel.Description>Carrinho de Compras</Panel.Description>
      </Panel>
      <div className="shoppingCart">
        <EmptyPanelItem title={title} type="shopping-cart" handleClick={handleClick} />
      </div>
    </>
  );
};
