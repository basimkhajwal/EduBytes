export const formatCounts = (numString: string | undefined) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(Number(numString) ?? 0);
};
