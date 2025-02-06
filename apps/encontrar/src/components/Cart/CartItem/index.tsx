import React from 'react';

import { removeFromCart } from 'actions/products';
import { ChangeQuantity } from 'shared/ChangeQuantity';
import { ProductProps } from 'types/product';

import { useAppDispatch } from '../../../hooks';

export const CartItem = (props: ProductProps) => {
  const url = 'assets_ecommerce';
  const { name, banner, id, availability, category, brand } = props.cart;
  const dispatch = useAppDispatch();
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
    // setTotal((t) => t - subtotal);
  };
  return (
    <div className="cart-item">
      <div className="cart-item-picture">
        <img src={`${url}/products/${banner ?? 'macbook.png'}`} alt={name} />
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
            <ChangeQuantity />
          </div>
          <button className="remove_item" onClick={() => handleRemoveFromCart(id)}>
            Remover do carrinho
          </button>
        </div>
      </div>
    </div>
  );
};
