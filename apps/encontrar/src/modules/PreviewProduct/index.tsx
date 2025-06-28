import React, { useEffect, useState } from 'react';

import { ProductDetail as Details, ShowProductBanner } from 'components';
import { Container } from 'components/Container';
import { ProductDTO, RootState } from 'types/product';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { CheckoutInfo } from './CheckoutInfo';
import { FeatureInfo } from './FeatureInfo';
import { ReviewForm } from './ReviewsForm';
import { ReviewsInfo } from './ReviewsInfo';
import { ShippingInfo } from './ShippingInfo';
import { TechnicalInfo } from './TechnicalInfo';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { addToCart, loadCurrentItem } from 'actions/products';
import { useRouter } from 'next/router';

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

export const ProductDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const product = props.product;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentItem = useAppSelector((state: RootState) => state.products.currentItem);
  const categoriesList = useAppSelector((state: RootState) => state.products.categories);
  const [trendingProducts, setTrendingProducts] = useState<ProductDTO[]>([]);

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
    //
  };

  const handlepreviewProduct = (productDTO: ProductDTO) => {
    dispatch(loadCurrentItem(productDTO));
    // router.push('/preview-product').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/preview-product');
  };

  useEffect(() => {
    const fetchTrendingProducts = async (categoryId: number) => {
      try {
        const res = await fetch(`${BASE_URL}/categories/${categoryId}/products`);
        if (res.ok) {
          const data = await res.json();
          setTrendingProducts(data);
        }
      } catch (error) {
        console.error('Error fetching trending products:', error);
      }
    };

    if (categoriesList.length > 0) {
      const trendingCategory = categoriesList.find((category) => category.name === 'Trending');
      if (trendingCategory) {
        void fetchTrendingProducts(trendingCategory.id);
      }
    }
  }, [categoriesList]);

  // const { name, banner } = product;
  return (
    <Container useStyle={false}>
      <div className="productDetail">
        <div className="productDetail__container">
          <div className="row" style={{ alignItems: 'center' }}>
            <ShowProductBanner />
            <Details />
          </div>
          {/* <CheckoutInfo /> */}
          {currentItem?.id && <ReviewsInfo setIsOpen={setIsOpen} productId={currentItem.id as number} />}

          <div className="products_container">
            <div className="products_container_top">
              <h4>Trending Products</h4>
            </div>
          </div>

          <div className="" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={'auto'}
              loop
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              style={{ display: 'flex', flexDirection: 'row' }}
              className=""
            >
              {trendingProducts.map((product, itemIndex) => (
                <SwiperSlide key={itemIndex} style={{ maxWidth: 'minContent', width: '100%' }}>
                  <BestSelledProduct
                    product={product}
                    hasButtons={true}
                    hasDescription={false}
                    handleAddToCart={handleAddToCart}
                    handlepreviewProduct={handlepreviewProduct}
                    key={itemIndex}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {currentItem?.id && <ReviewForm productId={currentItem.id} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </Container>
  );
};
