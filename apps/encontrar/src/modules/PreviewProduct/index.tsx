import React, { useState } from 'react';

import { ProductDetail as Details, ShowProductBanner } from 'components';
import { Container } from 'components/Container';
import { RootState } from 'types/product';

import { useAppSelector } from '../../hooks';

import { CheckoutInfo } from './CheckoutInfo';
import { FeatureInfo } from './FeatureInfo';
import { ReviewForm } from './ReviewsForm';
import { ReviewsInfo } from './ReviewsInfo';
import { ShippingInfo } from './ShippingInfo';
import { TechnicalInfo } from './TechnicalInfo';

export const ProductDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const product = props.product;
  const product = useAppSelector((state: RootState) => state.products.currentItem);

  const products = [{ ...product }];

  // const { name, banner } = product;
  return (
    <Container useStyle={false}>
      <div className="productDetail">
        <div className="productDetail__container">
          <div className="row">
            <ShowProductBanner />
            <Details />
          </div>
          <CheckoutInfo />
          <div className="wrapper-2">
            <TechnicalInfo />
            <div className="row-2">
              <FeatureInfo />
              <ShippingInfo />
            </div>
            <ReviewsInfo setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
      {/* <CheapestProducts /> */}
      <ReviewForm products={products} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Container>
  );
};
