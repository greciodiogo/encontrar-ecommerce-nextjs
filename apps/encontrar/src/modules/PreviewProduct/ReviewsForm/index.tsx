import Image from 'next/image';
import React, { useState } from 'react';

import { useAuth } from 'hooks/useAuth';
import { ProductDTO } from 'types/product';

type ReviewModalProps = {
  products: Array<ProductDTO>;
  isOpen: boolean;
  onClose: () => void;
};

export const ReviewForm: React.FC<ReviewModalProps> = ({ products, isOpen = false, onClose }) => {
  const url = 'assets_ecommerce';
  const { isClient } = useAuth();
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [storeRating, setStoreRating] = useState({ advertisement: 0, delivery: 0 });
  const [feedback, setFeedback] = useState('');

  const handleRating = (productId: number, rating: number) => {
    setRatings((prev) => ({ ...prev, [productId]: rating }));
  };

  const handleStoreRating = (type: 'advertisement' | 'delivery', rating: number) => {
    setStoreRating((prev) => ({ ...prev, [type]: rating }));
  };

  if (!isClient) return null;

  return (
    <div className={`reviewForm modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal">
        <h2>Avaliação de Compra</h2>
        <p>Abaixo, deixe a sua avaliação sobre a compra efetuada.</p>

        {products.map((product) => (
          <div key={product.id} className="product-review">
            {product.id && (
              <div className="content">
                <Image
                  src={`/${url}/products/${product.image ?? 'sem-foto.webp'}`}
                  className="product-image"
                  alt={product.name ?? 'sem-nome'}
                  // priority={true}
                  blurDataURL="www.google.com"
                  placeholder="blur"
                  height={80}
                  width={80}
                  objectFit="contain"
                />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.about}</p>
                </div>
              </div>
            )}
            <p>O produto entregue segue a descrição?</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star ${ratings[product.id ?? 0] >= star ? 'selected' : ''}`}
                  onClick={() => handleRating(product.id ?? 0, star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="store-review">
          <p>Você gostou do atendimento da loja?</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star ${storeRating.advertisement >= star ? 'selected' : ''}`}
                onClick={() => handleStoreRating('advertisement', star)}
              >
                ★
              </button>
            ))}
          </div>

          <p>A loja foi rápida ao enviar seu produto?</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star ${storeRating.delivery >= star ? 'selected' : ''}`}
                onClick={() => handleStoreRating('delivery', star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <textarea
          className="feedback"
          placeholder="Adicione seu feedback..."
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
        />

        <div className="buttons">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="submit">Salvar</button>
        </div>
      </div>
    </div>
  );
};
