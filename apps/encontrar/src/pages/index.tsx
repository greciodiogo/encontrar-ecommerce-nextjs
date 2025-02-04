import type { NextPage } from 'next';
import React from 'react';

import {
  BestSelledProducts,
  BrandNew,
  Categories,
  CheapestProducts,
  Framer,
  Products,
  Reviews,
  WhyUs,
} from 'components';

type Data = {
  title: string;
  picture: string;
};

type PropsType = {
  banner?: Array<Data>;
};

const Homepage: NextPage<PropsType> = () => {
  return (
    <div>
      <Categories />
      <Framer />
      <Products />
      <WhyUs />
      <BestSelledProducts />
      <CheapestProducts />
      <BrandNew />
      <Reviews />
    </div>
  );
};

export default Homepage;
