import React from 'react';

export const FeatureInfo = () => {
  const featuresList = [
    { title: 'Garantia gratuita de 1 ano', icon: 'Medal.png' },
    { title: 'Envio gratuito e entrega rápida', icon: 'Truck.png' },
    { title: 'Garantia de devolução do dinheiro de 100%', icon: 'Handshake.png' },
    { title: 'Suporte ao cliente 24/7', icon: 'Headphones.png' },
    { title: 'Método de pagamento seguro', icon: 'CreditCard.png' },
  ];
  return (
    <div className="featureInfo">
      <h4>Feature</h4>
      {featuresList.map((item, index) => (
        <p key={index}>
          <i>
            <img src={`/assets_ecommerce/svg/${item.icon}`} alt={item.icon} />
          </i>
          {item.title}
        </p>
      ))}
    </div>
  );
};
