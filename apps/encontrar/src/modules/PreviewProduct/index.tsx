import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { CheapestProducts, ProductDetail as Details, ShowProductBanner } from 'components';
import { RootState } from 'types/product';

import { useAppSelector } from '../../hooks';

import { CheckoutInfo } from './CheckoutInfo';
import { FeatureInfo } from './FeatureInfo';
import { ReviewsInfo } from './ReviewsInfo';
import { ShippingInfo } from './ShippingInfo';
import { TechnicalInfo } from './TechnicalInfo';

export const ProductDetailPage = () => {
  const router = useRouter();
  // const product = props.product;
  const product = useAppSelector((state: RootState) => state.products.currentItem);

  useEffect(() => {
    if (!product || (!product.image && (!product.images || product.images.length === 0))) {
      void router.push('/'); // Redireciona para a home se não houver produto
    }
  }, [product, router]);

  if (!product) return null;

  // const { name, banner } = product;
  return (
    <>
      <div className="productDetail">
        <div className="productDetail__container">
          <div className="row">
            <ShowProductBanner product={{ name: product.name, image: product.image, images: product.images }} />
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
  );
};
