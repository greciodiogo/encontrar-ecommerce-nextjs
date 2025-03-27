/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Image from 'next/image';
import React, { useState } from 'react';

import { ProductImage } from 'components/PhotoView';
import { useAppSelector } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { RootState } from 'types/product';

export const ShowProductBanner = () => {
  const { isClient } = useAuth();
  const product = useAppSelector((state: RootState) => state.products.currentItem);
  const { name, photos, image = '', images = [] } = product ?? {};
  const [selectedImage, setSelectedImage] = useState(image || 'sem-foto.webp');
  const [loaded, setLoaded] = useState(false);

  if (!isClient) return null;
  return (
    <>
      {name && (
        <div className="showProductBanner">
          <div className="item-picture">
            {/* <Image
              src={`/assets_ecommerce/products/${selectedImage}`}
              alt={name}
              // priority={true}
              blurDataURL="www.google.com"
              placeholder="blur"
              height={300}
              width={100}
              className={`image ${loaded ? 'loaded' : ''}`}
              onLoadingComplete={() => setLoaded(true)}
              // objectFit="contain"
            /> */}
            <ProductImage product={product!} />
          </div>

          {/* Thumbnails */}
          <div className="thumbnail-container">
            {photos?.map((im, index: number) => (
              <button onClick={() => setSelectedImage(im)} key={index} className={selectedImage === im ? 'active' : ''}>
                {/* <Image
                  src={`/assets_ecommerce/products/${im}`}
                  alt={im}
                  blurDataURL="www.google.com"
                  placeholder="blur"
                  height={70}
                  width={70}
                  className={`image ${loaded ? 'loaded' : ''}`}
                  onLoadingComplete={() => setLoaded(true)}
                  // objectFit="contain"
                /> */}
                <ProductImage product={product!} photoItem={im} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
