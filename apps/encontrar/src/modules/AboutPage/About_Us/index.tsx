import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

export const About_Us = () => {
  const { t } = useTranslation('common');
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="quem-somos">
      <div className="quem-somos-texto">
        <h4>{t('about_us.title')}</h4>
        <h2>{t('about_us.headline')}</h2>
        <p>{t('about_us.description')}</p>
        <Link href="/" className="btn">
          {t('about_us.button_text')}
          <FaArrowRight size={12} fill="white" />
        </Link>
      </div>
      <div className="quem-somos-imagem">
        <Image
          src="/assets_ecommerce/Desktop_bg.png"
          alt="Carrinho de compras"
          width={400}
          height={300}
          objectFit="contain"
          className={`image ${loaded ? 'loaded' : ''}`}
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>
    </section>
  );
};
