import React from 'react';

import { footer } from 'fixture/ecommerceData';
import { useAuth } from 'hooks/useAuth';

export const Footer = () => {
  const { isClient } = useAuth();

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="wrapper">
          <div className="wrapper_left">
            <div className="col col-1">
              <i>
                <img src="/assets_ecommerce/logo2.png" alt="" />
              </i>
              <div className="content">
                <p>Terms of Use</p>
                <p>Privacy and Police</p>
                <p>Notice</p>
              </div>
            </div>
            <div className="col col-2">
              <h4>Formas de Pagamentos</h4>
              <i>
                <img src="/assets_ecommerce/payments_methods/fasmapay.png" alt="" />
              </i>
              <i>
                <img src="/assets_ecommerce/payments_methods/multicaixa.png" alt="" />
              </i>
              <i>
                <img src="/assets_ecommerce/payments_methods/CASH.png" alt="" />
              </i>
            </div>
          </div>
          <div className="wrapper_right">
            <div className="row row-1">
              {footer.map((category, index) => (
                <div className="wrapper_list" key={index}>
                  <h3 className="title">{category.title}</h3>
                  <ul className="subcategories">
                    {category.data.map((item, itemIndex) => (
                      <div className="category-item" key={itemIndex}>
                        <a>{item}</a>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="row row-2">
              <div className="social_container">
                <p>Redes Sociais</p>
                <div className="wrap">
                  <i>
                    <img src="/assets_ecommerce/svg/instagram.png" alt="" />
                  </i>
                  <i>
                    <img src="/assets_ecommerce/svg/facebook.png" alt="" />
                  </i>
                </div>
              </div>
              <div className="chat_container">
                <p className="chat_row">
                  <i>
                    <img src="/assets_ecommerce/svg/chat.png" alt="" />
                  </i>
                  Live Chat
                </p>
                <span>Mon–Fri, 6am–8pm PT</span>
                <span>Mon–Fri, 6am–8pm PT</span>
              </div>
            </div>
            <div className="row row-3">
              <div className="chat_container">
                <p className="chat_row">
                  <i>
                    <img src="/assets_ecommerce/svg/help.png" alt="" />
                  </i>
                  Centro de Ajuda
                </p>
                <span className="badge">+244922222222</span>
                <span>Entre em contacto connosco e tenha as suas respostas respondidas</span>
              </div>
              <div className="chat_container">
                <p className="chat_row">
                  <i>
                    <img src="/assets_ecommerce/svg/location.png" alt="" />
                  </i>
                  Localização
                </p>
                <span>Viana, Luanda Sul, 4 Campos </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
