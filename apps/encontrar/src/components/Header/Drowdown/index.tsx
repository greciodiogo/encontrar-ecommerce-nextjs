import React, { useState } from 'react';

import { useProductContext } from 'hooks/useProductContext';

const categories = [
  { title: 'Vinho', items: ['Casillero del Diablo', 'Concha y Toro', 'Santa Carolina', 'Gato Negro', 'Almadén'] },
  { title: 'Uísques', items: ['Jack Daniels', 'Ballantine’s', 'Chivas Regal', 'Johnnie Walker', 'Old Parr'] },
  { title: 'Águas', items: ['Água Chela', 'Pura', 'Levita', 'Perrier', 'Evian'] },
  { title: 'Sumo', items: ['Compal', 'Sumol', 'Nutry', 'Del Valle', 'Minute Maid'] },
];

const categories_foods = [
  { title: 'Arroz', items: ['Arroz Negro'] },
  { title: 'Frango', items: ['Buffalo wings', 'Grilled Chicken'] },
];

export const Dropdown = ({
  CATEGORY_TITLE,
  onClick,
}: {
  CATEGORY_TITLE: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { getCategoryCount } = useProductContext();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="categoryList dropdown-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="dropdown-trigger" onClick={onClick}>
        {CATEGORY_TITLE}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <h3 className="dropdown-title">Todas as Bebidas</h3>
          <div className="dropdown-content" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              {categories.map((category) => (
                <div key={category.title} className="dropdown-column">
                  <strong>
                    {category.title} <span className="itemCount">({getCategoryCount(category.title)})</span>
                  </strong>
                  {category.items.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              ))}
            </div>

            <h3 className="dropdown-title">Todos os produtos de Alimentação</h3>
            <div style={{ display: 'flex' }}>
              {categories_foods.map((category) => (
                <div key={category.title} className="dropdown-column">
                  <strong>
                    {category.title} <span className="itemCount">({getCategoryCount(category.title)})</span>
                  </strong>
                  {category.items.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
