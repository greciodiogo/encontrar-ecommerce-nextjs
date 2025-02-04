import type { GetStaticProps, NextPage } from 'next';
import React from 'react';

import { CheapestProducts, ShowProductBanner, ProductDetail as Details } from 'components';
import { cartList } from 'fixture/ecommerceData';
import { ProductDetailProps } from 'types/product';

const ProductDetail: NextPage<ProductDetailProps> = (props) => {
  const product = props.product;

  const { name, banner } = product;

  return (
    <>
      <div className="productDetail">
        <div className="productDetail__container">
          <div className="row">
            <ShowProductBanner product={{ name: name, picture: banner }} />
            <Details product={product} />
          </div>
          <div className="row"></div>
        </div>
      </div>
      <CheapestProducts />
    </>
  );
};

export default ProductDetail;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      product: cartList.data[0],
    },
  };
};
