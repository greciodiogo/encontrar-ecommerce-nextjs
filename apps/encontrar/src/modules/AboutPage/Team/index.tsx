import Image from 'next/image';

const membros = [
  { nome: 'Surafid Surafid', cargo: 'Manager', imagem: '/assets_ecommerce/products/sem-foto.webp' },
  { nome: 'Surafid Surafid', cargo: 'Manager', imagem: '/assets_ecommerce/products/sem-foto.webp' },
  { nome: 'Surafid Surafid', cargo: 'Manager', imagem: '/assets_ecommerce/products/sem-foto.webp' },
  { nome: 'Surafid Surafid', cargo: 'Manager', imagem: '/assets_ecommerce/products/sem-foto.webp' },
];

export const Team = () => {
  return (
    <section className="equipe">
      <h4>Equipa</h4>
      <h2>Os membros que fazem parte da nossa equipa</h2>
      <div className="equipe-lista">
        {membros.map((membro, index) => (
          <div className="equipe-card" key={index}>
            <Image src={membro.imagem} alt={membro.nome} width={150} height={150} />
            <p className="cargo">{membro.cargo}</p>
            <h3>{membro.nome}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
