import React from 'react';
type ChangeQuantityProps = {
  id: number;
  qty: number;
  onAdjustQty: (id: number, value: number) => void;
};

export const ChangeQuantity = ({ id, qty = 1, onAdjustQty }: ChangeQuantityProps) => {
  const url = 'assets_ecommerce';

  return (
    <div className="set_qtd">
      <button onClick={() => onAdjustQty(id, qty - 1)}>
        <img src={`${url}/svg/Minus.png`} alt="cart" />
      </button>
      <span>{qty}</span>
      <button onClick={() => onAdjustQty(id, qty + 1)}>
        <img src={`${url}/svg/Plus.png`} alt="cart" />
      </button>
    </div>
  );
};
