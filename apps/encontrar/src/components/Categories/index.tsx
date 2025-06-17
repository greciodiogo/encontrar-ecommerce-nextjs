'use client';

import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';

import { useProductContext } from 'hooks/useProductContext';
import { useAppDispatch, useAppSelector } from 'hooks';
import { RootState } from 'types/product';
import { fetchAllCategories } from 'actions/products';
import { CategoriesTree } from 'components/TreeMenu';

export const Categories = () => {
  const { t } = useTranslation('home'); // Certifique-se de que está no namespace correto
  const router = useRouter();
  const { isClient } = useAuth();

  const dispatch = useAppDispatch();
  const isControlPanelRoute = router.pathname.startsWith('/control-panel');
  const isCheckoutRoute = router.pathname.startsWith('/checkout');
  const isPrivacyPolicyRoute = router.pathname.startsWith('/privacy-policy');
  const isAboutRoute = router.pathname.startsWith('/about');
  const isHomeRoute = router.pathname === '/';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(fetchAllCategories());
      } catch (error) {
        console.error('Error fetching Categories:', error);
      }
    };

    void fetchCategories();
  }, []);

  if (isControlPanelRoute || isCheckoutRoute) return null;

  if (isAboutRoute || isPrivacyPolicyRoute) return;

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }

  return (
    <div className={`mini categories ${!isHomeRoute ? 'border' : ''}`}>
      <div className="menu_tree_container">
        <CategoriesTree />
      </div>
    </div>
  );
};
