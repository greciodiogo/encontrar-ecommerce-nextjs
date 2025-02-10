import type { GetStaticProps, NextPage } from 'next';
import React from 'react';

import { BestSelledProducts, Categories, CheapestProducts, Framer, Products, Reviews, WhyUs } from 'components';
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

const Homepage: NextPage<PropsType> = (props) => {
  return (
    <div>
      <Categories />
      <Framer />
      <Products />
      <WhyUs />
      <BestSelledProducts bestSelledProduct={bestSelledProduct} products={props.products} />
      <CheapestProducts />
      <Reviews />
    </div>
  );
};

export default Homepage;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      products: products,
      bestSelledProduct: bestSelledProduct,
    },
  };
};
