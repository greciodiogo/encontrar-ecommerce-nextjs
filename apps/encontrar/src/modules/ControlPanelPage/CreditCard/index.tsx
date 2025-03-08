import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

export const CreditCardPage = () => {
  const router = useRouter();
  const { t } = useTranslation('control-panel'); // 👈 Namespace para traduções

  const handleClick = () => {
    void router.push('/products');
  };

  return (
    <>
      <Panel>
        <Panel.Icon>CreditCard-dark</Panel.Icon>
        <Panel.Title>{t('creditCard.title')}</Panel.Title>
        <Panel.Description>{t('creditCard.description')}</Panel.Description>
      </Panel>
      <div className="creditCard">
        <EmptyPanelItem title={t('creditCard.emptyMessage')} type="credit-card" handleClick={handleClick} />
      </div>
    </>
  );
};
