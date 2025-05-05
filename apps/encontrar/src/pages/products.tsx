import React from 'react';

import { ProductsPage } from 'modules/ProductsPage';
import { Categories } from 'components';

const Products = () => {
  return (
    <>
      <Categories />
      <ProductsPage />
    </>
  );
};

export default Products;
