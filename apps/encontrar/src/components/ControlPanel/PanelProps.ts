import { ReactNode, HTMLAttributes } from 'react';

// Definição dos tipos de props para os componentes
export type PanelProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export type PanelTitleProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

export type PanelDescriptionProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

export type PanelIconProps = {
  children: string; // O nome do ícone será uma string
} & HTMLAttributes<HTMLElement>;

export type PanelBodyProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;
