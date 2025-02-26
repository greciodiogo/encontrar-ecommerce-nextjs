declare module 'extenso' {
  type ExtensoOptions = {
    locale: string;
    mode: string;
    currency: { type: string };
    decimal: string;
  };

  // eslint-disable-next-line import/no-default-export
  export default function extenso(value: string, options: ExtensoOptions): string;
}
