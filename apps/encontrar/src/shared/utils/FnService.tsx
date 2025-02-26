/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import extenso from 'extenso';
import moment from 'moment';
import 'moment/locale/pt-br';

export class FnService {
  regexNumero = /^[0-9]+$/;

  // Formatar número para o formato de moeda
  numberFormat(number: number) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    })
      .format(number)
      .replace('€', '')
      .trim();
  }

  // Formatar quantidade com separador de milhares
  formatarQuantidade(numero: number) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // Converter número para extenso
  numberExtenso(value: number): string {
    const formattedValue = this.numberFormat(value); // Garante que o valor formatado seja uma string
    const extensoValue = extenso(formattedValue, {
      locale: 'br',
      mode: 'currency',
      currency: { type: 'EUR' },
      decimal: 'formal',
    });
    return this.toCapitalize(extensoValue.replace('euros', 'Kwanzas'));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calcularPercentualFact(factura: any) {
    const calc = factura.total - factura.valor_aberto;
    return parseFloat(
      (factura?.serie?.documento?.sigla === 'NC'
        ? 100
        : factura.pago === 0 && factura.status === 'N' && factura.valor_aberto == null
          ? 0
          : (calc * 100) / factura.total
      ).toFixed(2),
    );
  }

  // Remover elemento de uma lista baseado em chave e valor
  deleteElementRow<T>(rows: Array<T>, key: keyof T, value: T[keyof T]): Array<T> {
    return rows.filter((row) => row[key] !== value);
  }

  // Obter mês por extenso
  mesPorExtenso(ano: string, mes: string) {
    const currentDate = new Date(`${ano}-${mes}-01`);
    return moment(currentDate).locale('pt-br').format('MMMM');
  }

  // Gerar lista de anos
  years(start = 2019) {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - start + 1 }, (__, index) => ({
      year: start + index,
    }));
  }

  // Gerar lista de meses
  months(): Array<{ id: string; label: string }> {
    return Array.from({ length: 12 }, (__, index) => {
      const month = index + 1; // Mantém `month` como `any` para compatibilidade
      const monthString = month.toString(); // Converte para string
      return {
        id: month < 10 ? `0${monthString}` : monthString,
        label: this.toCapitalize(this.mesPorExtenso('2019', month.toString())),
      };
    });
  }

  // Capitalizar string
  toCapitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Converter milissegundos para segundos
  millisToSeconds(millis: number) {
    return (millis % 60000) / 1000;
  }

  // Converter segundos para formato HH:MM:SS
  secondstoHHMMSS(secs: string) {
    const secNum = parseInt(secs, 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;
    return [hours, minutes, seconds].map((value) => (value < 10 ? `0${value.toString()}` : value)).join(':');
  }

  // Gerar número aleatório de tamanho especificado
  geraNumeroAleatoria(tamanho: number) {
    const caracteres = '0123456789';
    return Array.from({ length: tamanho })
      .map(() => caracteres.charAt(Math.floor(Math.random() * caracteres.length)))
      .join('');
  }
}
