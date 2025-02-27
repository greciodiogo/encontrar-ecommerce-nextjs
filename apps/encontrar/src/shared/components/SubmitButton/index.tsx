import React from 'react';

export const SubmitButton = ({
  title,
  svg,
  outlined = false,
  onClick,
}: {
  title: string;
  svg?: string;
  outlined?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const url = 'assets_ecommerce';
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
          <img src={`${url}/svg/${svg}.png`} alt="star" />
        </i>
      )}
    </button>
  );
};
