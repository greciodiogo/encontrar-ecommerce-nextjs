import React from 'react';

export const PaymentStep = ({
  selectedPrice,
  setSelectedPrice,
}: {
  selectedPrice: string;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="checkout_payment">
      <div className="wrapper">
        <div className="p-4 border rounded-lg w-64">
          <div className="options">
            {['fasmapay', 'multicaixa', 'CASH'].map((range) => (
              <label key={range} className="line_radio">
                <input
                  type="radio"
                  value={range}
                  checked={selectedPrice === range}
                  onChange={() => setSelectedPrice(range)}
                  className="hidden"
                />
                <div className={`radioBtn ${selectedPrice === range ? 'active' : ''}`}>
                  {selectedPrice === range && <div className="radio-desc"></div>}
                </div>
                <i>
                  <img src={`/assets_ecommerce/payments_methods/${range}.png`} alt="" />
                </i>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
