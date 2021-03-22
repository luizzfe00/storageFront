export function formatCurrency(
  value: Number | number | string,
  withoutCurrency = false,
): string {
  const configs = withoutCurrency
    ? { minimumFractionDigits: 2 }
    : { style: 'currency', currency: 'BRL' };
  return Number(value).toLocaleString('pt-BR', configs);
}

export const removeFormatting = (
  value: string | number | undefined,
): number => {
  if (typeof value === 'number') {
    return value;
  }

  return (
    Number(
      String(value).replace(/\./g, '').replace(',', '').replace('R$', ''),
    ) / 100
  );
};
