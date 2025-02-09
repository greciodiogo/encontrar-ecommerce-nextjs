import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { BestSelledProducts, CartItem, CartResume, CartTitle, CheapestProducts, EmptyCart } from 'components';
import { cartList } from 'fixture/ecommerceData';

import { useAppSelector } from '../hooks';

// import { cartList } from '../ecommerceData.js';
const Cart = () => {
  const productCart = useAppSelector((state: any) => state.products.cart);
  const cart = cartList;
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const TOTAL_ITEMS_CART = productCart.length;

  if (!TOTAL_ITEMS_CART)
    return (
      <>
        <EmptyCart />
        <BestSelledProducts bannerText="Quer sugestões para o seu carrinho ? Escolha abaixo" />
      </>
    );

  return (
    <>
      <div className="cart">
        <div className="cart_container">
          <CartTitle qtdItems={TOTAL_ITEMS_CART} />
          <div className="row">
            <div className="wrapper">
              {productCart.map((cartItem, index) => (
                <CartItem cart={cartItem} cart={cartItem} key={index} setTotal={setTotal} />
              ))}
            </div>
            <CartResume />
          </div>
        </div>
      </div>
      <CheapestProducts />
    </>
  );
};

export default Cart;
