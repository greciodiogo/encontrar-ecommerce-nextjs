'use client';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';

export const Banner = () => {
  const { t } = useTranslation('home'); // 'common' se refere ao nome do JSON
  const information = [t('banner.text'), t('banner.text'), t('banner.text'), t('banner.text')];
  const router = useRouter();

  const isAboutRoute = router.pathname.startsWith('/about');
  const isPrivacyPolicyRoute = router.pathname.startsWith('/privacy-policy');

  if (isAboutRoute || isPrivacyPolicyRoute) return;

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

  const meta = {
    title: 'Encontrar – Encontre os melhores produtos aqui.',
    description: `Tenha Acesso aos Melhores Aparelhos da Banda, Encontre os melhores produtos aqui.`,
    image: 'https://encontrarshopping.com/logo.ico',
    type: 'website',
  };

  return (
    <div className="slider-container">
      <Head>
        <title>Encontrar</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://encontrarshopping.com${router.asPath}`} />
        <link rel="canonical" href={`https://encontrarshopping.com${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Encontrar" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" name="robots" />
      </Head>
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
