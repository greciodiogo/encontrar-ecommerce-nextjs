import { useRouter } from 'next/router';
import React from 'react';

export const Framer = () => {
  const router = useRouter();
  const url = 'assets_ecommerce';

  const redirectToProducts = () => {
    void router.push('/products');
  };

  return (
    <div className="framer">
      <div className="framer_container">
        <div className="wrapper">
          <div className="content">
            <div className="reviews_container">
              <div className="star_container">
                {[1, 2, 3, 4].map((__, index) => (
                  <i key={index}>
                    <img src={`${url}/svg/star-black.png`} alt="star" />
                  </i>
                ))}
              </div>
              <p>Feedbacks dos Nossos Clientes</p>
            </div>
            <h2>Descubra os produtos mais incríveis da banda!</h2>
            <h4>
              Vendemos para si as melhores bebidas a disposição do mercado, desde vinhos até refrigerantes e água.
            </h4>
            <div className="btn_container">
              <button className="" onClick={redirectToProducts}>
                Explorar Produtos
                <i className="white">
                  <img src={`${url}/svg/ArrowRight.png`} alt="arrow" />
                </i>
                <i className="black">
                  <img src={`${url}/svg/ArrowRight-3.png`} alt="arrow" />
                </i>
              </button>
              <button className="simple">
                Entre em Contacto
                <i>
                  <img src={`${url}/svg/call_center-black.png`} alt="contact" />
                </i>
              </button>
            </div>
          </div>
          <div className="picture">
            <img src={`${url}/app-bg.png`} alt="background" />
          </div>
        </div>
      </div>
    </div>
  );
};
