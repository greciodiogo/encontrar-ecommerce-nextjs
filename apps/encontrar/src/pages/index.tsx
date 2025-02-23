import type { GetStaticProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Categories, CheapestProducts, Framer, Products, Reviews, WhyUs } from 'components';
import { Container } from 'components/Container';
import { bestSelledProduct, products } from 'fixture/ecommerceData';
import { ProductDTO } from 'types/product';

type Data = {
  title: string;
  picture: string;
};

type PropsType = {
  banner?: Array<Data>;
  products: Array<ProductDTO>;
};

const Homepage: NextPage<PropsType> = () => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto

  return (
    <Container useStyle={false}>
      <Categories />
      <Framer />
      <Products />
      <WhyUs />
      {/* <BestSelledProducts bestSelledProduct={bestSelledProduct} products={props.products} /> */}
      <CheapestProducts />
      <CheapestProducts bannerText={t('cheapest_products.popular_products')} />
      <CheapestProducts bannerText={t('cheapest_products.best_food_deals')} hasButtons={false} />
      <Reviews />
    </Container>
  );
};

export default Homepage;

// eslint-disable-next-line react-refresh/only-export-components
export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      products: products,
      bestSelledProduct: bestSelledProduct,
    },
  };
};
