import React, { useEffect, useState } from 'react';

import { adjustQty, removeFromCart } from 'actions/products';
import { useAuth } from 'hooks/useAuth';
import { ChangeQuantity } from 'shared/components/ChangeQuantity';
import { CartItemProps } from 'types/product';

import { useAppDispatch } from '../../../hooks';

export const CartItem = (props: CartItemProps) => {
  const dispatch = useAppDispatch();
  const url = 'assets_ecommerce';

  const { name, image, id = 0, availability, category, brand, qty = 1, price = 0 } = props.cart;
  const { setTotal, setSubtotal } = props;
  const { isClient } = useAuth();

  // Estado local para armazenar a quantidade do item
  const [localQty, setLocalQty] = useState(qty);

  useEffect(() => {
    // Atualiza o total e subtotal ao montar o componente
    const itemSubtotal = price * localQty;
    setTotal((prevTotal) => Math.max(0, prevTotal + itemSubtotal));
    setSubtotal((prevSubtotal) => Math.max(0, prevSubtotal + itemSubtotal));

    return () => {
      // Remove o subtotal do item ao desmontar o componente
      setTotal((prevTotal) => Math.max(0, prevTotal - itemSubtotal));
      setSubtotal((prevSubtotal) => Math.max(0, prevSubtotal - itemSubtotal));
    };
  }, []);

  const handleRemoveFromCart = () => {
    const itemSubtotal = price * localQty;

    dispatch(removeFromCart(id));

    // Remove o subtotal do item ao removê-lo do carrinho
    setTotal((prevTotal) => Math.max(0, prevTotal - itemSubtotal));
    setSubtotal((prevSubtotal) => Math.max(0, prevSubtotal - itemSubtotal));

    setLocalQty(0); // Evita valores inconsistentes ao remover o item
  };

  const handleAdjustQtyCart = (id: number, newQty: number) => {
    if (newQty < 1) return; // Evita valores negativos ou zero

    const prevQty = localQty;
    const diff = newQty - prevQty;

    setLocalQty(newQty);
    dispatch(adjustQty(id, newQty));

    // Ajusta o total com base na diferença de quantidade
    setTotal((prevTotal) => Math.max(0, prevTotal + diff * price));
    setSubtotal((prevSubtotal) => Math.max(0, prevSubtotal + diff * price));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="cart-item">
      <div className="cart-item-picture">
        <img src={`${url}/products/${image ?? 'macbook.png'}`} alt={name} />
      </div>
      <div className="cart-item-content">
        <h3>{name}</h3>
        <div className="wrap">
          <p>
            Sku: <span>{id}</span>
          </p>
          <p>
            Disponibilidade: <span>{availability}</span>
          </p>
          <p>
            Marca: <span>{brand}</span>
          </p>
          <p>
            Categoria: <span>{category}</span>
          </p>
        </div>
        <div className="cart-item-btn">
          <div className="change_quantity">
            <ChangeQuantity id={id} qty={localQty} onAdjustQty={handleAdjustQtyCart} />
          </div>
          <button className="remove_item" onClick={handleRemoveFromCart}>
            Remover do carrinho
          </button>
        </div>
      </div>
    </div>
  );
};
