
export const EXCHANGE_RATE = 938.44; // Valor actualizado para BCV Euro: 938,44 Bs.

export function formatVEF(usdAmount: number): string {
  const vefAmount = usdAmount * EXCHANGE_RATE;
  // Usamos el formateador para los números (puntos y comas) pero concatenamos manualmente el símbolo "Bs."
  const formattedNumber = new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(vefAmount);
  
  return `Bs. ${formattedNumber}`;
}
