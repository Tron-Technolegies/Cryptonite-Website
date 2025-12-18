export const formatHashrate = (value, unit = "") => {
  if (!value) return "-";
  return `${value}${unit}`;
};

export const formatPower = (watt) => `${watt} W`;

export const profitBarWidth = (profit) => {
  const max = 50; // cap visual bar
  return Math.min(Math.abs(profit), max) * 2; // %
};
