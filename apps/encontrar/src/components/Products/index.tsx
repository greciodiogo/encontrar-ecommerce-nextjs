import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { new_categories } from 'fixture/ecommerceData';

export const Products = () => {
  const { t } = useTranslation('home'); // Certifique-se de que está no namespace correto
  const url = 'assets_ecommerce/categories';

  return (
    <div className="products simple">
      <div className="products_container">
        <div className="products_container_top">
          <h4>{t('products.what_we_sell')}</h4>
          <button className="more_categories">
            {t('products.search_products')}
            <i>
              <img src="/assets_ecommerce/svg/ArrowRight-2.png" alt="" />
            </i>
          </button>
        </div>
        <div className="wrap_item">
          {new_categories.map((category, index) => (
            <div className="category-item" key={index}>
              <div className="category_picture">
                <img src={`${url}/${category.image}`} alt={t(`categories.${category.slug}`)} />
              </div>
              <a className="category_label">{t(`categories.${category.slug}`)}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
