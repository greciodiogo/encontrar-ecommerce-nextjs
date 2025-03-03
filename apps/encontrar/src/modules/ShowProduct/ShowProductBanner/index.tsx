import Image from 'next/image';
import React, { useState } from 'react';

import { useAuth } from 'hooks/useAuth';

type ShowProductBannerProps = {
  product: { name?: string; image?: string; images?: Array<string> };
};

export const ShowProductBanner = (props: ShowProductBannerProps) => {
  const { isClient } = useAuth();
  const url = 'assets_ecommerce';
  const { name, image = '', images = [] } = props.product;
  const [selectedImage, setSelectedImage] = useState(image || 'sem-foto.webp');

  if (!isClient) return null;
  return (
    <>
      {name && (
        <div className="showProductBanner">
          <div className="item-picture">
            <Image
              src={`/${url}/products/${selectedImage}`}
              alt={name}
              // priority={true}
              blurDataURL="www.google.com"
              placeholder="blur"
              height={300}
              width={250}
              objectFit="contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="thumbnail-container">
            {images.map((im, index) => (
              <button onClick={() => setSelectedImage(im)} key={index} className={selectedImage === im ? 'active' : ''}>
                <Image
                  src={`/${url}/products/${im}`}
                  alt={im}
                  blurDataURL="www.google.com"
                  placeholder="blur"
                  height={70}
                  width={70}
                  objectFit="contain"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
