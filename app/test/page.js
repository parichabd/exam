// pages/test-cookies.js
"use client"; // ← ا
import { getCookie } from "../../utils/cookie";

export default function TestCookies() {
  const showAllCookies = () => {
    console.log("همه کوکی‌ها:", document.cookie);
    console.log("accessToken:", getCookie("accessToken"));
    console.log("token:", getCookie("token"));
    
    // چاپ همه کوکی‌ها
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie, index) => {
      console.log(`کوکی ${index + 1}:`, cookie.trim());
    });
  };

  return (
    <div>
      <button onClick={showAllCookies}>نمایش کوکی‌ها</button>
    </div>
  );
}