'use client';

import EastIcon from '@mui/icons-material/East';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useAuth } from 'hooks/useAuth';

import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';
import { CategoriesDTO, RootState } from 'types/product';
import { useAppSelector } from 'hooks';

export const Products = () => {
  const { t } = useTranslation('home'); // Certifique-se de que está no namespace correto
  const categoriesList = useAppSelector((state: RootState) => state.products.categories);
  const { isClient } = useAuth();
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();
  const router = useRouter();
  const allowedSlugs = ['drink_foods', 'electronics', 'stationery', 'home_items', 'personal_care', 'various'];

  const promotionsCategory = categoriesList.find((item) => item.slug === 'promotions');
  const otherCategories = categoriesList.filter((item) => item.slug !== 'promotions');

  const goToCategories = (category: CategoriesDTO) => {
    toggleSelection(selectedCategories, setSelectedCategories, category);
    // void router.push(`products`);
  };

  const goToProducts = () => {
    void router.push(`products`);
  };

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }
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
          {
            [...(otherCategories || [])]
              .filter((category) => allowedSlugs.includes(category.slug)) // Filtra pelas slugs desejadas
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category, index) => {
                const staticCategory = new_categories.find((c) => c.slug === category.slug);
                const image = staticCategory?.image || 'default.png';

                return <CategoryItem key={index} category={{ ...category, image }} goToCategories={goToCategories} />;
              })
              .slice(0, 7) // Ajuste o slice se quiser limitar a quantidade
          }
        </div>
      </div>
    </div>
  );
};

interface CategoryWithImage extends CategoriesDTO {
  image: string;
}

const CategoryItem = ({
  category,
  goToCategories,
}: {
  category: CategoryWithImage;
  goToCategories: (category: CategoriesDTO) => void;
}) => {
  const { t } = useTranslation('home'); // Certifique-se de que está no namespace correto
  return (
    <button className="category-item" onClick={() => goToCategories(category)}>
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
