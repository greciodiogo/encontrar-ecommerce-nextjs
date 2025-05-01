import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';

import { fetchAllProducts } from 'actions/products';
import { CheapestProducts, OtherProducts, Products, PromotionBanner, WhyUs } from 'components';
import { Container } from 'components/Container';
import { PromoCarousel } from 'components/PromoBanner';
import { PromotionProducts } from 'components/PromotionProducts';
import { products } from 'fixture/ecommerceData';
import { useAppSelector } from 'hooks';
import { ContactSupport } from 'modules/AboutPage/ContactSupport';
import { RootState } from 'types/product';
// import { ProductDTO } from 'types/product';

// import { useProductContext } from 'hooks/useProductContext';

import { useAppDispatch } from '../../hooks';

export const Homepage = () => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto
  // const [productsList, setProductsList] = useState<Array<ProductDTO>>([]);
  const productsList = useAppSelector((state: RootState) => state.products.products);
  const dispatch = useAppDispatch();

  // const promotionProducts = [...products]
  //   .filter((prod) => prod.categories.some(() => prod.is_promotion && prod.promotional_price > 0))
  //   .sort((a_, b_) => b_.price - a_.price)
  //   .slice(0, 10);

  // const topExpensiveElectrics = [...products]
  //   .filter((prod) => prod.categories.some(() => prod.categories.includes('Eletrodomésticos')))
  //   .sort((a_, b_) => b_.price - a_.price)
  //   .slice(0, 8);

  // const topExpensiveFoods = [...products]
  //   .filter((prod) => prod.categories.some(() => prod.categories.includes('Alimentação')))
  //   .sort((a_, b_) => b_.price - a_.price)
  //   .slice(0, 8);
  // const randomPopularProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(fetchAllProducts());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    void fetchProducts();
  }, []);

  return (
    <Container useStyle={false}>
      <PromoCarousel />
      {/* <Products /> */}
      <WhyUs />
      {/* <BestSelledProducts bestSelledProduct={bestSelledProduct} products={props.products} /> */}
      <CheapestProducts products={productsList} bannerText={t('cheapest_products.best_beverage_deals')} />
      <CheapestProducts products={productsList} bannerText={t('cheapest_products.best_food_deals')} />
      <div className="productsPage noBorder">
        <div className="productsPage__container">
          <PromotionBanner />
        </div>
      </div>
      <PromotionProducts
        products={productsList}
        bannerText={t('cheapest_products.other_products')}
        hasButtons={false}
      />
      <OtherProducts products={productsList} bannerText={t('cheapest_products.other_products')} hasButtons={false} />
      <div className="about_policy">
        <div className="about_policy_container">
          <ContactSupport />{' '}
        </div>
      </div>
    </Container>
  );
};
