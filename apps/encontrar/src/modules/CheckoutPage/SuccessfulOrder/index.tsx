import { useRouter } from 'next/router';
import React from 'react';

import { Container } from 'components/Container';

export const SuccessfulOrder = () => {
  const router = useRouter();
  const url = 'assets_ecommerce/svg';

  const handleStartBuying = () => {
    void router.push('/');
  };

  const handleSeeOrder = () => {
    void router.push('/control-panel/order-history');
  };
  return (
    <Container useStyle={false}>
      <div className="successfulOrder">
        <div className="successfulOrder__container">
          <div className="content">
            <div className="picture">
              <i>
                <img src={`${url}/CheckCircle.png`} alt="cart" />
              </i>
            </div>
            <h2>
              <span>O seu pedido foi realizado com sucesso</span>
            </h2>
            <span>O seu pedido já foi encaminhado para a entrega. Será contactado para confirma a solicitação</span>
            <div className="btn__container">
              <button onClick={handleStartBuying}>Voltar a Página Principal</button>
              <button className="outlined" onClick={handleSeeOrder}>
                Ver Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
