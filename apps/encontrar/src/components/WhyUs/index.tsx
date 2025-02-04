import React from 'react';

export const WhyUs = () => {
  const url = 'assets_ecommerce/svg';

  const whyUsJson = [
    {
      icon: 'Icon - Shipping.png',
      name: 'Envio Gratuíto',
      description: 'Na maioria dos items',
    },
    {
      icon: 'Icon - Shipping.png',
      name: 'Envio Gratuíto',
      description: 'Na maioria dos items',
    },
    {
      icon: 'Icon - Shipping.png',
      name: 'Facilidade de Pagamentos',
      description: 'Na maioria dos items',
    },
    {
      icon: 'Icon - Shipping.png',
      name: 'Envio Gratuíto',
      description: 'Na maioria dos items',
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
