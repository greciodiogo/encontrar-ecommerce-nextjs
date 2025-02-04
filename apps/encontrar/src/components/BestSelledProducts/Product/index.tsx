import React from 'react';

import { ProductTypeProps } from 'types/product';

export const Product = ({ product, handlepreviewProduct }: ProductTypeProps) => {
  const { id, image, name, price } = product;
  const url = 'assets_ecommerce';
  return (
    <button className="category-item bestselled" onClick={() => handlepreviewProduct(id)}>
      <div className="category_picture bestselled">
        <img src={`${url}/categories/${image ?? 'macbook.png'}`} alt={name} />
      </div>
      <a className="product_name product-description">{name}</a>
      <div className="star_container">
        {[1, 2, 3, 4].map((__, index) => (
          <i key={index}>
            <img src={`${url}/svg/star.png`} alt="star" />
          </i>
        ))}
      </div>
      <p>{price}</p>
    </button>
  );
};
