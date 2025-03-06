import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export const BrandNew = () => {
  return (
    <div className="brandNew">
      <div className="brandNew_container">
        <div className="wrapper">
          <div className="box">
            <div className="content">
              <div className="badge">
                <p>A Caminho</p>
              </div>
              <h2>New Apple Homepod Mini</h2>
              <p>Jam-packed with innovation, HomePod mini delivers unexpectedly.</p>
              <button>
                Shop now
                <i>
                  <FaArrowRight size={12} fill="white" />
                </i>
              </button>
            </div>
            <div className="picture">
              <img src={`/assets_ecommerce/products/audio.png`} alt="star" />
            </div>
          </div>
          <div className="box">
            <div className="content">
              <div className="badge">
                <p>Novos Dispositivos a Caminho</p>
              </div>
              <h2>Xiaomi Mi 11 Ultra 12GB+256GB</h2>
              <p>*Data provided by internal laboratories. Industry measurment.</p>
              <button>
                Shop now
                <i>
                  <FaArrowRight size={12} fill="black" />
                </i>
              </button>
            </div>
            <div className="picture">
              <img src={`/assets_ecommerce/products/smartfone.png`} alt="smartfone" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
