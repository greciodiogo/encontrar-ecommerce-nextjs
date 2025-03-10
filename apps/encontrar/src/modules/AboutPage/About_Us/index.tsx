import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export const About_Us = () => {
  return (
    <section className="quem-somos">
      <div className="quem-somos-texto">
        <h4>Quem somos</h4>
        <h2>Encontrar é uma plataforma que oferece produtos essenciais para o seu dia a dia.</h2>
        <p>
          A Encontrar é um e-commerce dinâmico localizado em Viana, Luanda Sul, Angola. Oferecendo uma ampla gama de
          produtos essenciais para o dia a dia, a Encontrar se dedica a atender as necessidades dos clientes angolanos
          com qualidade e variedade. Desde itens de supermercado até eletrônicos, você encontrará tudo o que precisa em
          um só lugar.
        </p>
        <Link href="/products" className="btn">
          Ir para o Ecommerce
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
        />
      </div>
    </section>
  );
};
