import React from 'react';

import { categories } from 'fixture/ecommerceData';

export const Products = () => {
  const url = 'assets_ecommerce/categories';
  return (
    <div className="products">
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
        <div className="wrapper">
          {categories.map((category, index) => (
            <div className="wrapper_list" key={index}>
              <h3 className="title">{category.title}</h3>
              <ul className="subcategories">
                {category.data.map(({ name, image }, itemIndex) => (
                  <div className="category-item" key={itemIndex}>
                    <div className="category_picture">
                      <img src={`${url}/${image}`} alt={name} />
                    </div>
                    <a>{name}</a>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
