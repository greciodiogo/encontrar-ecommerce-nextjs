import React from 'react';

import { Categories, CheapestProducts, Framer, Products, Reviews, WhyUs } from 'components';
import { Container } from 'components/Container';
// import { bestSelledProduct, products } from 'fixture/ecommerceData';
// import { ProductDTO } from 'types/product';

export const Homepage = () => {
  return (
    <Container useStyle={false}>
      <Categories />
      <Framer />
      <Products />
      <WhyUs />
      {/* <BestSelledProducts bestSelledProduct={bestSelledProduct} products={props.products} /> */}
      <CheapestProducts />
      <CheapestProducts bannerText="Produtos mais Populares" />
      <CheapestProducts bannerText="Melhores Negócios em Alimentos." hasButtons={false} />
      <Reviews />
    </Container>
  );
};
