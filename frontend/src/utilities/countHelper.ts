export const formatCounts = (numString: string) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(Number(numString));
};
