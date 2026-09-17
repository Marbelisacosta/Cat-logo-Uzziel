
export const EXCHANGE_RATE = 977.67; // Tasa restaurada a su valor inicial estable

export function formatVEF(usdAmount: number): string {
  const vefAmount = usdAmount * EXCHANGE_RATE;
  const formattedNumber = new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(vefAmount);
  
  return `Bs. ${formattedNumber}`;
}
