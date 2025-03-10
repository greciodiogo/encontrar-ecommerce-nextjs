/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useProductContext } from 'hooks/useProductContext';

import 'swiper/css';
import 'swiper/css/navigation';

const slide = {
  id: 1,
  titulo: 'Descubra as promoções imperdíveis na Encontrar!',
  descricao: 'Acesse os melhores dispositivos eletrodomésticos e eletrônicos!',
  imagem: '/assets_ecommerce/banner__products.png',
};

export const PromoCarousel = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();
  const router = useRouter();

  const goToCategories = (categorySlug: string) => {
    setSelectedCategories([]);
    toggleSelection(selectedCategories, setSelectedCategories, categorySlug);
    void router.push(`/products`);
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
          <div className="slide-content">
            <div className="text-content">
              <h2>{slide.titulo}</h2>
              <p>{slide.descricao}</p>
              <Link href="/promocoes" className="btn" onClick={() => goToCategories('Promoções')}>
                Ver produtos em promoção
              </Link>
            </div>
            <div className="image-content">
              <Image src={slide.imagem} alt="Promoção" width={410} height={240} objectFit="contain" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img" />
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
