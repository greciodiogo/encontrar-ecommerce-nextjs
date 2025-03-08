import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';
import { useAppSelector } from 'hooks';
import { RootState } from 'types/product';

import { OrderList } from './OrdersList';

export const OrderHistoryPage = () => {
  const { t } = useTranslation('control-panel'); // 👈 Namespace para traduções
  const order = useAppSelector((state: RootState) => state.products.order);
  const router = useRouter();

  const handleClick = () => {
    void router.push('/products');
  };

  return (
    <>
      <Panel>
        <Panel.Icon>Storefront</Panel.Icon>
        <Panel.Title>{t('orderHistory.title')}</Panel.Title>
        <Panel.Description>{t('orderHistory.description')}</Panel.Description>
      </Panel>
      <div className="orderHistory">
        {order?.estado === 'ANDAMENTO' ? (
          <OrderList />
        ) : (
          <EmptyPanelItem title={t('orderHistory.emptyTitle')} type="order-history" handleClick={handleClick} />
        )}
      </div>
    </>
  );
};
