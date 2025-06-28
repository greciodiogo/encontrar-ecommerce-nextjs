import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { addToCart, loadCurrentItem } from 'actions/products';
import { ProductDTO } from 'types/product';

import { useAppDispatch } from '../../hooks';

import { BestSelledProduct } from './BestSelledProduct';
import { Product } from './Product';

export const BestSelledProducts = ({
  bannerText = 'Melhores Negócios em Eletrônicos.',
  products,
  bestSelledProduct,
}: {
  bannerText?: string;
  products: Array<ProductDTO>;
  bestSelledProduct: { data: ProductDTO };
}) => {
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

  const handlepreviewProduct = (productDTO: ProductDTO) => {
    dispatch(loadCurrentItem(productDTO));
    // router.push('/preview-product').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/preview-product');
  };

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
    //
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
            Ver Produtos
            <i>
              <EastIcon fontSize="small" fill="#BD7B2D" />
            </i>
          </button>
        </div>

        {isMobile ? (
          // Swiper for mobile devices (≤650px)
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={2.5}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="trending-swiper"
          >
            {products.map((item, itemIndex: number) => (
              <SwiperSlide key={itemIndex}>
                <Product product={item} handlepreviewProduct={handlepreviewProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Regular layout for larger devices (>650px)
          <div className="wrapper">
            <div className="wrapper_list bestselled">
              <BestSelledProduct
                product={bestSelledProduct.data}
                handleAddToCart={handleAddToCart}
                handlepreviewProduct={handlepreviewProduct}
              />
              <ul className="subcategories bestselled">
                {products.map((item, itemIndex: number) => (
                  <Product product={item} key={itemIndex} handlepreviewProduct={handlepreviewProduct} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
