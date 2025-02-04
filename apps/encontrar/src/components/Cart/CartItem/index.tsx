import React from 'react';

import { ChangeQuantity } from 'shared/ChangeQuantity';
import { ProductProps } from 'types/product';

export const CartItem = (props: ProductProps) => {
  const url = 'assets_ecommerce';
  const { name, picture, id, availability, category, brand } = props.cart;
  return (
    <div className="cart-item">
      <div className="cart-item-picture">
        <img src={`${url}/products/${picture}`} alt={name} />
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
          <button className="remove_item">Remover do carrinho</button>
        </div>
      </div>
    </div>
  );
};
