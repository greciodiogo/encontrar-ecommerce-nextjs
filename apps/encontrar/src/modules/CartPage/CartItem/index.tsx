import React from 'react';

import { adjustQty, removeFromCart } from 'actions/products';
import { ChangeQuantity } from 'shared/components/ChangeQuantity';
import { ProductProps } from 'types/product';

import { useAppDispatch } from '../../../hooks';

export const CartItem = (props: ProductProps) => {
  const url = 'assets_ecommerce';
  const { name, image, id = 0, availability, category, brand, qty } = props.cart;

  const dispatch = useAppDispatch();
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
    // setTotal((t) => t - subtotal);
  };

  const handleAdjustQtyCart = (id: number, value: number) => {
    if (value < 1) return; // Evita valores negativos ou zero
    dispatch(adjustQty(id, value));
  };

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
            <ChangeQuantity id={id} qty={qty ?? 1} onAdjustQty={handleAdjustQtyCart} />
          </div>
          <button className="remove_item" onClick={() => handleRemoveFromCart(id)}>
            Remover do carrinho
          </button>
        </div>
      </div>
    </div>
  );
};
