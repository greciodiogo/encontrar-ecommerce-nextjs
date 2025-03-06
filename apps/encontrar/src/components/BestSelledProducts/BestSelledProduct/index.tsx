import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { LuShoppingCart } from 'react-icons/lu';

import { useAppSelector } from 'hooks';
import { FnService } from 'shared/utils/FnService';
import { ProductTypeProps, RootState } from 'types/product';

export const BestSelledProduct = ({
  product,
  handleAddToCart,
  handlepreviewProduct,
  hasButtons = true,
  hasDescription = false,
}: ProductTypeProps) => {
  const { t } = useTranslation('common'); // Certifique-se de que o namespace está correto
  const productCart = useAppSelector((state: RootState) => state.products.cart);
  const { id, image, name, price, about } = product;
  const isProductInCart = productCart.some((item) => item.id === id);
  const fnService = new FnService();

  const handleAddToCartClick = (event: React.MouseEvent<HTMLAnchorElement>, id = 0) => {
    event.preventDefault();
    event.stopPropagation();
    handleAddToCart?.(id);
  };

  return (
    <button className="bestselled_product category-item" onClick={() => handlepreviewProduct(product)}>
      {/* <a className="addCartBtn">
        <i>
          <img src={`/assets_ecommerce/svg/Heart.png`} alt="Heart" />
        </i>
      </a> */}
      <div className="category_picture bestselled">
        <Image
          src={`/assets_ecommerce/products/${image ?? 'sem-foto.webp'}`}
          alt={name ?? 'sem-nome'}
          // priority={true}
          blurDataURL="www.google.com"
          placeholder="blur"
          height={160}
          width={100}
        />
      </div>
      <div className="content">
        <a className="product_name product-description">{name}</a>
        <div className="star_container">
          {[1, 2, 3, 4].map((__, index) => (
            <i key={index}>
              <StarIcon fontSize="small" htmlColor="#EBC80C" />
            </i>
          ))}
        </div>
        <p>{fnService.numberFormat(price ?? 0)}Kz</p>
        {hasDescription && <span>{about}</span>}
      </div>
      {hasButtons && (
        <a
          className="btn"
          href="#"
          role="button"
          tabIndex={0}
          onClick={(event) => handleAddToCartClick(event, id ?? 0)}
        >
          <i>
            <LuShoppingCart fill={isProductInCart ? 'white' : ''} size={20} />
          </i>
          {!isProductInCart ? t('products.add_to_cart') : t('products.added_to_cart')}
        </a>
      )}
    </button>
  );
};
