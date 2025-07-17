import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';

import { fetchAllCategories, fetchAllProducts } from 'actions/products';
import { Categories, CheapestProducts, OtherProducts, Products, PromotionBanner, WhyUs } from 'components';
import { Container } from 'components/Container';
import { PromoCarousel } from 'components/PromoBanner';
import { PromotionProducts } from 'components/PromotionProducts';
import { products } from 'fixture/ecommerceData';
import { useAppSelector } from 'hooks';
import { ContactSupport } from 'modules/AboutPage/ContactSupport';
import { CategoriesDTO, ProductDTO, RootState } from 'types/product';
// import { ProductDTO } from 'types/product';

import { useProductContext } from 'hooks/useProductContext';

import { useAppDispatch } from '../../hooks';

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

export const Homepage = () => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto
  // const [productsList, setProductsList] = useState<Array<ProductDTO>>([]);
  const productsList = useAppSelector((state: RootState) => state.products.products);
  const categoriesList = useAppSelector((state: RootState) => state.products.categories);
  const dispatch = useAppDispatch();
  const [trendingProducts, setTrendingProducts] = useState<ProductDTO[]>([]);
  const [promotionProducts, setPromotionProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(fetchAllProducts());
        await dispatch(fetchAllCategories());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    void fetchProducts();
  }, [dispatch]);

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

  useEffect(() => {
    const fetchPromotionProducts = async (categoryId: number) => {
      try {
        const res = await fetch(`${BASE_URL}/categories/${categoryId}/products`);
        if (res.ok) {
          const data = await res.json();
          setPromotionProducts(data);
        }
      } catch (error) {
        console.error('Error fetching promotion products:', error);
      }
    };

    if (categoriesList.length > 0) {
      const promotionCategory = categoriesList.find((category) => category.name === 'Promotions');
      if (promotionCategory) {
        void fetchPromotionProducts(promotionCategory.id);
      }
    }
  }, [categoriesList]);

  return (
    <Container useStyle={false}>
      <Categories />
      <PromoCarousel />
      <Products />
      {trendingProducts && trendingProducts.length > 0 && (
        <CheapestProducts products={trendingProducts} bannerText={t('products.trending_products')} />
      )}
      {promotionProducts && promotionProducts.length > 0 && (
        <>
          <div className="productsPage noBorder">
            <div className="productsPage__container">
              <PromotionBanner />
            </div>
          </div>
          <PromotionProducts promotionProducts={promotionProducts} hasButtons={false} />
        </>
      )}
      <WhyUs />
      <div className="about_policy">
        <div className="about_policy_container">
          <ContactSupport />{' '}
        </div>
      </div>
    </Container>
  );
};
