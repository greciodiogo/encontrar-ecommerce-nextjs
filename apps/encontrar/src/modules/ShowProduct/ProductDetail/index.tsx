import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { addToCart } from 'actions/products';
import { useAuth } from 'hooks/useAuth';
import { ChangeQuantity } from 'shared/components/ChangeQuantity';
import { SubmitButton } from 'shared/components/SubmitButton';
import { FnService } from 'shared/utils/FnService';
import { RootState } from 'types/product';

import { useAppDispatch, useAppSelector } from '../../../hooks';

export const ProductDetail = () => {
  const fnService = new FnService();
  const product = useAppSelector((state: RootState) => state.products.currentItem);

  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { name, availability, category, price, brand, id = 0, qty } = product ?? {};
  const { isClient } = useAuth();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCheckoutBtnClick = () => {
    void router.push('/cart');
  };

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
    // setShowCheckout(true);() => handleAddToCart(product.id)
  };

  const handleAdjustQtyCart = (id: number, value: number) => {
    if (value < 1) return; // Evita valores negativos ou zero
    // dispatch(adjustQty(id, value));
    setQuantity(value);
  };

  if (!isClient) return null;

  return (
    <div className="wrapper">
      <div className="star_container">
        {[1, 2, 3, 4].map((__, index) => (
          <i key={index}>
            <StarIcon fontSize="small" htmlColor="#EBC80C" />
          </i>
        ))}
        <span className="rating">4.7 Star Rating</span>
        <span className="totalFeedback">(21 User feedback)</span>
      </div>
      <h3>{name}</h3>
      <div className="wrap">
        <p>
          Sku: <span>{id}</span>
        </p>
        <p>
          Disponibilidade: <span>{availability}</span>
        </p>
        <p>
          Marca: <span>{brand}</span>
        </p>
        <p>
          Categoria: <span>{category}</span>
        </p>
      </div>
      <div className="product_price">
        {fnService.numberFormat(price ?? 0)} <span>Kz</span>
      </div>
      <div className="cart-item-btn">
        <div className="change_quantity">
          <ChangeQuantity id={id} qty={qty ?? quantity} onAdjustQty={handleAdjustQtyCart} />
          {product?.id !== undefined && (
            <SubmitButton onClick={() => handleAddToCart(product.id ?? 0)} title="Adicionar ao Carrinho" svg="cart-2" />
          )}
          <SubmitButton onClick={handleCheckoutBtnClick} title="Comprar agora" outlined={true} />
        </div>
      </div>
    </div>
  );
};
