import React from 'react';
import { LuShoppingCart } from 'react-icons/lu';

export const SubmitButton = ({
  title,
  svg,
  outlined = false,
  isProductInCart = false,
  onClick,
}: {
  title: string;
  svg?: string;
  outlined?: boolean;
  isProductInCart?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <button
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      className={`submitButton ${outlined && 'outlined'}`}
      type="submit"
      onClick={onClick}
    >
      {title}
      {svg && (
        <i>
          <LuShoppingCart fill={isProductInCart ? 'white' : ''} size={20} />
        </i>
      )}
    </button>
  );
};
