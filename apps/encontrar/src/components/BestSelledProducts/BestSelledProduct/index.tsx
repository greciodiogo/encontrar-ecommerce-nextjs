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
  hasStars = true,
  hasButtons = true,
  hasDescription = false,
}: ProductTypeProps) => {
  const { t } = useTranslation('common'); // Certifique-se de que o namespace está correto
  const productCart = useAppSelector((state: RootState) => state.products.cart);
  const { id, image, name, price, promotional_price, about, is_promotion } = product;
  const isProductInCart = productCart.some((item) => item.id === id);
  const fnService = new FnService();

  const handleAddToCartClick = (event: React.MouseEvent<HTMLAnchorElement>, id = 0) => {
    event.preventDefault();
    event.stopPropagation();
    handleAddToCart?.(id);
  };

  const calculate_promotion = (price: number, promotional_price: number) => {
    const discount = ((price - promotional_price) / price) * 100;
    return `${fnService.numberFormat(discount)}% OFF`;
  };

  return (
    <button
      className={`bestselled_product category-item ${hasButtons ? 'main-hover' : 'secondary-hover'}`}
      onClick={() => handlepreviewProduct(product)}
    >
      {/* <a className="addCartBtn">
        <i>
          <img src={`/assets_ecommerce/svg/Heart.png`} alt="Heart" />
        </i>
      </a> */}
      {is_promotion === true && promotional_price !== undefined && promotional_price > 0 && (
        <i className="promotion_badget">{calculate_promotion(price ?? 0, promotional_price)}</i>
      )}
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
        {hasStars && (
          <div className="star_container">
            {[1, 2, 3, 4].map((__, index) => (
              <i key={index}>
                <StarIcon fontSize="small" htmlColor="#EBC80C" />
              </i>
            ))}
          </div>
        )}
        <a className="product_name product-description">{name}</a>
        <p>
          {is_promotion && promotional_price !== undefined && promotional_price > 0 ? (
            <>
              <span className="promo">{fnService.numberFormat(price ?? 0)}Kz</span>
              <span>{fnService.numberFormat(promotional_price)}Kz</span>
            </>
          ) : (
            <span>{fnService.numberFormat(price ?? 0)}Kz</span>
          )}
        </p>
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
