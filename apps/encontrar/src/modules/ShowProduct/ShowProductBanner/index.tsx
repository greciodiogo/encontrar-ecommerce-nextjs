import React, { useState } from 'react';

type ShowProductBannerProps = {
  product: { name?: string; image?: string; images?: Array<string> };
};

export const ShowProductBanner = (props: ShowProductBannerProps) => {
  const url = 'assets_ecommerce';
  const { name, image, images } = props.product;
  const [selectedImage, setSelectedImage] = useState(image);

  return (
    <div className="showProductBanner">
      <div className="item-picture">
        <img src={`${url}/products/${image ?? 'macbook.png'}`} alt={name} />
      </div>

      {/* Thumbnails */}
      {images && (
        <div className="thumbnail-container">
          {images.map((im, index) => (
            <button onClick={() => setSelectedImage(im)} key={index} className={selectedImage === im ? 'active' : ''}>
              <img src={`${url}/products/${im}`} alt={name} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
