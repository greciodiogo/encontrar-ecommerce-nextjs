import WestIcon from '@mui/icons-material/West';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import { CrossIcon } from 'components/icon/CrossIcon';
import { useProductContext } from 'hooks/useProductContext';

type MenuItem = {
  title: string;
  subItems?: Array<MenuItem>;
};

const menuData: Array<MenuItem> = [
  {
    title: 'Bebidas e Alimentação',
    // subItems: [
    //   {
    //     title: 'Vinho',
    //     subItems: ['Casillero del Diablo', 'Concha y Toro', 'Santa Carolina', 'Gato Negro', 'Almadén'].map((title) => ({
    //       title,
    //     })),
    //   },
    //   {
    //     title: 'Uísques',
    //     subItems: ['Johnnie Walker', 'Jack Daniel’s', 'Chivas Regal', 'Ballantine’s', 'Old Parr'].map((title) => ({
    //       title,
    //     })),
    //   },
    //   { title: 'Águas', subItems: ['Água Chela', 'Pura', 'Levita', 'Perrier', 'Evian'].map((title) => ({ title })) },
    //   { title: 'Sumo', subItems: ['Compal', 'Sumol', 'Nutry', 'Del Valle', 'Minute Maid'].map((title) => ({ title })) },
    // ],
  },
  { title: 'Brinquedos' },
  { title: 'Eletrodomésticos' },
  { title: 'Escritório' },
  { title: 'Itens para Casa' },
  {
    title: 'Cuidados Pessoais',
    // subItems: ['Creme', 'Perfume', 'Gel'].map((title) => ({ title })),
  },
  { title: 'Diversos' },
];

export const MobileMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [history, setHistory] = useState<Array<MenuItem>>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();
  const router = useRouter();

  const goToCategories = (category: string) => {
    setSelectedCategories([]);
    toggleSelection(selectedCategories, setSelectedCategories, category);
    void router.push('products');
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveCategory('');
    setHistory([]); // Resetar histórico ao fechar
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const currentMenu = history.length > 0 ? history[history.length - 1].subItems ?? [] : menuData;

  const handleClick = (item: MenuItem) => {
    if (item.subItems) {
      setHistory([...history, item]);
      goToCategories(item.title);
      setActiveCategory(item.title);
    }
  };

  const handleBack = () => {
    setHistory(history.slice(0, -1));
  };

  return (
    <div className="menu-categories">
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={closeMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => event.key === 'Enter' && event.stopPropagation()}
        >
          <div
            className="menu"
            role="button"
            tabIndex={0}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.key === 'Enter' && event.stopPropagation()}
          >
            <div className="menu-top">
              {history.length > 0 ? (
                <>
                  <button onClick={handleBack}>
                    <WestIcon />
                  </button>
                  <h5>{activeCategory}</h5>
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
