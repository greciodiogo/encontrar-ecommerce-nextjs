import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { CheapestProducts, Framer, OtherProducts, Products, Reviews, WhyUs } from 'components';
import { Container } from 'components/Container';
import { products } from 'fixture/ecommerceData';
// import { useProductContext } from 'hooks/useProductContext';

export const Homepage = () => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto

  const topExpensiveDrinks = [...products]
    .filter((prod) => prod.categories.some(() => prod.categories.includes('Bebidas')))
    .sort((a_, b_) => b_.price - a_.price)
    .slice(0, 8);

  const topExpensiveElectrics = [...products]
    .filter((prod) => prod.categories.some(() => prod.categories.includes('Eletrodomésticos')))
    .sort((a_, b_) => b_.price - a_.price)
    .slice(0, 8);

  const randomPopularProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 8);
  return (
    <Container useStyle={false}>
      <Framer />
      <Products />
      <WhyUs />
      {/* <BestSelledProducts bestSelledProduct={bestSelledProduct} products={props.products} /> */}
      <CheapestProducts products={topExpensiveDrinks} bannerText={t('cheapest_products.best_beverage_deals')} />
      <CheapestProducts products={randomPopularProducts} bannerText={t('cheapest_products.best_food_deals')} />
      <OtherProducts
        products={topExpensiveElectrics}
        bannerText={t('cheapest_products.other_products')}
        hasButtons={false}
      />
      <Reviews />
    </Container>
  );
};
