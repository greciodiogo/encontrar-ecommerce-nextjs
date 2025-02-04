import React from 'react';

export const Framer = () => {
  const url = 'assets_ecommerce';

  return (
    <div className="framer">
      <div className="framer_container">
        <div className="wrapper">
          <div className="content">
            <div className="reviews_container">
              <div className="star_container">
                {[1, 2, 3, 4].map((_, index) => (
                  <i key={index}>
                    <img src={`${url}/svg/star.png`} alt="star" />
                  </i>
                ))}
              </div>
              <p>Feedbacks dos Nossos Clientes</p>
            </div>
            <h2>Descubra os eletrônicos mais incríveis e delícias à sua porta!</h2>
            <h4>
              Preparamos para si os melhores dispositivos eletrónicos a disposição do mercado, desde os iphones até
              samsungs e marcas como
            </h4>
            <div className="btn_container">
              <button className="">
                Explorar Produtos
                <i>
                  <img src={`${url}/svg/ArrowRight-3.png`} alt="star" />
                </i>
              </button>
              <button className="simple">
                Entre em Contacto
                <i>
                  <img src={`${url}/svg/call_center.png`} alt="star" />
                </i>
              </button>
            </div>
          </div>
          <div className="picture">
            <img src={`${url}/banner.png`} alt="banner" />
          </div>
        </div>
      </div>
    </div>
  );
};
