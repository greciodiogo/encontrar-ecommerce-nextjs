import React from 'react';

export const WhyUs = () => {
  const url = 'assets_ecommerce/svg';

  const whyUsJson = [
    {
      icon: 'Icon - Shipping.png',
      name: 'Entrega Rápida',
      description: 'Entregamos os produtos directamente na sua morada.',
    },
    {
      icon: 'call_center-black.png',
      name: 'Suporte',
      description: 'Linha de contato sempre pronta para lhe ajudar',
    },
    {
      icon: 'Icons - Payment.png',
      name: 'Facilidade de Pagamentos',
      description: 'Opções de pagamentos como Fasmapay, Express e Cash',
    },
    {
      icon: 'KeyReturn.png',
      name: 'Devolução',
      description: 'Teste e devolução do produto a disposição do cliente',
    },
  ];
  return (
    <div className="whyUs">
      <div className="whyUs_container">
        <h4>Porque escolher a Encontrar para comprar os seus produtos?</h4>
        <div className="wrapper">
          {whyUsJson.map((item, index) => (
            <div className="box" key={index}>
              <i>
                <img src={`${url}/${item.icon}`} alt={item.name} />
              </i>
              <p>{item.name}</p>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
