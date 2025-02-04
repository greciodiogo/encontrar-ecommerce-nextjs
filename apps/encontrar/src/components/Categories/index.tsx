import React from 'react';

export const Categories = () => {
  const categories = [
    {
      title: 'Eletrônicos e Elétricos',
      data: [
        'Iphones',
        'Samsung',
        'Geladeira',
        'Máquinas de Lavar',
        'Impressoras',
        'Air Frier',
        'Ar Condicionado (AC)',
        'Tv',
        'Outros Produtos',
      ],
    },
    {
      title: 'Alimentação',
      data: [
        'Vinagre',
        'Papel Higiênico',
        'Guardanapos',
        'Enxoval',
        'Ovos',
        'Azeite Campones',
        'Frutas',
        'Vegetais',
        'Produtos para Cozinha',
        'Outros Produtos',
      ],
    },
  ];
  return (
    <div className="categories">
      <div className="categories_container">
        <div className="wrapper">
          {categories.map((category, index) => (
            <div className="wrapper_list" key={index}>
              <h3 className="category-item title">{category.title}</h3>
              <ul className="subcategories">
                {category.data.map((item, itemIndex) => (
                  <li className="category-item" key={itemIndex} style={{ display: 'inline', marginRight: '10px' }}>
                    <a>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
