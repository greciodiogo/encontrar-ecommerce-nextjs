
export const new_categories = [
  { slug: 'drink_foods', name: 'Bebidas e Alimentação', image: `bebidas.png` },
  { slug: 'toys', name: 'Brinquedos', image: `Brinquedos.png` },
  { slug: 'electronics', name: 'Eletrodomésticos', image: `Eletrodomésticos.png` },
  { slug: 'stationery', name: 'Escritorio', image: `Escritorio.png` },
  { slug: 'home_items', name: 'Itens para Casa', image: `Items para Casa.png` },
  { slug: 'personal_care', name: 'Cuidados Pessoais', image: `Cuidados Pessoais.png` },
  { slug: 'various', name: 'Diversos', image: `Box.png` },
  { slug: 'promotions', name: 'Promoções', image: `bebidas.png` },
];

export const footer = [
  {
    slug: 'information',
    title: 'Informações',
    data: [
      { name: 'about', slug: 'about', title: 'Sobre Encontrar', imgUrl: '', href: '' },
      { name: 'go_to_ecommerce', slug: '', title: 'Ir para o Ecommerce', imgUrl: '', href: '' },
      {
        name: 'privacy_policy',
        slug: 'privacy-policy',
        title: 'Políticas de Privacidade Encontrar',
        imgUrl: '',
        href: '',
      },
    ],
  },
  {
    slug: 'location',
    title: 'Localização',
    data: [{ slug: 'address', title: 'Luanda, Viana.', imgUrl: '', href: '' }],
  },
  {
    slug: 'social_networks',
    title: 'Redes Sociais',
    data: [
      {
        slug: 'facebook',
        href: '',
        title: 'Facebook',
        imgUrl: 'footer-facebook.png',
      },
      {
        slug: 'instagram',
        href: 'https://www.instagram.com/encontrar.marketing',
        title: 'Instagram',
        imgUrl: 'footer-instagram.png',
      },
    ],
  },
];

export const municipiosLuanda = [
  'Belas',
  'Cacuaco',
  'Cazenga',
  'Ícolo e Bengo',
  'Kilamba Kiaxi',
  'Quiçama',
  'Talatona',
  'Viana',
];

// export const footer = [
//   {
//     title: 'Pedidos e Devoluções',
//     data: ['Status do Pedido', 'Retirada na Loja', 'Política e Informações de Devolução', 'Informações de Envio'],
//   },
//   {
//     title: 'Ferramentas de Compras',
//     data: ['Status do Pedido', 'Retirada na Loja', 'Consulta de Número de Membro', 'Informações de Envio'],
//   },
//   {
//     title: 'Produtos',
//     data: ['Eletrónicos', 'Alimentação'],
//   },
// ];

export const products = [];

export const cheapestProducts = [
  {
    title: 'Dispositivos Eletrodomésticos e Elétricos',
    bestselled_product: {
      name: 'Xbox Series S - Consola SSD de 512GB com Controlo Sem Fios - Versão UE...',
      image: `videogame.png`,
      price: 44554,
      about: 'Os jogos desenvolvidos com o kit de desenvolvimento do Xbox Series X|S apresentam tempos',
    },
    data: products,
  },
];

export const bestSelledProduct = {
  category: 'Dispositivos Eletrodomésticos e Elétricos',
  data: {
    id: 1,
    name: 'Xbox Series S - Consola SSD de 512GB com Controlo Sem Fios - Versão UE...',
    image: `videogame.png`,
    price: 44554,
    about: 'Os jogos desenvolvidos com o kit de desenvolvimento do Xbox Series X|S apresentam tempos',
    picture: 'macbook.png',
    banner: 'videogame.png',
    availability: 'Em Stock',
    sku: 'A264671',
    images: ['whiskey.png', 'wine_green.png'],
    brand: 'Apple',
  },
};

export const populartTags = [
  {
    title: 'Cozinhar',
    slug: 'cook',
  },
  {
    title: 'Congelados',
    slug: 'cook',
  },
  {
    title: 'TV',
    slug: 'cook',
  },
  {
    title: 'Graphics Card ',
    slug: 'cook',
  },
  {
    title: 'Macbook',
    slug: 'cook',
  },
  {
    title: 'Graphics Card ',
    slug: 'cook',
  },
  {
    title: 'Smart TV',
    slug: 'cook',
  },
];

export const priceRanges = [
  'Todos os Preços',
  'Abaixo de 2000 kz',
  '2000 Kz a 9,999 Kz',
  '10,000 Kz a 49,999 Kz',
  '50,000 Kz a 199,999 Kz',
  '200,000 Kz a 499,999 Kz',
  'Acima de 500,000 Kz',
];

export const brands = [
  'Apple',
  'Microsoft',
  'Dell',
  'Symphony',
  'Sony',
  'LG',
  'One Plus',
  'Google',
  'Samsung',
  'HP',
  'Xiaomi',
  'Panasonic',
  'Intel',
];
