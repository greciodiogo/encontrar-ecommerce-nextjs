import React from 'react';

export const CartTitle = ({ qtdItems = 0 }) => {
  const url = 'assets_ecommerce';

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
