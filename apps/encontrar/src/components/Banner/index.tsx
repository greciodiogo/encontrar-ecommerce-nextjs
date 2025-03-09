'use client';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Banner = () => {
  const { t } = useTranslation('home'); // 'common' se refere ao nome do JSON
  const information = [t('banner.text'), t('banner.text'), t('banner.text'), t('banner.text')];
  const router = useRouter();

  const isAboutRoute = router.pathname.startsWith('/about');

  if (isAboutRoute) return;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {information.map((text, index) => (
          <div className="slide-item" key={index}>
            <h3 className="banner_text">
              {index !== 0 && <span className="bullet">•</span>} {text}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};
