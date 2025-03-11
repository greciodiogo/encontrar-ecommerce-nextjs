import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { CheapestProducts, OtherProducts, Products, PromotionBanner, WhyUs } from 'components';
import { Container } from 'components/Container';
import { PromoCarousel } from 'components/PromoBanner';
import { PromotionProducts } from 'components/PromotionProducts';
import { products } from 'fixture/ecommerceData';
import { ContactSupport } from 'modules/AboutPage/ContactSupport';
// import { useProductContext } from 'hooks/useProductContext';

export const Homepage = () => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto

  const topExpensiveDrinks = [...products]
    .filter((prod) => prod.categories.some(() => prod.categories.includes('Bebidas')))
    .sort((a_, b_) => b_.price - a_.price)
    .slice(0, 8);

  const promotionProducts = [...products]
    .filter((prod) => prod.categories.some(() => prod.is_promotion && prod.promotional_price > 0))
    .sort((a_, b_) => b_.price - a_.price)
    .slice(0, 10);

  const topExpensiveElectrics = [...products]
    .filter((prod) => prod.categories.some(() => prod.categories.includes('Eletrodomésticos')))
    .sort((a_, b_) => b_.price - a_.price)
    .slice(0, 8);

  const randomPopularProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 8);
  return (
    <Container useStyle={false}>
      <PromoCarousel />
      <Products />
      <WhyUs />
      {/* <BestSelledProducts bestSelledProduct={bestSelledProduct} products={props.products} /> */}
      <CheapestProducts products={topExpensiveDrinks} bannerText={t('cheapest_products.best_beverage_deals')} />
      <CheapestProducts products={randomPopularProducts} bannerText={t('cheapest_products.best_food_deals')} />
      <div className="productsPage">
        <div className="productsPage__container">
          <PromotionBanner />
        </div>
      </div>
      <PromotionProducts
        products={promotionProducts}
        bannerText={t('cheapest_products.other_products')}
        hasButtons={false}
      />
      <OtherProducts
        products={topExpensiveElectrics}
        bannerText={t('cheapest_products.other_products')}
        hasButtons={false}
      />
      <div className="about_policy">
        <div className="about_policy_container">
          <ContactSupport />{' '}
        </div>
      </div>
    </Container>
  );
};
