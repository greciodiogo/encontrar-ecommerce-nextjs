import React from 'react';

export const ChangeQuantity = () => {
  const url = 'assets_ecommerce';
  return (
    <div className="set_qtd">
      <i>
        <img src={`${url}/svg/Minus.png`} alt="cart" />
      </i>
      <span>01</span>
      <i>
        <img src={`${url}/svg/Plus.png`} alt="cart" />
      </i>
    </div>
  );
};
