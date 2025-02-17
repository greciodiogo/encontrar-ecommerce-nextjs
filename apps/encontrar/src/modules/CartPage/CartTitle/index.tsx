import React from 'react';

import { useAuth } from 'hooks/useAuth';

export const CartTitle = ({ qtdItems = 0 }) => {
  const { isClient } = useAuth();

  const url = 'assets_ecommerce';

  // Só renderiza a parte dependente do cliente se for no lado do cliente
  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }

  return (
    <div className="container_top">
      <h2>
        <span>Seu Carrinho</span>
        <i>
          <img src={`${url}/svg/cart.png`} alt="cart" />
        </i>
      </h2>
      <span>Total de items ({qtdItems})</span>
    </div>
  );
};
