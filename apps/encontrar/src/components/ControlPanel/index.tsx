import React from 'react';

import { PanelBodyProps, PanelDescriptionProps, PanelIconProps, PanelProps, PanelTitleProps } from './PanelProps';

export const Panel: React.FC<PanelProps> & {
  Title: React.FC<PanelTitleProps>;
  Description: React.FC<PanelDescriptionProps>;
  Icon: React.FC<PanelIconProps>;
  Body: React.FC<PanelBodyProps>;
} = ({ children, ...restProps }) => {
  return (
    <div className="panel panelItem" {...restProps}>
      {children}
    </div>
  );
};

Panel.Title = function PanelTitle({ children, ...restProps }: PanelTitleProps) {
  return <h5 {...restProps}>{children}</h5>;
};

Panel.Description = function PanelDescription({ children, ...restProps }: PanelDescriptionProps) {
  return <p {...restProps}>{children}</p>;
};

Panel.Icon = function PanelIcon({ children, ...restProps }: PanelIconProps) {
  return (
    <i className="fasmapay" {...restProps}>
      <img src={`/assets_ecommerce/svg/${children}.png`} alt={children} />
    </i>
  );
};

Panel.Body = function PanelBody({ children, ...restProps }: PanelBodyProps) {
  return <main {...restProps}>{children}</main>;
};
