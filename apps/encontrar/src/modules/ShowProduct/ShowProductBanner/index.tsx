import Image from 'next/image';
import React, { useState } from 'react';

import { useAppSelector } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { RootState } from 'types/product';

export const ShowProductBanner = () => {
  const { isClient } = useAuth();
  const product = useAppSelector((state: RootState) => state.products.currentItem);
  const { name, image = '', images = [] } = product ?? {};
  const [selectedImage, setSelectedImage] = useState(image || 'sem-foto.webp');

  if (!isClient) return null;
  return (
    <>
      {name && (
        <div className="showProductBanner">
          <div className="item-picture">
            <Image
              src={`/assets_ecommerce/products/${selectedImage}`}
              alt={name}
              // priority={true}
              blurDataURL="www.google.com"
              placeholder="blur"
              height={300}
              width={100}
              // objectFit="contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="thumbnail-container">
            {images.map((im, index: number) => (
              <button onClick={() => setSelectedImage(im)} key={index} className={selectedImage === im ? 'active' : ''}>
                <Image
                  src={`/assets_ecommerce/products/${im}`}
                  alt={im}
                  blurDataURL="www.google.com"
                  placeholder="blur"
                  height={70}
                  width={70}
                  // objectFit="contain"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
