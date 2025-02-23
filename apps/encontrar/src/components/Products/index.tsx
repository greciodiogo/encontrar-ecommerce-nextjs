import React from 'react';

import { new_categories } from 'fixture/ecommerceData';

export const Products = () => {
  const url = 'assets_ecommerce/categories';
  return (
    <div className="products simple">
      <div className="products_container">
        <div className="products_container_top">
          <h4>O que vendemos na Encontrar </h4>
          <button className="more_categories">
            Pesquisar Produtos
            <i>
              <img src="/assets_ecommerce/svg/ArrowRight-2.png" alt="" />
            </i>
          </button>
        </div>
        <div className="wrap_item">
          {new_categories.map((category, index) => (
            <div className="category-item" key={index}>
              <div className="category_picture">
                <img src={`${url}/${category.image}`} alt={category.name} />
              </div>
              <a>{category.name}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
