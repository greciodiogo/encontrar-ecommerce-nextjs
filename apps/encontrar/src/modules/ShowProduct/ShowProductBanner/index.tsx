import Image from 'next/image';
import React, { useState } from 'react';

type ShowProductBannerProps = {
  product: { name?: string; image?: string; images?: Array<string> };
};

export const ShowProductBanner = (props: ShowProductBannerProps) => {
  const url = 'assets_ecommerce';
  const { name, image = '', images = [] } = props.product;
  const [selectedImage, setSelectedImage] = useState(image);

  return (
    <>
      {name && (
        <div className="showProductBanner">
          <div className="item-picture">
            <Image
              src={`/${url}/products/${selectedImage} ?? 'macbook.png'`}
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
                <img src={`${url}/products/${im}`} alt={im} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
