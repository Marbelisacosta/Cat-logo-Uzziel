
export const EXCHANGE_RATE = 978.00; // Actualizado según captura de pantalla del usuario

export function formatVEF(usdAmount: number): string {
  const vefAmount = usdAmount * EXCHANGE_RATE;
  const formattedNumber = new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(vefAmount);
  
  return `Bs. ${formattedNumber}`;
}
