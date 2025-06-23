'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ProductDTO } from 'types/product';
import { Container } from 'components/Container';
import { ProductsList } from 'modules/ProductsPage/ProductsList';

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

export const SearchPage = () => {
  const router = useRouter();
  const { query } = router;
  const searchTerm = query.q;

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

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
              {products.length > 0 ? <ProductsList products={products} /> : <p>No products found.</p>}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
