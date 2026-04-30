export const toEnglishDigits = (str) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  let result = str;

  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(persianDigits[i], "g"), i);
    result = result.replace(new RegExp(arabicDigits[i], "g"), i);
  }
  return result;
};

export const formatCardNumber = (value) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 16);
  const chunks = cleaned.match(/.{1,4}/g) || [];
  return chunks.join(" ");
};

export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, "");

  if (!/^\d{16}$/.test(cleaned)) {
    return { valid: false, message: "شماره کارت باید ۱۶ رقم باشد" };
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return { valid: false, message: "شماره کارت معتبر نیست" };
  }

  return { valid: true, message: "" };
};

export const validateSheba = (sheba) => {
  const cleaned = toEnglishDigits(sheba).toUpperCase().replace(/\s/g, "");

  if (!cleaned.startsWith("IR")) {
    return { valid: false, message: "شماره شبا با IR شروع می‌شود" };
  }

  const iban = cleaned.slice(2);

  if (!/^\d{24}$/.test(iban)) {
    return { valid: false, message: "شماره شبا باید ۲۴ رقم باشد" };
  }

  const rearranged = iban + "1827";
  const numericIban = BigInt(rearranged);

  if (numericIban % 97n !== 1n) {
    return { valid: false, message: "شماره شبا معتبر نیست" };
  }

  return { valid: true, message: "" };
};

export const validateAccountNumber = (accountNumber) => {
  const cleaned = toEnglishDigits(accountNumber);

  if (!/^\d{10,13}$/.test(cleaned)) {
    return { valid: false, message: "شماره حساب ۱۰ تا ۱۳ رقم است" };
  }

  return { valid: true, message: "" };
};

export const getCardType = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, "");

  if (/^6037/.test(cleaned)) return { name: " ملی", color: "#1E3A5F" };
  if (/^6219/.test(cleaned)) return { name: " سامان", color: "#0066B3" };
  if (/^58921/.test(cleaned)) return { name: " سپه", color: "#1E3A5F" }; // ✅ اصلاح شد
  if (/^6274/.test(cleaned)) return { name: " مهر", color: "#8B0000" };
  if (/^6278/.test(cleaned)) return { name: " اقتصاد نوین", color: "#2E7D32" };
  if (/^6362/.test(cleaned)) return { name: " آینده", color: "#FF6F00" };
  if (/^5054/.test(cleaned)) return { name: " ایران زمین", color: "#4A148C" };
  if (/^6280/.test(cleaned))
    return { name: " قرض الحسنه مهر", color: "#C62828" };
  if (/^6276/.test(cleaned)) return { name: " مسکن", color: "#1565C0" };
  if (/^6393/.test(cleaned)) return { name: " پارسیان", color: "#2E7D32" };
  if (/^6395/.test(cleaned)) return { name: " پاسارگاد", color: "#D84315" };
  if (/^5022/.test(cleaned)) return { name: " پاسارگاد", color: "#D84315" };
  if (/^6104/.test(cleaned)) return { name: " ملت", color: "#1A237E" };
  if (/^6277/.test(cleaned)) return { name: " پست", color: "#E65100" };
  if (/^5041/.test(cleaned))
    return { name: " قرض الحسنه رسالت", color: "#00838F" };
  if (/^5859/.test(cleaned)) return { name: " تجارت ", color: "#1a67eb" };

  return null;
};

export const formatSheba = (sheba) => {
  const cleaned = toEnglishDigits(sheba).toUpperCase().replace(/\s/g, "");

  if (cleaned.length <= 4) return cleaned;

  const iban = cleaned.slice(2);
  const chunks = iban.match(/.{1,4}/g) || [];

  return "IR" + chunks.join(" ");
};
