export const categories = [
  {
    title: 'Dispositivos Eletrônicos e Elétricos',
    data: [
      { name: 'Iphones', image: `stick.png` },
      { name: 'Ar Condicionado (AC)', image: `ac.png` },
      { name: 'Samsung', image: `printer.png` },
      { name: 'Máquinas de Lavar', image: `smart_tv.png` },
      { name: 'Geladeira', image: `machine.png` },
    ],
  },
  {
    title: 'Alimentação',
    data: [
      { name: 'Vinagre', image: `vegetals.png` },
      { name: 'Ovos', image: `legums.png` },
      { name: 'Frutas', image: `fruits.png` },
      { name: 'Enxoval', image: `graps.png` },
      { name: 'Outros Produtos', image: `strawberry.png` },
    ],
  },
];

export const new_categories = [
  { name: 'Items para Casa', image: `items_casa.png` },
  { name: 'Brinquedos Infantis', image: `brinquedos.png` },
  { name: 'Produtos Eletricos', image: `eletricos.png` },
  { name: 'Alimentos', image: `alimentos.png` },
  { name: 'Diversos', image: `diversos.png` },
  { name: 'Bebidas', image: `bebidas.png` },
  { name: 'Cuidados Pessoais', image: `cuidados_pessoais.png` },
  { name: 'Papelaria e Escritório', image: `papelaria.png` },
  { name: 'Saúde', image: `saude.png` },
];

export const cartList = {
  data: [
    {
      id: 1,
      picture: 'macbook.png',
      banner: 'stick.png',
      name: 'MacBook Pro Apple de 2020 com Chip Apple M1 (13 polegadas, 8GB RAM, 256GB SSD) - Cinza Espacial',
      availability: 'Em Stock',
      category: 'Dispositivos Electrónicos',
      brand: 'Apple',
      id: 'A264671',
      price: 444,
    },
    {
      id: 2,
      picture: 'macbook.png',
      banner: 'stick.png',
      name: 'MacBook Pro Apple de 2020 com Chip Apple M1 (13 polegadas, 8GB RAM, 256GB SSD) - Cinza Espacial',
      availability: 'Em Stock',
      category: 'Dispositivos Electrónicos',
      brand: 'Apple',
      id: 'A264671',
      price: 444,
    },
  ],
  qtd: 1,
  totalItems: 2,
  total: 3000,
  subtotal: 3000,
};

export const footer = [
  {
    title: 'Pedidos e Devoluções',
    data: ['Status do Pedido', 'Retirada na Loja', 'Política e Informações de Devolução', 'Informações de Envio'],
  },
  {
    title: 'Ferramentas de Compras',
    data: ['Status do Pedido', 'Retirada na Loja', 'Consulta de Número de Membro', 'Informações de Envio'],
  },
  {
    title: 'Produtos',
    data: ['Eletrónicos', 'Alimentação'],
  },
];

export const products = [
  {
    id: 1,
    image: 'whiskey.png',
    banner: 'hot.png',
    name: 'Whiskey Jack Daniels 750ml',
    about: 'Whiskey premium envelhecido em barris de carvalho, ideal para apreciadores de destilados.',
    availability: 'Em Stock',
    category: 'Bebidas',
    brand: 'Jack Daniels',
    productId: 'B001',
    price: 44.99,
    rating: 4.8,
  },
  {
    id: 2,
    image: 'wine_green.png',
    banner: 'hot.png',
    name: 'Vinho Verde Quinta das Amoras 750ml',
    about: 'Vinho verde leve e refrescante, perfeito para acompanhar pratos leves e frutos do mar.',
    availability: 'Em Stock',
    category: 'Bebidas',
    brand: 'Quinta das Amoras',
    productId: 'B002',
    price: 12.99,
    rating: 4.5,
  },
  {
    id: 3,
    image: 'wine_red.png',
    banner: 'hot.png',
    name: 'Vinho Tinto Cabernet Sauvignon 750ml',
    about: 'Vinho tinto encorpado com notas frutadas e taninos suaves, ideal para carnes vermelhas.',
    availability: 'Em Stock',
    category: 'Bebidas',
    brand: 'Casa Valduga',
    productId: 'B003',
    price: 19.99,
    rating: 4.7,
  },
  {
    id: 4,
    image: 'wine_premium.png',
    banner: 'hot.png',
    name: 'Vinho Reserva Especial 750ml',
    about: 'Vinho premium com envelhecimento prolongado, proporcionando um sabor sofisticado e equilibrado.',
    availability: 'Em Stock',
    category: 'Bebidas',
    brand: 'Vinha Real',
    productId: 'B004',
    price: 29.99,
    rating: 4.9,
  },
  {
    id: 5,
    image: 'tv_smart.png',
    banner: '',
    name: 'TV Smart LED 4K UHD 50"',
    about: 'TV Smart com resolução 4K UHD, compatível com apps de streaming e assistente de voz integrado.',
    availability: 'Em Stock',
    category: 'Eletrônicos',
    brand: 'Samsung',
    productId: 'E001',
    price: 2599.99,
    rating: 4.6,
  },
  {
    id: 6,
    image: 'cookies.png',
    banner: '',
    name: 'Biscoitos de Chocolate 200g',
    about: 'Deliciosos biscoitos crocantes cobertos com chocolate ao leite, ideais para acompanhar o café.',
    availability: 'Em Stock',
    category: 'Alimentos',
    brand: 'Nestlé',
    productId: 'A001',
    price: 5.49,
    rating: 4.3,
  },
  {
    id: 7,
    image: 'guardanapo.png',
    banner: '',
    name: 'guardanapo',
    about: 'guardanapo, feito com tomates selecionados para um sabor autêntico e natural.',
    availability: 'Em Stock',
    category: 'Alimentos',
    brand: 'bam boo',
    productId: 'A002',
    price: 4.99,
    rating: 4.8,
  },
  {
    id: 8,
    image: 'controller.png',
    banner: '',
    name: 'Controle DualShock 4',
    about: 'Controle sem fio DualShock 4, com resposta precisa e touchpad integrado para PS4.',
    availability: 'Em Stock',
    category: 'Eletrônicos',
    brand: 'Sony',
    productId: 'E002',
    price: 299.99,
    rating: 4.7,
  },
  {
    id: 9,
    image: 'canned_tomato.png',
    banner: 'hot.png',
    name: 'Tomate Pelado em Lata 400g',
    about: 'Tomates italianos pelados, perfeitos para molhos e receitas caseiras.',
    availability: 'Em Stock',
    category: 'Alimentos',
    brand: 'Compal',
    productId: 'A003',
    price: 3.99,
    rating: 4.4,
  },
  {
    id: 10,
    image: 'milk_chocolate.png',
    banner: 'hot.png',
    name: 'Leite com Chocolate 200ml',
    about: 'Bebida láctea com chocolate, sabor irresistível para qualquer momento do dia.',
    availability: 'Em Stock',
    category: 'Alimentos',
    brand: 'Nestlé',
    productId: 'A004',
    price: 2.49,
    rating: 4.2,
  },
];

export const cheapestProducts = [
  {
    title: 'Dispositivos Eletrônicos e Elétricos',
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
  category: 'Dispositivos Eletrônicos e Elétricos',
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
  'Abaixo de 2000kz',
  '2000Kz a 10,000Kz',
  '10,000Kz a 30,000Kz',
  '30,000Kz a 60,000Kz',
  '60,000Kz a 90,000Kz',
  '1,200,000Kz a 2,400,000Kz',
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
