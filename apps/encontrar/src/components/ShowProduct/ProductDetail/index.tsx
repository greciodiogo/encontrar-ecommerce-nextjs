import React from 'react';

import { ChangeQuantity } from 'shared/ChangeQuantity';
import { SubmitButton } from 'shared/SubmitButton';
import { ProductDetailProps } from 'types/product';

export const ProductDetail = (props: ProductDetailProps) => {
  const url = 'assets_ecommerce';
  const { name, availability, category, price, brand, id } = props.product;

  return (
    <div className="wrapper">
      <div className="star_container">
        {[1, 2, 3, 4].map((__, index) => (
          <i key={index}>
            <img src={`${url}/svg/star.png`} alt="star" />
          </i>
        ))}
        <span className="rating">4.7 Star Rating</span>
        <span className="totalFeedback">(21 User feedback)</span>
      </div>
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
      <div className="product_price">
        {price} <span>Kz</span>
      </div>
      <div className="cart-item-btn">
        <div className="change_quantity">
          <ChangeQuantity />
          <SubmitButton title="Adicionar ao Carrinho" svg="cart-2" />
          <SubmitButton title="Comprar agora" outlined={true} />
        </div>
      </div>
    </div>
  );
};
