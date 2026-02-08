export const formatCurrency = (value: string | number) => {
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  if (!digits) return "";

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseCurrency = (value: string) => {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
};
