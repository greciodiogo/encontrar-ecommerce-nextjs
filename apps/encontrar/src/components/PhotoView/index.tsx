import Image from 'next/image';
import { useState } from 'react';

import { PhotoProps, ProductDTO } from 'types/product';
import { BASE_URL } from './../../services/apiService';
export const ProductImage = ({ product, photoItem }: { product: ProductDTO; photoItem?: PhotoProps }) => {
  const [loaded, setLoaded] = useState(false);

  const { id, photos, photosOrder } = product;

  // Se o parâmetro photoItem for passado, usamos ele diretamente
  const selectedPhoto = photoItem
    ? photoItem
    : (() => {
        if (photosOrder && photosOrder.trim() !== '') {
          const firstPhotoId = parseInt(photosOrder.split(',')[0], 10);
          return photos?.find((ph) => ph.id === firstPhotoId);
        }
        return photos?.[0];
      })();

  // Construção segura da URL
  const photoUrl = selectedPhoto
    ? `${BASE_URL}/products/${String(id)}/photos/${String(selectedPhoto.id)}`
    : '/assets_ecommerce/products/sem-foto.webp';

  return (
    <Image
      src={photoUrl}
      alt="Produto"
      blurDataURL={selectedPhoto?.placeholderBase64}
      height={160}
      width={100}
      priority
      className={`image ${loaded ? 'loaded' : ''}`}
      onLoadingComplete={() => setLoaded(true)}
    />
  );
};
