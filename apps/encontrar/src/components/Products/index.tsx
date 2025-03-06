import EastIcon from '@mui/icons-material/East';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';

export const Products = () => {
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();
  const router = useRouter();

  const goToCategories = (category: string) => {
    toggleSelection(selectedCategories, setSelectedCategories, category);
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
              <EastIcon fontSize="small" fill="#BD7B2D" />
            </i>
          </button>
        </div>
        <div className="wrap_item">
          {new_categories.map((category, index) => (
            <button className="category-item" key={index} onClick={() => goToCategories(category.name)}>
              <div className="category_picture">
                <Image
                  src={`/assets_ecommerce/svg/${category.image}`}
                  alt={category.name}
                  // priority={true}
                  blurDataURL="www.google.com"
                  placeholder="blur"
                  height={58}
                  width={58}
                  // objectFit="contain"
                />
              </div>
              <a className="category_label">{category.name}</a>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
