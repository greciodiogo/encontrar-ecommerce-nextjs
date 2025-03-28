/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';

import { ProductImage } from 'components/PhotoView';
import { useAppSelector } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { PhotoProps, RootState } from 'types/product';

export const ShowProductBanner = () => {
  const { isClient } = useAuth();
  const product = useAppSelector((state: RootState) => state.products.currentItem);
  const { name, photos } = product ?? {};
  const [selectedImage, setSelectedImage] = useState<PhotoProps | undefined>(photos?.[0]); // Começa com a primeira imagem

  if (!isClient) return null;
  return (
    <>
      {name && (
        <div className="showProductBanner">
          <div className="item-picture">
            <ProductImage product={product!} photoItem={selectedImage} />
          </div>

          {/* Thumbnails */}
          <div className="thumbnail-container">
            {photos?.map((im, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(im)} // Atualiza a imagem ao clicar
                className={selectedImage === im ? 'active' : ''}
              >
                <ProductImage product={product!} photoItem={im} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
