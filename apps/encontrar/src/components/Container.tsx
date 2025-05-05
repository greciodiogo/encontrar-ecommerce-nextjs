import cn from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

import { useAuth } from 'hooks/useAuth';

import { Breadcrumb } from './Breadcrumb';
import { Categories } from './Categories';
import { CookieBanner } from './CookieBanner';

type ContainerProps = {
  children: ReactNode;
  useStyle?: boolean;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
};
export const Container: React.FC<ContainerProps> = (props) => {
  const { children, useStyle = true, ...customMeta } = props;
  const { isClient } = useAuth();

  const router = useRouter();

  const meta = {
    title: 'Encontrar – Encontre os melhores produtos aqui.',
    description: `Tenha Acesso aos Melhores Aparelhos da Banda, Encontre os melhores produtos aqui.`,
    image: 'https://encontrarshopping.com/logo.ico',
    type: 'website',
    ...customMeta,
  };

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }
  return (
    <div className={cn(useStyle && 'app')}>
      <Head>
        <title>{meta.title}</title>
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
        {meta.date && <meta property="article:published_time" content={meta.date} />}
      </Head>
      <main>
        <CookieBanner />
        <Categories />
        {useStyle && <Breadcrumb />}
        {children}
      </main>
    </div>
  );
};
