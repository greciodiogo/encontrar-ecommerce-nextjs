import React from 'react';

import { CheapestProducts, Framer, OtherProducts, Products, Reviews, WhyUs } from 'components';
import { Container } from 'components/Container';
import { products } from 'fixture/ecommerceData';
// import { useProductContext } from 'hooks/useProductContext';
import { useAuth } from 'hooks/useAuth';

export const Homepage = () => {
  const { isClient } = useAuth();

  const topExpensiveDrinks = [...products]
    .filter((prod) => prod.category === 'Bebidas')
    .sort((a_, b_) => b_.price - a_.price)
    .slice(0, 8);

  const topExpensiveElectrics = [...products]
    .filter((prod) => prod.category === 'Eletrônicos')
    .sort((a_, b_) => b_.price - a_.price)
    .slice(0, 8);

  const randomPopularProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 8);

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }
  return (
    <Container useStyle={false}>
      <Framer />
      <Products />
      <WhyUs />
      {/* <BestSelledProducts bestSelledProduct={bestSelledProduct} products={props.products} /> */}
      <CheapestProducts products={topExpensiveDrinks} bannerText="Melhores Negócios em Bebidas" />
      <CheapestProducts products={randomPopularProducts} bannerText="Produtos mais Populares" />
      <OtherProducts
        products={topExpensiveElectrics}
        bannerText="Melhores Negócios em Eletrodomésticos"
        hasButtons={false}
      />
      <Reviews />
    </Container>
  );
};
