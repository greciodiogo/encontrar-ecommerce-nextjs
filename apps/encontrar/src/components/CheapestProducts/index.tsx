import React from 'react';

import { cheapestProducts } from 'fixture/ecommerceData';

export const CheapestProducts = () => {
  const url = 'assets_ecommerce';
  return (
    <div className="products">
      <div className="products_container">
        <div className="products_container_top">
          <h4>Os Mais Baratos </h4>
          <button className="more_categories">
            Ver Produtos
            <i>
              <img src="/assets_ecommerce/svg/ArrowRight-2.png" alt="" />
            </i>
          </button>
        </div>
        <div className="wrapper">
          {cheapestProducts.map((category, index) => (
            <div className="wrapper_list" key={index}>
              <ul className="subcategories cheapest">
                {category.data.map(({ name, image }, itemIndex) => (
                  <div className="category-item cheapest" key={itemIndex}>
                    <div className="category_picture cheapest">
                      <img src={`${url}/categories/${image}`} alt={name} />
                    </div>
                    <a>{name}</a>
                    <div className="star_container">
                      {[1, 2, 3, 4].map((__, index) => (
                        <i key={index}>
                          <img src={`${url}/svg/star.png`} alt="star" />
                        </i>
                      ))}
                    </div>
                    <p>44,554KZS</p>
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
