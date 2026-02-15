"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSendOtp } from "@/Hooks/useSendOtp";
import { useVerifyOtp } from "@/Hooks/useVerifyOtp";
import { registerUser } from "@/Services/Auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import styles from "./AuthToast.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function AuthToast({ onClose, mode = "login" }) {
  const router = useRouter();

  const [step, setStep] = useState("PHONE");
  const [isRegister, setIsRegister] = useState(mode === "register");
  const [mobile, setMobile] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [shake, setShake] = useState(false);
  const [registerData, setRegisterData] = useState({});

  const otpRefs = useRef([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  // تایمر کد
  useEffect(() => {
    if (step !== "OTP" || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // ارسال شماره موبایل / ثبت نام
  const submitPhone = async (data) => {
    setMobile(data.mobile);

    if (isRegister) {
      setRegisterData(data);
      try {
        console.log("Registering user:", data);
        await registerUser(data);
      } catch (err) {
        alert("خطا در ثبت‌نام: " + err.response?.data?.message || err.message);
        return;
      }
    }

    sendOtpMutation.mutate(data.mobile, {
      onSuccess: (res) => {
        console.log("OTP sent:", res);
        setStep("OTP");
        setTimeLeft(120);
        setOtp(["", "", "", "", ""]);
      },
      onError: (err) => {
        alert("خطا در ارسال کد: " + err.response?.data?.message || err.message);
      },
    });
  };

  const resendHandler = () => {
    console.log("Resending OTP to:", mobile);
    sendOtpMutation.mutate(mobile, {
      onSuccess: (res) => {
        console.log("Resent OTP:", res);
        setTimeLeft(120);
        setOtp(["", "", "", "", ""]);
      },
    });
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // تغییر هر input OTP
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");
    if (value && index < 4) otpRefs.current[index + 1].focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      otpRefs.current[index - 1].focus();
  };

  // ارسال OTP به backend
  const submitOtp = () => {
    if (otp.some((d) => d === "")) {
      setOtpError("کد تایید را کامل وارد کنید");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    // OTP string کامل با صفر اول
    const code = otp.join("").padStart(5, "0");
    console.log("submitOtp called with:", { mobile, code });

    verifyOtpMutation.mutate(
      { mobile, otp: code },
      {
        onSuccess: (res) => {
          console.log("verifyOtp success response:", res);
          const token = res.accessToken;
          const name = res.user?.firstName || "";
          Cookies.set("token", token);
          localStorage.setItem("userName", name);
          onClose();
          router.push("/new");
        },
        onError: (err) => {
          // اگر err.response.data موجود باشد استفاده کن
          if (err.response?.data) {
            console.log("verifyOtp error response:", err.response.data);
            setOtpError(err.response.data.message || "کد اشتباه است");
          } else {
            console.log("verifyOtp error:", err);
            setOtpError("کد اشتباه است");
          }
          setShake(true);
          setTimeout(() => setShake(false), 400);
        },
      },
    );
  };

  return (
    <div className={styles.toast_overlay}>
      <div className={styles.toast_box}>
        {/* دکمه‌ها */}
        {step === "PHONE" ? (
          isRegister ? (
            <button
              className={styles.back_btn}
              onClick={() => {
                setIsRegister(false);
                reset();
              }}
            >
              <FaArrowLeftLong />
            </button>
          ) : (
            <button className={styles.close_btn} onClick={onClose}>
              ✕
            </button>
          )
        ) : (
          <button
            className={styles.back_btn}
            onClick={() => {
              setStep("PHONE");
              setIsRegister(false);
              setOtp(["", "", "", "", ""]);
              setOtpError("");
              setTimeLeft(120);
            }}
          >
            <FaArrowLeftLong />
          </button>
        )}

        {/* فرم شماره موبایل */}
        {step === "PHONE" && (
          <>
            <h2 className={styles.title}>
              {isRegister ? "ثبت نام" : "ورود به تورینو"}
            </h2>

            <form className={styles.form} onSubmit={handleSubmit(submitPhone)}>
              {isRegister && (
                <>
                  <input
                    placeholder="نام"
                    {...register("name", { required: "نام الزامی است" })}
                  />
                  <span className={styles.error}>{errors.name?.message}</span>
                </>
              )}
              <input
                type="tel"
                placeholder="۰۹۱۲***۶۶۰۶"
                {...register("mobile", { required: "شماره موبایل الزامی است" })}
              />
              <span className={styles.error}>{errors.mobile?.message}</span>

              <button className={styles.submit}>
                {isRegister ? "ثبت‌نام و ارسال کد" : "ارسال کد تایید"}
              </button>

              {!isRegister && (
                <p className={styles.loginPage}>
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className={styles.loginPage}
                  >
                    ثبت نام!
                  </button>
                </p>
              )}
            </form>
          </>
        )}

        {/* فرم OTP */}
        {step === "OTP" && (
          <>
            <h2 className={styles.title}>کد تایید را وارد کنید</h2>
            <p className={styles.mobileHint}>
              کد به شماره <span>{mobile}</span> ارسال شد
            </p>
            <div
              className={`${styles.otp} ${otpError ? styles.otpError : ""} ${shake ? styles.shake : ""}`}
              dir="ltr"
            >
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  value={v}
                  maxLength={1}
                  type="text"
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                />
              ))}
            </div>
            <div className={styles.errorBox}>{otpError}</div>
            {timeLeft > 0 ? (
              <p className={styles.timer}>
                {formatTime(timeLeft)} تا ارسال مجدد کد
              </p>
            ) : (
              <button className={styles.resend} onClick={resendHandler}>
                ارسال مجدد کد
              </button>
            )}
            <button className={styles.submit} onClick={submitOtp}>
              ورود به تورینو
            </button>
          </>
        )}
      </div>
    </div>
  );
}
