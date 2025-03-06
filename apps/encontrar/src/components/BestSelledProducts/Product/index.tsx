import StarIcon from '@mui/icons-material/Star';
import React from 'react';

import { FnService } from 'shared/utils/FnService';
import { ProductTypeProps } from 'types/product';

export const Product = ({ product, handlepreviewProduct }: ProductTypeProps) => {
  const fnService = new FnService();
  const { image, name, price } = product;
  return (
    <button className="category-item bs bestselled" onClick={() => handlepreviewProduct(product)}>
      <div className="category_picture bestselled">
        <img src={`/assets_ecommerce/products/${image ?? 'macbook.png'}`} alt={name} />
      </div>
      <a className="product_name product-description">{name}</a>
      <div className="star_container">
        {[1, 2, 3, 4].map((__, index) => (
          <i key={index}>
            <StarIcon fontSize="small" htmlColor="#EBC80C" />
          </i>
        ))}
      </div>
      <p>{fnService.numberFormat(price ?? 0)}</p>
    </button>
  );
};
