import StarIcon from '@mui/icons-material/Star';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { useProductContext } from 'hooks/useProductContext';

export const Framer = () => {
  const router = useRouter();
  const { t } = useTranslation('home'); // 'common' corresponde ao JSON

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
              <p>{t('framer.customer_feedbacks')}</p>
            </div>
            <h2>{t('framer.discover_products')}</h2>
            <h4>{t('framer.we_sell_best')}</h4>
            <div className="btn_container">
              <button className="" onClick={redirectToProducts}>
                {t('framer.explore_products')}
                <i className="white">
                  <FaArrowRight size={12} fill="white" />
                </i>
                <i className="black">
                  <FaArrowRight size={12} fill="black" />
                </i>
              </button>
              <button className="simple">
                {t('framer.contact_us')}
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
