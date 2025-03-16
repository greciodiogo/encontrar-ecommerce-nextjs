import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

const membros = [
  { nome: 'Surafid Surafid', cargo: 'manager', imagem: '/assets_ecommerce/products/sem-foto.webp' },
  { nome: 'Surafid Surafid', cargo: 'manager', imagem: '/assets_ecommerce/products/sem-foto.webp' },
  { nome: 'Surafid Surafid', cargo: 'manager', imagem: '/assets_ecommerce/products/sem-foto.webp' },
  { nome: 'Surafid Surafid', cargo: 'manager', imagem: '/assets_ecommerce/products/sem-foto.webp' },
];

export const Team = () => {
  const { t } = useTranslation('common');

  return (
    <section className="equipe">
      <h4>{t('team.title')}</h4>
      <h2>{t('team.description')}</h2>
      <div className="equipe-lista">
        {membros.map((membro, index) => (
          <div className="equipe-card" key={index}>
            <Image src={membro.imagem} alt={`${membro.nome} - ${t(`team.${membro.cargo}`)}`} width={150} height={150} />
            <p className="cargo">{t(`team.${membro.cargo}`)}</p>
            <h3>{membro.nome}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
