import type { GetStaticProps, NextPage } from 'next';
import React from 'react';

import { CheapestProducts, ShowProductBanner, ProductDetail as Details } from 'components';
import { cartList } from 'fixture/ecommerceData';
import { ProductDetailProps, RootState } from 'types/product';

import { useAppSelector } from '../hooks';

const ProductDetail: NextPage<ProductDetailProps> = () => {
  // const product = props.product;
  const product = useAppSelector((state: RootState) => state.products.currentItem);
  // const { name, banner } = product;
  return (
    <>
      <div className="productDetail">
        <div className="productDetail__container">
          <div className="row">
            <ShowProductBanner product={{ name: product.name, banner: product.banner }} />
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
