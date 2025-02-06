import React from 'react';

import { addToCart } from 'actions/products';

import { useAppDispatch, useAppSelector } from '../../hooks';
// import { addToCart } from "../../actions/products";

export const SubmitButton = ({ title, svg, outlined = false }: { title: string; svg?: string; outlined?: boolean }) => {
  const url = 'assets_ecommerce';
  const dispatch = useAppDispatch();
  const product = useAppSelector((state: any) => state.products.currentItem);

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
    // setShowCheckout(true);
  };
  return (
    <button
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      className={`submitButton ${outlined && 'outlined'}`}
      type="submit"
      onClick={() => handleAddToCart(product.id)}
    >
      {title}
      {svg && (
        <i>
          <img src={`${url}/svg/${svg}.png`} alt="star" />
        </i>
      )}
    </button>
  );
};
