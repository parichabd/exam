// utils/dateUtils.js

export function formatShamsiDate(dateValue) {
  if (!dateValue) return "-";
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return "-";

  // گزینه‌های فرمت‌دهی تاریخ شمسی در جاوااسکریپت
  const options = {
    year: 'numeric', // سال به صورت عددی (مثلا ۱۴۰۲)
    month: 'long',   // ماه به صورت نام (مثلا مهر)
    day: 'numeric'   // روز به صورت عددی (مثلا ۳)
  };

  return d.toLocaleDateString("fa-IR", options);
}
