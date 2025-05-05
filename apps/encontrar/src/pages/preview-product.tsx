import React from 'react';

import { ProductDetailPage } from './../modules/PreviewProduct/index';
import { Categories } from 'components';

const ProductDetail = () => {
  return (
    <>
      <Categories />
      <ProductDetailPage />
    </>
  );
};

// Checkout.getLayout = (page: ReactElement) => <>{page}</>;

export default ProductDetail;
