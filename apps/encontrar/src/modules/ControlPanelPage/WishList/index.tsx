import { useRouter } from 'next/router';
import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

export const WishListPage = () => {
  const title = 'Sua lista de Desejos encontra-se vazia';
  const router = useRouter();

  const handleClick = () => {
    void router.push('/products');
  };
  return (
    <>
      <Panel>
        <Panel.Icon>Heart</Panel.Icon>
        <Panel.Title>Lista de Desejos</Panel.Title>
        <Panel.Description>Consulte a sua lista de Desejos</Panel.Description>
      </Panel>
      <div className="wishList">
        <EmptyPanelItem title={title} type="wish-list" handleClick={handleClick} />
      </div>
    </>
  );
};
