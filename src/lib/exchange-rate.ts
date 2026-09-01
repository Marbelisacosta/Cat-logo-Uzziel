
export const EXCHANGE_RATE = 926.55312212; // Valor proporcionado por el usuario para BCV Euro

export function formatVEF(usdAmount: number): string {
  const vefAmount = usdAmount * EXCHANGE_RATE;
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VED', // VED es el código para Bolívar Digital/Soberano
    minimumFractionDigits: 2,
  }).format(vefAmount);
}
