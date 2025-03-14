// import { useRouter } from 'next/router';
import React from 'react';

import styles from './../../../styles/OrderDetails.module.css';

// import { Container } from 'components/Container';
// import { FnService } from 'shared/utils/FnService';

const OrderDetails = () => {
  // const fnService = new FnService();
  // const router = useRouter();
  // const { id } = router.query; // Obtém o ID da rota dinâmica
  return (
    <div className={styles.container}>
      <h2>DETALHES DO PEDIDO</h2>
      <div className={styles.orderHeader}>
        <div>
          <h3>#96459761</h3>
          <p>4 Produtos - Pedido efetuado no dia 11 Fev, 2025 às 7:32</p>
          <p>
            Order expected arrival <strong>23 Jan, 2021</strong>
          </p>
        </div>
        <div className={styles.price}>2999.00KZS</div>
      </div>

      <div className={styles.progress}>
        <span className={styles.completed}>Pedido Realizado</span>
        <span className={styles.active}>Embalagem</span>
        <span>Em Rota</span>
        <span>Entregue</span>
      </div>

      <div className={styles.orderActivity}>
        <h3>Order Activity</h3>
        <ul>
          <li>
            <i>
              <img src="/assets_ecommerce/svg/verified_icon.png" alt="" />
            </i>{' '}
            O seu pedido foi entregue. Obrigado por comprar na Encontra!
          </li>
          <li>
            <i>
              <img src="/assets_ecommerce/svg/user_icon.png" alt="" />
            </i>{' '}
            O nosso entregador (John Wick) pegou o seu pedido para entrega.
          </li>
          <li>
            <i>
              <img src="/assets_ecommerce/svg/location_icon.png" alt="" />
            </i>{' '}
            O seu pedido chegou ao centro de distribuição final.
          </li>
          <li>
            <i>
              <img src="/assets_ecommerce/svg/maps_icon.png" alt="" />
            </i>{' '}
            O seu pedido está a caminho do centro de distribuição (última milha).
          </li>
          <li>
            <i>
              <img src="/assets_ecommerce/svg/check_icon.png" alt="" />
            </i>{' '}
            O seu pedido foi verificado com sucesso.
          </li>
          <li>
            <i>
              <img src="/assets_ecommerce/svg/schedule_icon.png" alt="" />
            </i>{' '}
            O seu pedido foi transferido.
          </li>
        </ul>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>PRODUCTS</th>
            <th>PREÇO</th>
            <th>QUANTIDADE</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="td-item">
                <img src="/assets_ecommerce/svg/PhoneCall.png" alt="" />
                <div>
                  <p>Electronico</p>
                  <span>Google Pixel 6 Pro - Telefone Android 5G</span>
                </div>
              </div>
            </td>
            <td>1499.5KZS</td>
            <td>x1</td>
            <td>1499.5KZS</td>
          </tr>
          <tr>
            <td>
              <div className="td-item">
                <img src="/assets_ecommerce/svg/PhoneCall.png" alt="" />
                <div>
                  <p>Electronico</p>
                  <span>Google Pixel 6 Pro - Telefone Android 5G</span>
                </div>
              </div>
            </td>
            <td>1499.5KZS</td>
            <td>x1</td>
            <td>1499.5KZS</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.addresses}>
        <div className={styles.address}>
          <h4>Endereço de Faturação</h4>
          <p>João Manuel</p>
          <p>Viana, Luanda Sul, Eng1 4</p>
          <p>Phone: 244923124098</p>
          <p>Email: joaomanuel@gmail.com</p>
        </div>
        <div className={styles.address}>
          <h4>Endereço de Entrega</h4>
          <p>João Manuel</p>
          <p>Viana, Luanda Sul, Eng1 4</p>
          <p>Phone: 244923124098</p>
          <p>Email: joaomanuel@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
