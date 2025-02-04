import React from 'react';

export const BrandNew = () => {
  const url = 'assets_ecommerce';

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
                  <img src={`${url}/svg/ArrowRight.png`} alt="star" />
                </i>
              </button>
            </div>
            <div className="picture">
              <img src={`${url}/products/audio.png`} alt="star" />
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
                  <img src={`${url}/svg/ArrowRight-3.png`} alt="ArrowRight" />
                </i>
              </button>
            </div>
            <div className="picture">
              <img src={`${url}/products/smartfone.png`} alt="smartfone" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
