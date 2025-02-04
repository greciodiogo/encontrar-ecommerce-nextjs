import React from 'react';

import { cheapestProducts } from 'fixture/ecommerceData';

export const BestSelledProducts = ({ bannerText = 'Melhores Negócios em Eletrônicos.' }) => {
  const url = 'assets_ecommerce';
  return (
    <div className="products">
      <div className="products_container">
        <div className="products_container_top">
          <h4>{bannerText}</h4>
          <button className="more_categories">
            Ver Produtos
            <i>
              <img src="/assets_ecommerce/svg/ArrowRight-2.png" alt="" />
            </i>
          </button>
        </div>
        <div className="wrapper">
          {cheapestProducts.map((category, index) => (
            <div className="wrapper_list bestselled" key={index}>
              <div className="bestselled_product category-item">
                <div className="category_picture bestselled">
                  <img
                    src={`${url}/products/${category.bestselled_product.image}`}
                    alt={category.bestselled_product.name}
                  />
                </div>
                <a>{category.bestselled_product.name}</a>
                <div className="star_container">
                  {[1, 2, 3, 4].map((_, index) => (
                    <i key={index}>
                      <img src={`${url}/svg/star.png`} alt="star" />
                    </i>
                  ))}
                </div>
                <p>{category.bestselled_product.price}</p>
                <span>{category.bestselled_product.about}</span>
                <button className="">
                  <i>
                    <img src="/assets_ecommerce/svg/cart-2.png" alt="" />
                  </i>
                  Adicionar ao Carrinho
                </button>
              </div>
              <ul className="subcategories bestselled">
                {category.data.map(({ name, image, price }, itemIndex) => (
                  <div className="category-item bestselled" key={itemIndex}>
                    <div className="category_picture bestselled">
                      <img src={`${url}/categories/${image}`} alt={name} />
                    </div>
                    <a>{name}</a>
                    <div className="star_container">
                      {[1, 2, 3, 4].map((_, index) => (
                        <i key={index}>
                          <img src={`${url}/svg/star.png`} alt="star" />
                        </i>
                      ))}
                    </div>
                    <p>{price}</p>
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
