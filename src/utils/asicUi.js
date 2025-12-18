export const getCoinByAlgorithm = (coins, algorithm) =>
  Object.values(coins).find((c) => c.algorithm?.toLowerCase() === algorithm?.toLowerCase());

export const profitBarWidth = (profit) => {
  const max = 50;
  return Math.min(Math.abs(profit), max) * 2;
};
