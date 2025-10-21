/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/router';
// import useTranslation from 'next-translate/useTranslation';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { ProductDTO } from 'types/product';
import { useAppDispatch } from 'hooks';

export const PromotionProducts = ({
  promotionProducts,
  hasButtons = true,
}: {
  bannerText?: string;
  hasButtons?: boolean;
  promotionProducts: ProductDTO[];
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('home');
  const router = useRouter();

  // State to track screen width
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width on mount and resize
  useEffect(() => {
    const checkScreenWidth = () => {
      const newIsMobile = window.innerWidth <= 650;
      setIsMobile(newIsMobile);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  // Debug logging
  useEffect(() => {
    // console.log('PromotionProducts render:', {
    //   isMobile,
    //   promotionProductsLength: promotionProducts?.length,
    //   hasProducts: promotionProducts && promotionProducts.length > 0,
    // });
  }, [isMobile, promotionProducts]);

  const handleAddToCart = (id: number) => {
    // Find the product in the promotionProducts array
    const product = promotionProducts.find((p) => p.id === id);
    if (product) {
      dispatch(addToCart(id, 1, product));
    } else {
      // Fallback to old behavior if product not found in local state
      dispatch(addToCart(id));
    }
  };

  const handlepreviewProduct = (productDTO: ProductDTO) => {
    dispatch(loadCurrentItem(productDTO));
    void router.push('/preview-product');
  };

  // Swiper configuration
  const swiperConfig = {
    modules: [Autoplay],
    spaceBetween: 10,
    slidesPerView: 2.5,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    className: 'promotion-swiper',
    onSwiper: (swiper: any) => {
      // console.log('Promotion Swiper initialized:', swiper);
    },
    onSlideChange: () => {
      // console.log('Promotion slide changed');
    },
    onError: (error: any) => {
      // console.error('Promotion Swiper error:', error);
    },
  };

  return (
    <div className="promotion_products products">
      <div className="products_container">
        <div className="promotion_product_top">
          <div className="promotion_product_content">
            <h2>Promoções</h2>
            <p>Aproveita +10% desconto em talão nas tuas categorias favoritas!</p>
          </div>
          <button className="more_categories" onClick={() => router.push('/products')}>
            {t('products.search_products')}
            <i>
              <EastIcon fontSize="small" fill="#BD7B2D" />
            </i>
          </button>
        </div>

        {promotionProducts && promotionProducts.length > 0 ? (
          isMobile ? (
            // Swiper for mobile devices (≤650px)
            <div style={{ width: '100%', overflow: 'hidden' }}>
              <Swiper {...swiperConfig}>
                {promotionProducts.slice(0, 10).map((product, itemIndex) => (
                  <SwiperSlide key={itemIndex}>
                    <BestSelledProduct
                      product={product}
                      hasStars={false}
                      hasButtons={hasButtons}
                      handleAddToCart={handleAddToCart}
                      handlepreviewProduct={handlepreviewProduct}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            // Regular layout for larger devices (>650px)
            <ul className="wrapper">
              {promotionProducts
                .map((product, itemIndex) => (
                  <BestSelledProduct
                    product={product}
                    hasStars={false}
                    is_promotion={true}
                    hasButtons={hasButtons}
                    handleAddToCart={handleAddToCart}
                    handlepreviewProduct={handlepreviewProduct}
                    key={itemIndex}
                  />
                ))
                .slice(0, 10)}
            </ul>
          )
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>
    </div>
  );
};
