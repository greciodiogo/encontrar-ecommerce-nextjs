import StarIcon from '@mui/icons-material/Star';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { useProductContext } from 'hooks/useProductContext';

export const Framer = () => {
  const router = useRouter();
  const { setSelectedCategories } = useProductContext();

  const redirectToProducts = () => {
    setSelectedCategories([]);
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
                    <StarIcon fontSize="small" htmlColor="#111" />
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
                  <FaArrowRight size={12} fill="white" />
                </i>
                <i className="black">
                  <FaArrowRight size={12} fill="black" />
                </i>
              </button>
              <button className="simple">
                Entre em Contacto
                <i>
                  <SupportAgentIcon fontSize="small" />
                </i>
              </button>
            </div>
          </div>
          <div className="picture">
            <img src={`/assets_ecommerce/app-bg.png`} alt="background" />
          </div>
        </div>
      </div>
    </div>
  );
};
