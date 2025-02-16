import React from 'react';

export const Categories = () => {
  const categories = [
    { slug: 'drink', name: 'Bebidas' },
    { slug: 'drink', name: 'Items para Casa' },
    { slug: 'drink', name: 'Cuidados Pessoais' },
    { slug: 'drink', name: 'Brinquedos Infantis' },
    { slug: 'drink', name: 'Produtos Elétricos' },
    { slug: 'drink', name: 'Alimentos' },
    { slug: 'drink', name: 'Papelaria e Escritório' },
    { slug: 'drink', name: 'Diversos' },
    { slug: 'drink', name: 'Ver outros Produtos' },
  ];

  return (
    <div className="categories">
      <div className="categories_container">
        <div className="wrapper">
          <div className="wrapper_list">
            <ul className="subcategories">
              {categories.map((item, itemIndex) => (
                <li className="category-item" key={itemIndex} style={{ display: 'inline', marginRight: '10px' }}>
                  <a>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
