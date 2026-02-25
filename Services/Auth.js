"use client";

import api from "@/lib/api";
import Cookies from "js-cookie";

// ثبت نام اولیه
export async function registerUser({ name, mobile }) {
  const res = await api.post("/auth/register", { name, mobile });
  return res.data;
}

// ارسال OTP
export async function sendOtp(mobile) {
  const res = await api.post("/auth/send-otp", { mobile });
  return res.data;
}

// بررسی OTP و ذخیره توکن‌ها
export async function verifyOtp({ mobile, otp }) {
  const res = await api.post("/auth/check-otp", { mobile, code: otp });
  const { accessToken, refreshToken, user } = res.data;

  // ذخیره توکن‌ها
  Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // 1 ساعت
  Cookies.set("refreshToken", refreshToken, { expires: 7 });     // 7 روز
  localStorage.setItem("mobile", mobile);

  console.log("LOGIN RESPONSE:", res.data);
  console.log("Saved access:", Cookies.get("accessToken"));
  console.log("Saved refresh:", Cookies.get("refreshToken"));

  return { user, accessToken, refreshToken }; // ✅ مهم: refreshToken هم برگرده
}


