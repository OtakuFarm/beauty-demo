export const formatPrice = (value: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);

export const cx = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(" ");
