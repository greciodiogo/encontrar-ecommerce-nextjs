import { useRouter } from 'next/router';

import React from 'react';

export const EmptyPanelItem = ({ title = 'histórico' }: { title: string }) => {
  const router = useRouter();
  const url = 'assets_ecommerce/svg';
  const children = 'ArrowRight';

  const handleStartBuying = () => {
    void router.push('/products');
  };

  return (
    <div className="emptyPanelItem">
      <h2>
        <span>{title}</span>
      </h2>
      <span>Clique abaixo para realizar uma compra</span>
      <button onClick={handleStartBuying}>
        Fazer uma Compra
        <i>
          <img src={`/assets_ecommerce/svg/ArrowRight.png`} alt="ArrowRight" />
        </i>
      </button>
    </div>
  );
};
