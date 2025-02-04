import React from 'react';

import { ProductProps } from 'types/product';

const Product: React.FC<ProductProps> = ({ product, handlepreviewProduct }) => {
  const { picture, name } = product;
  const url = 'assets_ecommerce/categories';
  return (
    <div className="product">
      <div className="product_picture">
        <img src={`${url}/${picture ?? 'placeholder.jpg'}`} alt={name} />
      </div>
      <div className="product_content">
        <p className="product_content_name">{name}</p>
      </div>
    </div>
  );
};

export default Product;
