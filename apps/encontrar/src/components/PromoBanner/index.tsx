'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useProductContext } from 'hooks/useProductContext';

import 'swiper/css';
import 'swiper/css/navigation';

export const PromoCarousel = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { setSelectedCategories } = useProductContext();
  const router = useRouter();
  const { t } = useTranslation('home'); // 'common' corresponde ao JSON
  const [loaded, setLoaded] = useState(false);

  const redirectToProducts = () => {
    setSelectedCategories([]);
    void router.push('/products');
  };
  return (
    <section className="carousel-container">
      <button
        className="custom-prev"
        onClick={() => {
          if (swiperInstance) {
            swiperInstance.slidePrev();
          }
        }}
      >
        <HiOutlineArrowLeft size={24} color="#191C1F" />
      </button>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        onSwiper={(swiper) => {
          setSwiperInstance(swiper); // Define a instância corretamente
        }}
      >
        <SwiperSlide>
          <button className="slide-img" onClick={redirectToProducts}>
            <Image
              src={`/assets_ecommerce/${t('banner.banner_4')}`}
              alt="Promoção"
              width={1100}
              height={426}
              objectFit="cover"
              className={`image ${loaded ? 'loaded' : ''}`}
              onLoadingComplete={() => setLoaded(true)}
            />
          </button>
          <button className="slide-mobile-img" onClick={redirectToProducts}>
            <Image
              src={`/assets_ecommerce/${t('banner.banner_mb_4')}`}
              alt="Promoção"
              width={650}
              height={302}
              objectFit="contain"
              className={`image ${loaded ? 'loaded' : ''}`}
              onLoadingComplete={() => setLoaded(true)}
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="slide-img" onClick={redirectToProducts}>
            <Image
              src={`/assets_ecommerce/${t('banner.banner_1')}`}
              alt="Promoção"
              width={1100}
              height={426}
              objectFit="contain"
              className={`image ${loaded ? 'loaded' : ''}`}
              onLoadingComplete={() => setLoaded(true)}
            />
          </button>
          <button className="slide-mobile-img" onClick={redirectToProducts}>
            <Image
              src={`/assets_ecommerce/${t('banner.banner_mb_1')}`}
              alt="Promoção"
              width={650}
              height={302}
              objectFit="contain"
              className={`image ${loaded ? 'loaded' : ''}`}
              onLoadingComplete={() => setLoaded(true)}
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="slide-img" onClick={redirectToProducts}>
            <Image
              src={`/assets_ecommerce/${t('banner.banner_2')}`}
              alt="Promoção"
              width={1100}
              height={426}
              objectFit="contain"
              className={`image ${loaded ? 'loaded' : ''}`}
              onLoadingComplete={() => setLoaded(true)}
            />
          </button>
          <button className="slide-mobile-img" onClick={redirectToProducts}>
            <Image
              src={`/assets_ecommerce/${t('banner.banner_mb_2')}`}
              alt="Promoção"
              width={650}
              height={302}
              objectFit="contain"
              className={`image ${loaded ? 'loaded' : ''}`}
              onLoadingComplete={() => setLoaded(true)}
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="slide-img" onClick={redirectToProducts}>
            <Image
              src={`/assets_ecommerce/${t('banner.banner_3')}`}
              alt="Promoção"
              width={1100}
              height={426}
              objectFit="contain"
              className={`image ${loaded ? 'loaded' : ''}`}
              onLoadingComplete={() => setLoaded(true)}
            />
          </button>
          <button className="slide-mobile-img" onClick={redirectToProducts}>
            <Image
              src={`/assets_ecommerce/${t('banner.banner_mb_3')}`}
              alt="Promoção"
              width={650}
              height={302}
              objectFit="contain"
              className={`image ${loaded ? 'loaded' : ''}`}
              onLoadingComplete={() => setLoaded(true)}
            />
          </button>
        </SwiperSlide>
      </Swiper>

      <button
        className="custom-next"
        onClick={() => {
          if (swiperInstance) {
            swiperInstance.slideNext();
          }
        }}
      >
        <HiOutlineArrowRight size={24} color="#191C1F" />
      </button>
    </section>
  );
};
