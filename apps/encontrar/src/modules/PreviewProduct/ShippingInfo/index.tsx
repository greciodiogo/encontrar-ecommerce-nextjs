import React from 'react';

export const ShippingInfo = () => {
  const shippingInfoList = [
    { title: 'Mensageiro:', description: '2 - 4 dias, envio gratuito' },
    { title: 'Envio Local:', description: 'até uma semana, 1200Kz' },
    { title: 'Encontrar Serviço:', description: '4 - 6 dias, 2500Kz' },
    { title: 'Outros Métodos:', description: '3 - 4 dias, 3000Kz' },
  ];
  return (
    <div className="shippingInfo">
      <h4>Shipping Information</h4>
      {shippingInfoList.map((item, index) => (
        <p key={index}>
          <span>{item.title}</span>
          {item.description}
        </p>
      ))}
    </div>
  );
};
