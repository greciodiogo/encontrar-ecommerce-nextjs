'use client';

import EastIcon from '@mui/icons-material/East';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';
import { CategoriesDTO, RootState } from 'types/product';
import { useAppSelector } from 'hooks';
import { sortCategoriesWithDrinkFoodsLast } from 'utils/categorySort';

export const Products = () => {
  const { t } = useTranslation('home'); // Certifique-se de que está no namespace correto
  const categoriesList = useAppSelector((state: RootState) => state.products.categories);
  const { isClient } = useAuth();
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();
  const router = useRouter();
  const allowedSlugs = ['drink_foods', 'electronics', 'stationery', 'home_items', 'personal_care', 'various'];

  // State to track screen width
  const [isMobile, setIsMobile] = useState(false);

  const promotionsCategory = categoriesList.find((item) => item.slug === 'promotions');
  const otherCategories = categoriesList.filter((item) => item.slug !== 'promotions');

  // Filter and sort categories with drink_foods last
  const filteredCategories = sortCategoriesWithDrinkFoodsLast(
    otherCategories.filter((category) => allowedSlugs.includes(category.slug)),
  ).slice(0, 7);

  // Check screen width on mount and resize
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

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

        {isMobile ? (
          // Swiper for mobile devices (≤650px)
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={3}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="products-swiper"
          >
            {filteredCategories.map((category, index) => {
              const staticCategory = new_categories.find((c) => c.slug === category.slug);
              const image = staticCategory?.image || 'default.png';

              return (
                <SwiperSlide key={index}>
                  <CategoryItem category={{ ...category, image }} goToCategories={goToCategories} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          // Regular flex layout for larger devices (>650px)
          <div className="wrap_item">
            {filteredCategories.map((category, index) => {
              const staticCategory = new_categories.find((c) => c.slug === category.slug);
              const image = staticCategory?.image || 'default.png';

              return <CategoryItem key={index} category={{ ...category, image }} goToCategories={goToCategories} />;
            })}
          </div>
        )}
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
