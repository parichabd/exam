// ============================================
// تبدیل تاریخ میلادی به شمسی (از قبل موجود)
// ============================================
export const gregorianToJalali = (gy, gm, gd) => {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let gy2 = gm > 2 ? gy + 1 : gy;
  let days = 355666 + 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) 
           + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? Math.floor(days / 31) : Math.floor((days - 186) / 30) + 7;
  const jd = days < 186 ? days % 31 + 1 : (days - 186) % 30 + 1;
  return { jy, jm, jd };
};

// ============================================
// ✅ تبدیل تاریخ شمسی به میلادی (جدید - دقیق)
// ============================================
export const jalaliToGregorian = (jy, jm, jd) => {
  let jy2 = jy + 1595;
  let days = -1220929 + 365 * jy2 + Math.floor(jy2 / 4) - Math.floor(jy2 / 100) 
           + Math.floor(jy2 / 400) + Math.floor((4800 + jm - 1) / 4) * 153 
           + Math.floor((jm + 2) % 12 / 7) * 28 + jd;
  
  let gy = 1600 + Math.floor((days - 1220921) / 365.2425);
  let gday = days - 365 * gy - Math.floor(gy / 4) + Math.floor(gy / 100) - Math.floor(gy / 400);
  
  let gm = 0;
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  for (gm = 0; gm < 12 && gday >= g_d_m[gm] + (gm > 2 && gy % 4 === 0 && (gy % 100 !== 0 || gy % 400 === 0) ? 1 : 0); gm++);
  let gd = gday - g_d_m[gm - 1] - (gm > 2 && gy % 4 === 0 && (gy % 100 !== 0 || gy % 400 === 0) ? 1 : 0);
  
  return { gy, gm, gd };
};

// ============================================
// فرمت تاریخ شمسی به رشته
// ============================================
export const formatToJalali = (value) => {
  if (!value) return "";
  
  // اگر Date object باشد
  if (value instanceof Date) {
    const { jy, jm, jd } = gregorianToJalali(value.getFullYear(), value.getMonth() + 1, value.getDate());
    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  }
  
  // اگر رشته باشد (ISO format)
  if (typeof value === "string") {
    const parts = value.split(/[-T]/);
    if (parts.length >= 3) {
      const gy = parseInt(parts[0], 10);
      const gm = parseInt(parts[1], 10);
      const gd = parseInt(parts[2], 10);
      const { jy, jm, jd } = gregorianToJalali(gy, gm, gd);
      return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
    }
  }
  
  return "";
};

// ============================================
// ✅ تبدیل رشته شمسی به میلادی (جدید)
// ============================================
export const jalaliToGregorianString = (shamsiDate) => {
  if (!shamsiDate) return null;
  
  // پشتیبانی از فرمت‌های مختلف
  let parts;
  if (shamsiDate.includes("/")) {
    parts = shamsiDate.split("/");
  } else if (shamsiDate.includes("-")) {
    parts = shamsiDate.split("-");
  } else {
    return null;
  }
  
  if (parts.length !== 3) return null;
  
  const jy = parseInt(parts[0], 10);
  const jm = parseInt(parts[1], 10);
  const jd = parseInt(parts[2], 10);
  
  if (isNaN(jy) || isNaN(jm) || isNaN(jd)) return null;
  
  const { gy, gm, gd } = jalaliToGregorian(jy, jm, jd);
  
  return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
};