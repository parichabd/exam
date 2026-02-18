export const formatNumber = (number) =>
  new Intl.NumberFormat("fa-IR").format(number);

export const toPersianNumber = (value) =>
  value?.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);