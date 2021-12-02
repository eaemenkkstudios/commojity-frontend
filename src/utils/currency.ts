export function formatCurrency(value: number, signed?: boolean): string {
  return typeof value === 'number'
    ? `${signed ? (value < 0 ? '-' : '+') : ''}$${Math.abs(Number(value))
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    : '';
}
