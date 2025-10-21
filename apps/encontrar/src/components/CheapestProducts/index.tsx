/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { ProductDTO } from 'types/product';

import { useAppDispatch } from '../../hooks';

export const CheapestProducts = ({
  bannerText = 'Melhores Negócios em Eletrônicos.',
  products,
  hasDescription = false,
  hasButtons = true,
}: {
  bannerText?: string;
  hasDescription?: boolean;
  hasButtons?: boolean;
  products: Array<ProductDTO>;
}) => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto
  const dispatch = useAppDispatch();
  const router = useRouter();

  // State to track screen width
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width on mount and resize
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  const handleAddToCart = (id: number) => {
    // Find the product in the products array
    const product = products.find((p) => p.id === id);
    if (product) {
      dispatch(addToCart(id, 1, product));
    } else {
      // Fallback to old behavior if product not found in local state
      dispatch(addToCart(id));
    }
  };

  const handlepreviewProduct = (productDTO: ProductDTO) => {
    dispatch(loadCurrentItem(productDTO));
    // router.push('/preview-product').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/preview-product');
  };

  const handleSeeMoreBtnClick = () => {
    // router.push('/products-').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/products');
  };

  return (
    <div className="products">
      <div className="products_container">
        <div className="products_container_top">
          <h4>{bannerText}</h4>
          <button className="more_categories" onClick={handleSeeMoreBtnClick}>
            {t('products.search_products')}

            <i>
              <EastIcon fontSize="small" fill="#BD7B2D" />
            </i>
          </button>
        </div>

        {products && products.length > 0 ? (
          isMobile ? (
            // Swiper for mobile devices (≤650px)
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={15}
              slidesPerView={2.2}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              loop={true}
              className="cheapest-swiper"
            >
              {products.slice(0, 8).map((product, itemIndex) => (
                <SwiperSlide key={itemIndex}>
                  <BestSelledProduct
                    product={product}
                    hasButtons={hasButtons}
                    hasDescription={hasDescription}
                    handleAddToCart={handleAddToCart}
                    handlepreviewProduct={handlepreviewProduct}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // Regular layout for larger devices (>650px)
            <div className="wrapper">
              <div className="wrapper_list">
                <ul className="subcategories cheapest">
                  {products
                    ?.map((product, itemIndex) => (
                      <BestSelledProduct
                        product={product}
                        hasButtons={hasButtons}
                        hasDescription={hasDescription}
                        handleAddToCart={handleAddToCart}
                        handlepreviewProduct={handlepreviewProduct}
                        key={itemIndex}
                      />
                    ))
                    .slice(0, 8)}
                </ul>
              </div>
            </div>
          )
        ) : (
          <p>{t('products.loading_products')}</p> // ou um spinner de loading
        )}
      </div>
    </div>
  );
};
