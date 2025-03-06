import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { useAuth } from 'hooks/useAuth';

export const EmptyCart = () => {
  const { isClient } = useAuth();
  const router = useRouter();

  const handleStartBuying = () => {
    void router.push('/products');
  };

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }
  return (
    <div className="emptyCart">
      <div className="emptyCart__container">
        <div className="content">
          <h2>
            <span>CARRINHO ESTÁ VAZIO</span>
            <i>
              <img src={`/assets_ecommerce/cart.png`} alt="cart" />
            </i>
          </h2>
          <span>Clique no botão abaixo e continue explorando</span>
          <button onClick={handleStartBuying}>
            Explorar Produtos
            <i>
              <FaArrowRight size={12} fill="white" />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};
