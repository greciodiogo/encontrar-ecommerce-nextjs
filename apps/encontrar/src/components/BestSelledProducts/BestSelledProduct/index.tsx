import StarIcon from '@mui/icons-material/Star';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { LuShoppingCart } from 'react-icons/lu';

import { ProductImage } from 'components/PhotoView';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchProductRatings } from 'actions/products';
import { FnService } from 'shared/utils/FnService';
import { ProductTypeProps, RootState } from 'types/product';

export const BestSelledProduct = ({
  product,
  handleAddToCart,
  handlepreviewProduct,
  hasStars = true,
  is_promotion = false,
  hasButtons = true,
  hasDescription = false,
}: ProductTypeProps) => {
  const { t } = useTranslation('common'); // Certifique-se de que o namespace está correto
  const dispatch = useAppDispatch();
  const productCart = useAppSelector((state: RootState) => state.products.cart);
  const ratings = useAppSelector((state: RootState) =>
    state.products.ratings && product.id ? state.products.ratings[product.id] : [],
  );

  const { id, name, price, promotional_price, stock = 1, description } = product;
  const isProductInCart = productCart.some((item) => item.id === id);
  const fnService = new FnService();

  useEffect(() => {
    if (typeof id === 'number' && id > 0) {
      dispatch(fetchProductRatings(id));
    }
  }, [id, dispatch]);

  const averageRating =
    (ratings || []).length > 0
      ? Math.round((ratings || []).reduce((sum, review) => sum + review.rating, 0) / (ratings || []).length)
      : 5; // Default to 5 stars if no ratings

  const handleAddToCartClick = (event: React.MouseEvent<HTMLAnchorElement>, id = 0) => {
    event.preventDefault();
    event.stopPropagation();
    const cartItem = productCart.find((item) => item.id === id);
    const currentQtyInCart = cartItem?.qty ?? 0;
    const productStock = stock ?? 0; // garante que existe stock

    if (currentQtyInCart >= productStock) {
      alert('Quantidade indisponível em estoque.');
      return;
    }

    handleAddToCart?.(id, product);
  };

  const calculate_promotion = (price: number, promotional_price: number) => {
    const discount = ((price - promotional_price) / price) * 100;
    // return `${fnService.numberFormat(discount)}% OFF`;
    return `OFF`;
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
      {is_promotion === true && (
        <i className="promotion_badget">{calculate_promotion(price ?? 0, promotional_price ?? 0)}</i>
      )}
      <div className="category_picture bestselled">
        <ProductImage product={product} />
      </div>
      <div className="content">
        {hasStars && (
          <div className="star_container">
            {[1, 2, 3, 4, 5].map((star) => (
              <i key={star}>
                <StarIcon fontSize="small" htmlColor={star <= averageRating ? '#EBC80C' : '#ccc'} />
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
        {hasDescription && <span>{description}</span>}
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
