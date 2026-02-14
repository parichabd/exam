const API_BASE = "http://localhost:6500"; // آدرس واقعی سرور

export async function sendOtp(mobile) {
  const res = await axios.post(`${API_BASE}/auth/send-otp`, { mobile });
  return res.data;
}

export async function verifyOtp({ mobile, otp }) {
  // توجه: نام فیلد باید code باشد
  const res = await axios.post(`${API_BASE}/auth/check-otp`, { mobile, code: otp });
  return res.data;
}

export async function registerUser({ name, mobile }) {
  // اگر بک‌اند شما send-otp را همزمان با ثبت‌نام می‌کند
  const res = await axios.post(`${API_BASE}/auth/send-otp`, { name, mobile });
  return res.data;
}