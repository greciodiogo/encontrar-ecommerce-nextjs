import { useRouter } from 'next/router';
import React from 'react';

export const EmptyCart = () => {
  const router = useRouter();
  const url = 'assets_ecommerce/svg';

  const handleStartBuying = () => {
    void router.push('/');
  };
  return (
    <div className="emptyCart">
      <div className="emptyCart__container">
        <div className="content">
          <h2>
            <span>O SEU CARRINHO DE COMPRAS ESTÁ VAZIO</span>
            <i>
              <img src={`${url}/cart.png`} alt="cart" />
            </i>
          </h2>
          <span>Clique no botão abaixo e continue explorando</span>
          <button onClick={handleStartBuying}>
            Explorar Produtos
            <i>
              <img src={`${url}/ArrowRight.png`} alt="ArrowRight" />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};
