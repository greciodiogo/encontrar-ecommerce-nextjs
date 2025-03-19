import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';

import { adjustQty, removeFromCart } from 'actions/products';
import { useAuth } from 'hooks/useAuth';
import { ChangeQuantity } from 'shared/components/ChangeQuantity';
import { FnService } from 'shared/utils/FnService';
import { CartItemProps } from 'types/product';

import { useAppDispatch } from '../../../hooks';

export const CartItem = (props: CartItemProps) => {
  const dispatch = useAppDispatch();
  const fnService = new FnService();
  const { t } = useTranslation('cart');

  const {
    name,
    image,
    id = 0,
    availability,
    category,
    brand,
    is_promotion,
    promotional_price,
    qty = 1,
    price = 0,
  } = props.cart;
  const { setTotal, setSubtotal } = props;
  const { isClient } = useAuth();
  const validatePromotion = is_promotion && promotional_price !== undefined && promotional_price > 0;
  const activePrice = validatePromotion ? promotional_price : price;
  const [localQty, setLocalQty] = useState(qty);

  useEffect(() => {
    const itemSubtotal = activePrice * localQty;

    setTotal((prevTotal) => Math.max(0, prevTotal + itemSubtotal));
    setSubtotal((prevSubtotal) => Math.max(0, prevSubtotal + itemSubtotal));

    return () => {
      setTotal((prevTotal) => Math.max(0, prevTotal - itemSubtotal));
      setSubtotal((prevSubtotal) => Math.max(0, prevSubtotal - itemSubtotal));
    };
  }, [activePrice, localQty, setTotal, setSubtotal]);

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  const handleAdjustQtyCart = (id: number, newQty: number) => {
    if (newQty < 1) return;

    setLocalQty(newQty);
    dispatch(adjustQty(id, newQty));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="cart-item">
      <div className="cart-item-picture">
        <img src={`/assets_ecommerce/products/${image ?? 'sem-foto.webp'}`} alt={name} />
      </div>
      <div className="cart-item-content">
        <h3>{name}</h3>
        <div className="wrap">
          <p>
            {t('cart_item.sku')}: <span>{id}</span>
          </p>
          <p className="wrapItemRight">
            {t('cart_item.availability')}: <span>{availability}</span>
          </p>
          <p>
            {t('cart_item.brand')}: <span>{brand}</span>
          </p>
          <p className="wrapItemRight">
            {t('cart_item.category')}: <span>{category}</span>
          </p>
        </div>
        <div className="wrapPrice">
          <p className="priceContainer">
            {t('cart_item.total_price')}: <span className="priceItem">{fnService.numberFormat(activePrice)}kz</span>
          </p>
        </div>
        <div className="cart-item-btn">
          <div className="change_quantity">
            <ChangeQuantity id={id} qty={localQty} onAdjustQty={handleAdjustQtyCart} />
          </div>
          <button className="remove_item" onClick={handleRemoveFromCart}>
            {t('cart_item.remove_button')}
          </button>
        </div>
      </div>
    </div>
  );
};
