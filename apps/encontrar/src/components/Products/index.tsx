import EastIcon from '@mui/icons-material/East';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';

export const Products = () => {
  const { t } = useTranslation('home'); // Certifique-se de que está no namespace correto

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
          <h4>{t('products.what_we_sell')}</h4>
          <button className="more_categories" onClick={goToProducts}>
            {t('products.search_products')}
            <i>
              <EastIcon fontSize="small" fill="#BD7B2D" />
            </i>
          </button>
        </div>
        <div className="wrap_item">
          {new_categories
            .filter((item) => item.slug !== 'promotions') // Filtra a categoria "promotions"
            .map((category, index) => (
              <CategoryItem category={category} goToCategories={goToCategories} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

const CategoryItem = ({
  category,
  goToCategories,
}: {
  category: { name: string; slug: string; image: string };
  goToCategories: (category: string) => void;
}) => {
  const { t } = useTranslation('home'); // Certifique-se de que está no namespace correto
  return (
    <button className="category-item" onClick={() => goToCategories(category.name)}>
      <div className="category_picture">
        <Image
          src={`/assets_ecommerce/svg/${category.image}`}
          alt={t(`categories.${category.slug}`)}
          blurDataURL="www.google.com"
          placeholder="blur"
          height={58}
          width={58}
        />
      </div>
      <a className="category_label">{t(`categories.${category.slug}`)}</a>
    </button>
  );
};
