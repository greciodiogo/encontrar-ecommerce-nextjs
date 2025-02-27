import React from 'react';

import { Panel } from 'components/ControlPanel';
import { useAuth } from 'hooks/useAuth';

export const AccountConfigPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Panel>
        <Panel.Icon>Stack</Panel.Icon>
        <Panel.Title>Configurações da Conta</Panel.Title>
        <Panel.Description>Edite seu nome, endereço, email e password</Panel.Description>
      </Panel>
      <div className="accountConfig">
        <div className="group">
          <h4>Nome</h4>
          <p>{user?.name}</p>
        </div>
        <div className="group">
          <h4>Email</h4>
          <p>{user?.email}</p>
        </div>
        <div className="group">
          <h4>Password</h4>
          <p>***************</p>
        </div>
        <button>
          Editar Detalhes da Conta
          <i>
            <img src={`/assets_ecommerce/svg/ArrowRight-3.png`} alt="ArrowRight" />
          </i>
        </button>
      </div>
    </>
  );
};
