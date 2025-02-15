import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

import { Breadcrumb } from './Breadcrumb';

type ContainerProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
};
export const Container: React.FC<ContainerProps> = (props) => {
  const { children, ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: 'Encontrar – Ecommerce.',
    description: `Tenha Acesso aos Melhores Aparelhos da Banda, Encontre os melhores produtos aqui.`,
    image: 'https://encontrar.vercel.app/static/assets_ecommerce/logo2.png',
    type: 'website',
    ...customMeta,
  };
  return (
    <div className="app">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://greciodiogo8.vercel.app${router.asPath}`} />
        <link rel="canonical" href={`https://greciodiogo8.vercel.app${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Grécio Santos" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        {meta.date && <meta property="article:published_time" content={meta.date} />}
      </Head>
      <main>
        <Breadcrumb />
        {children}
      </main>
    </div>
  );
};
