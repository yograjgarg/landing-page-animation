export const cn = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");
