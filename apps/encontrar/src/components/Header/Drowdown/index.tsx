// components/Dropdown.tsx
import React, { useState } from 'react';

const categories = [
  { title: 'Vinho', items: ['Casillero del Diablo', 'Concha y Toro', 'Santa Carolina', 'Gato Negro', 'Almadén'] },
  { title: 'Uísques', items: ['Coca-Cola', 'Pepsi', 'Fanta', 'Schweppes', 'Sprite'] },
  { title: 'Águas', items: ['Água Chela', 'Pura', 'Levita', 'Perrier', 'Evian'] },
  { title: 'Sumo', items: ['Compal', 'Sumol', 'Nutry', 'Del Valle', 'Minute Maid'] },
];

export const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="categoryList dropdown-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="dropdown-trigger">Bebidas</span>

      {isOpen && (
        <div className="dropdown-menu">
          <h3 className="dropdown-title">Todas as Bebidas</h3>
          <div className="dropdown-content">
            {categories.map((category) => (
              <div key={category.title} className="dropdown-column">
                <strong>{category.title}</strong>
                {category.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
