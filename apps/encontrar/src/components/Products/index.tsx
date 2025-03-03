import { useRouter } from 'next/router';
import React from 'react';

import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';

export const Products = () => {
  const url = 'assets_ecommerce/svg';
  const router = useRouter();
  const { setSelectedCategory } = useProductContext();
  const goToCategories = (category: string) => {
    setSelectedCategory(category);
    void router.push(`products`);
  };

  const goToProducts = () => {
    void router.push(`products`);
  };

  return (
    <div className="products simple">
      <div className="products_container">
        <div className="products_container_top">
          <h4>O que vendemos na Encontrar </h4>
          <button className="more_categories" onClick={goToProducts}>
            Pesquisar Produtos
            <i>
              <img src="/assets_ecommerce/svg/ArrowRight-2.png" alt="" />
            </i>
          </button>
        </div>
        <div className="wrap_item">
          {new_categories.map((category, index) => (
            <button className="category-item" key={index} onClick={() => goToCategories(category.name)}>
              <div className="category_picture">
                <img src={`${url}/${category.image}`} alt={category.name} />
              </div>
              <a className="category_label">{category.name}</a>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
