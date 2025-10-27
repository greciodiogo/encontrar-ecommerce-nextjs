'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { ProductDTO } from 'types/product';
import { Container } from 'components/Container';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { useAppDispatch } from 'hooks';

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

export const SearchPage = () => {
  const router = useRouter();
  const { query } = router;
  const searchTerm = query.q;
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (id: number) => {
    const product = products.find((p) => p.id === id);
    dispatch(addToCart(id, 1, product));
  };

  const handlepreviewProduct = (product: ProductDTO) => {
    dispatch(loadCurrentItem(product));
    void router.push('/preview-product');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
        try {
          const response = await fetch(`${BASE_URL}/products?name=${encodeURIComponent(searchTerm)}`);
          if (response.ok) {
            const data = await response.json();
            setProducts(data);
          } else {
            setProducts([]);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
        setLoading(false);
      }
    };

    void fetchProducts();
  }, [searchTerm]);

  return (
    <Container useStyle={false}>
      <div className="productsPage">
        <div className="productsPage__container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2>Search Results for: "{searchTerm}"</h2>
              {products.length > 0 ? (
                <div className="wrapper bestselled">
                  {products.map((item, itemIndex) => (
                    <BestSelledProduct
                      product={item}
                      key={itemIndex}
                      handleAddToCart={handleAddToCart}
                      handlepreviewProduct={handlepreviewProduct}
                    />
                  ))}
                </div>
              ) : (
                <p>No products found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
