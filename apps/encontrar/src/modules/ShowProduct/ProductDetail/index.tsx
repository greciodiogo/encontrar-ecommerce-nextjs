import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { addToCart } from 'actions/products';
import { useAuth } from 'hooks/useAuth';
import { ChangeQuantity } from 'shared/components/ChangeQuantity';
import { SubmitButton } from 'shared/components/SubmitButton';
import { FnService } from 'shared/utils/FnService';
import { RootState, ProductDTO } from 'types/product';

import { useAppDispatch, useAppSelector } from '../../../hooks';

export const ProductDetail = () => {
  const fnService = new FnService();
  const product = useAppSelector((state: RootState) => state.products);
  const {
    name,
    description,
    price,
    is_promotion,
    promotional_price,
    stock = 1,
    id = 0,
    qty,
  } = product.currentItem ?? {};
  const [localQty, setLocalQty] = useState(1);
  const isProductInCart = product.cart.some((item) => item.id === id);
  const { t } = useTranslation('cart');
  const { isClient } = useAuth();
  const validatePromotion = is_promotion && promotional_price !== undefined && promotional_price > 0;
  const activePrice = validatePromotion ? promotional_price : price;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCheckoutBtnClick = () => {
    void router.push('/cart');
  };

  const handleAddToCart = (id: number) => {
    const cartItem = product.cart.find((item) => item.id === id);
    const currentQtyInCart = Number(cartItem?.qty ?? 0);
    const desiredQty = Number(qty ?? localQty) + currentQtyInCart;

    if (desiredQty > Number(stock ?? 0)) {
      alert('Quantidade indisponível em estoque.');
      return;
    }

    // pass the current product object so reducer can use it even if the product list
    // does not contain the current item
    dispatch(addToCart(id, Number(qty ?? localQty), product.currentItem as ProductDTO));
    // setShowCheckout(true);() => handleAddToCart(product.id)
  };

  const handleAdjustQtyCart = (id: number, newQty: number) => {
    if (newQty < 1) return;

    if (newQty > Number(stock ?? 0)) {
      alert('Quantidade indisponível em estoque.');
      return;
    }

    setLocalQty(newQty);
    // dispatch(adjustQty(id, newQty));
  };

  if (!isClient) return null;

  return (
    <div className="wrapper">
      <div className="star_container">
        {/* {[1, 2, 3, 4].map((__, index) => (
          <i key={index}>
            <StarIcon fontSize="small" htmlColor="#EBC80C" />
          </i>
        ))} */}
        {/* <span className="rating">4.7 Star Rating</span> */}
        {/* <span className="totalFeedback">(21 User feedback)</span> */}
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="product_price">
        {fnService.numberFormat(Number(activePrice ?? 0))} <span>Kz</span>
      </div>
      <div className="cart-item-btn">
        <div className="change_quantity">
          <ChangeQuantity id={Number(id)} qty={Number(qty ?? localQty)} onAdjustQty={handleAdjustQtyCart} />
          {product.currentItem?.id !== undefined && (
            <SubmitButton
              onClick={() => handleAddToCart(Number(product.currentItem?.id ?? 0))}
              title={!isProductInCart ? t('cart.add_to_cart') : t('cart.added_to_cart')}
              svg="cart-2"
              isProductInCart={isProductInCart}
            />
          )}
          <SubmitButton onClick={handleCheckoutBtnClick} title="Comprar agora" outlined={true} />
        </div>
      </div>
    </div>
  );
};
