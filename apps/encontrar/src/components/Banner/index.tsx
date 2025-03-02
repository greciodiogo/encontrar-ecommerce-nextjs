'use client';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const information = [
  'Encontre os melhores produtos aqui lorem ipsum lorem ipsum lorem ipsum',
  'Encontre os melhores produtos aqui lorem ipsum lorem ipsum lorem ipsum',
  'Encontre os melhores produtos aqui lorem ipsum lorem ipsum lorem ipsum',
  'Encontre os melhores produtos aqui lorem ipsum lorem ipsum lorem ipsum',
];

export const Banner = () => {
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
