import React, { useState } from 'react';

import { useProductContext } from 'hooks/useProductContext';

const categories = [
  { title: 'Vinho', items: ['Casillero del Diablo', 'Concha y Toro', 'Santa Carolina', 'Gato Negro', 'Almadén'] },
  { title: 'Uísques', items: ['Jack Daniels', 'Ballantine’s', 'Chivas Regal', 'Johnnie Walker', 'Old Parr'] },
  { title: 'Águas', items: ['Água Chela', 'Pura', 'Levita', 'Perrier', 'Evian'] },
  { title: 'Sumo', items: ['Compal', 'Sumol', 'Nutry', 'Del Valle', 'Minute Maid'] },
];

export const Dropdown = ({ goToCategories }: { goToCategories: (categorySlug: string) => void }) => {
  const CATEGORY_TITLE = 'Bebidas e Alimentação';

  const { selectedCategories, setSelectedCategories, toggleSelection, getCategoryCount } = useProductContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    toggleSelection(selectedCategories, setSelectedCategories, CATEGORY_TITLE);
    goToCategories(CATEGORY_TITLE);
  };

  return (
    <div
      className="categoryList dropdown-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="dropdown-trigger" onClick={handleClick}>
        {CATEGORY_TITLE}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <h3 className="dropdown-title">Todas as Bebidas</h3>
          <div className="dropdown-content">
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
        </div>
      )}
    </div>
  );
};
