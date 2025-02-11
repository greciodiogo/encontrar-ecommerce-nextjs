import type { GetStaticProps, NextPage } from 'next';
import React from 'react';

import {
  CheapestProducts,
  CheckoutInfo,
  FeatureInfo,
  ReviewsInfo,
  ShippingInfo,
  ShowProductBanner,
  ProductDetail as Details,
  TechnicalInfo,
} from 'components';
import { cartList } from 'fixture/ecommerceData';
import { ProductDetailProps, RootState } from 'types/product';

import { useAppSelector } from '../hooks';

const ProductDetail: NextPage<ProductDetailProps> = () => {
  // const product = props.product;
  const product = useAppSelector((state: RootState) => state.products.currentItem);
  // const { name, banner } = product;
  return (
    <>
      {product && (
        <>
          <div className="productDetail">
            <div className="productDetail__container">
              <div className="row">
                <ShowProductBanner product={{ name: product.name, image: product.image }} />
                <Details product={product} />
              </div>
              <CheckoutInfo />
              <div className="wrapper-2">
                <TechnicalInfo />
                <div className="row-2">
                  <FeatureInfo />
                  <ShippingInfo />
                </div>
                <ReviewsInfo />
              </div>
            </div>
          </div>
          <CheapestProducts />
        </>
      )}
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
