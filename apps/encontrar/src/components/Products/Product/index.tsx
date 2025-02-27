import React from 'react';

export const Product = ({ product }: { product: { name: string; picture: string } }) => {
  const { picture, name } = product;
  const url = 'assets_ecommerce/categories';
  return (
    <div className="product">
      <div className="product_picture">
        <img src={`${url}/${picture ? picture : 'macbook.png'}`} alt={name} />
      </div>
      <div className="product_content">
        <p className="product_content_name">{name}</p>
      </div>
    </div>
  );
};
