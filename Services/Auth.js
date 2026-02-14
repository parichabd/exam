import axios from "axios";
console.log("Axios object:", axios);

const API_BASE = "http://localhost:6500"; // آدرس سرور بک‌اند

// ثبت نام اولیه (نام و موبایل)
export async function registerUser({ name, mobile }) {
  const res = await axios.post(`${API_BASE}/auth/register`, { name, mobile });
  return res.data;
}

// ارسال OTP
export async function sendOtp(mobile) {
  const res = await axios.post(`${API_BASE}/auth/send-otp`, { mobile });
  return res.data;
}

// بررسی OTP
export async function verifyOtp({ mobile, otp }) {
  const res = await axios.post(`${API_BASE}/auth/check-otp`, { mobile, code: otp });
  return res.data;
}