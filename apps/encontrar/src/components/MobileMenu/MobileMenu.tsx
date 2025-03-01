import WestIcon from '@mui/icons-material/West';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import { CrossIcon } from 'components/icon/CrossIcon';
import { useProductContext } from 'hooks/useProductContext';

const menuData: Array<MenuItem> = [
  {
    title: 'Bebidas',
    subItems: [
      {
        title: 'Vinho',
        subItems: ['Casillero del Diablo', 'Concha y Toro', 'Santa Carolina', 'Gato Negro', 'Almadén'].map((title) => ({
          title,
        })),
      },
      {
        title: 'Uísques',
        subItems: ['Coca-Cola', 'Pepsi', 'Fanta', 'Schweppes', 'Sprite'].map((title) => ({ title })),
      },
      {
        title: 'Águas',
        subItems: ['Água Chela', 'Pura', 'Levita', 'Perrier', 'Evian'].map((title) => ({ title })),
      },
      {
        title: 'Sumo',
        subItems: ['Compal', 'Sumol', 'Nutry', 'Del Valle', 'Minute Maid'].map((title) => ({ title })),
      },
    ],
  },
  {
    title: 'Cuidados Pessoais',
    subItems: ['Creme', 'Perfume', 'Gel'].map((title) => ({ title })),
  },
  { title: 'Itens para Casa' },
  { title: 'Brinquedos Infantis' },
  { title: 'Produtos Elétricos' },
  { title: 'Alimentos' },
  { title: 'Papelaria e Escritório' },
  { title: 'Diversos' },
  { title: 'Ver outros Produtos' },
];

type MenuItem = {
  title: string;
  subItems?: Array<MenuItem>;
};

export const MobileMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeCategory, setActiveCategory] = useState('');
  const { setSelectedCategory } = useProductContext();
  const router = useRouter();

  const goToCategories = (category: string) => {
    setSelectedCategory(category);
    void router.push('products');
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveCategory('');
  };

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Impede o fechamento ao clicar dentro do filtro
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Restaura ao fechar
    };
  }, [menuOpen]);

  const [history, setHistory] = useState<Array<MenuItem>>([]);

  const currentMenu = history.length > 0 ? history[history.length - 1].subItems ?? [] : menuData;

  const handleClick = (item: MenuItem) => {
    if (item.subItems) {
      setHistory([...history, item]);
    }
    setActiveCategory(item.title);
  };

  const handleBack = () => {
    setHistory(history.slice(0, -1));
  };

  return (
    <div className="menu-categories">
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={handleOverlayClick}
          onKeyDown={(event) => event.key === 'Enter' && handleOverlayClick()}
          role="button"
          tabIndex={0}
        >
          <div
            className="menu"
            role="button"
            tabIndex={0}
            onClick={handleContainerClick}
            onKeyDown={(event) => event.key === 'Enter' && handleContainerClick(event)}
          >
            <div className="menu-top">
              {/* <span></span> */}
              {history.length > 0 ? (
                <>
                  <button onClick={handleBack}>
                    <WestIcon />
                  </button>
                  <h5>
                    {activeCategory === 'Bebidas' ? 'Todas as ' : ''}
                    {activeCategory}
                  </h5>
                </>
              ) : (
                <>
                  <h5>Nossas Categorias de Produtos</h5>
                  <button onClick={closeMenu}>
                    <CrossIcon />
                  </button>
                </>
              )}
            </div>
            <div className="menu-container">
              <ul className="menu-list">
                {currentMenu.map((item, index) => (
                  <button key={index} className="menu-item" onClick={() => handleClick(item)}>
                    <button onClick={() => goToCategories(item.title)}>{item.title}</button>{' '}
                    {item.subItems && <FaChevronRight size={14} />}
                  </button>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
