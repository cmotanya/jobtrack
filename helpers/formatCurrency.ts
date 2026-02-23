export const formatCurrency = (value: string | number) => {
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  if (!digits) return "";

  return `KSH ${digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const parseCurrency = (value: string) => {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
};
