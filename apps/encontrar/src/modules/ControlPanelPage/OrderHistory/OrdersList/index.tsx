import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { useAppSelector } from 'hooks';
import { RootState } from 'types/product';

export const OrderList = () => {
  const router = useRouter();
  const order = useAppSelector((state: RootState) => state.products.order);

  const handleViewDetails = (id: string) => {
    void router.push(`/control-panel/order-history/${id}`);
  };

  return (
    <div className="orderList">
      <table className="table table-hover table-bordered table-striped text-center m-0 exportAsXLSXCliente">
        <thead>
          <tr>
            <th>ID do Pedido</th>
            <th>Estado</th>
            <th>Data</th>
            <th>Total</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#96459761</td>
            <td className="coloured">{order?.estado}</td>
            <td>{order?.created_at.toLocaleString()}</td>
            <td>2999 Kz (5 Produtos)</td>
            <td className="coloured-2" onClick={() => handleViewDetails('96459761')}>
              Ver Detalhes
              <i>
                <FaArrowRight size={12} fill="#E8AA1D" />
              </i>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="pagintation__container">
        <Pagination count={1} color="primary" />
      </div>
    </div>
  );
};
