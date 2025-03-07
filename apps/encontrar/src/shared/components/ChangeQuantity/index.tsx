import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

type ChangeQuantityProps = {
  id: number;
  qty: number;
  onAdjustQty: (id: number, value: number) => void;
};

export const ChangeQuantity = ({ id, qty = 1, onAdjustQty }: ChangeQuantityProps) => {
  return (
    <div className="set_qtd">
      <button onClick={() => onAdjustQty(id, qty - 1)}>
        <FaMinus size={12} fill="#444" />
      </button>
      <span>{qty}</span>
      <button onClick={() => onAdjustQty(id, qty + 1)}>
        <FaPlus size={12} fill="#444" />
      </button>
    </div>
  );
};
