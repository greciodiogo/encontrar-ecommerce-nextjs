import React from 'react';

import { ProductTypeProps } from 'types/product';

export const BestSelledProduct = ({ product, handlepreviewProduct }: ProductTypeProps) => {
  const { id, image, name, price, about } = product;
  const url = 'assets_ecommerce';
  return (
    <button className="bestselled_product category-item" onClick={() => handlepreviewProduct(id)}>
      <a className="addCartBtn">
        <i>
          <img src={`${url}/svg/Heart.png`} alt="Heart" />
        </i>
      </a>
      <div className="category_picture bestselled">
        <img src={`${url}/products/${image ?? 'macbook.png'}`} alt={name} />
      </div>
      <div className="content">
        <a className="product_name product-description">{name}</a>
        <div className="star_container">
          {[1, 2, 3, 4].map((__, index) => (
            <i key={index}>
              <img src={`${url}/svg/star.png`} alt="star" />
            </i>
          ))}
        </div>
        <p>{price}Kz</p>
        <span>{about}</span>
      </div>

      <a className="btn">
        <i>
          <img src="/assets_ecommerce/svg/cart-2.png" alt="" />
        </i>
        Adicionar ao Carrinho
      </a>
    </button>
  );
};
