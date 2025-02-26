import React from 'react';

import { FnService } from 'shared/utils/FnService';
import { ProductTypeProps } from 'types/product';

export const Product = ({ product, handlepreviewProduct }: ProductTypeProps) => {
  const fnService = new FnService();
  const { id, image, name, price } = product;
  const url = 'assets_ecommerce';
  return (
    <button className="category-item bs bestselled" onClick={() => handlepreviewProduct(id ?? 0)}>
      <div className="category_picture bestselled">
        <img src={`${url}/products/${image ?? 'macbook.png'}`} alt={name} />
      </div>
      <a className="product_name product-description">{name}</a>
      <div className="star_container">
        {[1, 2, 3, 4].map((__, index) => (
          <i key={index}>
            <img src={`${url}/svg/star.png`} alt="star" />
          </i>
        ))}
      </div>
      <p>{fnService.numberFormat(price ?? 0)}</p>
    </button>
  );
};
