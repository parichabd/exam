"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSendOtp } from "@/Hooks/useSendOtp";
import { useVerifyOtp } from "@/Hooks/useVerifyOtp";
import { registerUser } from "@/Services/Auth";
import Cookies from "js-cookie";

import styles from "./AuthToast.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function AuthToast({ onClose, mode = "login" }) {
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

  useEffect(() => {
    if (step !== "OTP" || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const submitPhone = async (data) => {
    setMobile(data.mobile);

    if (isRegister) {
      setRegisterData(data);
      await registerUser(data); // مسیر send-otp در Services/Auth اصلاح شده
    }

    sendOtpMutation.mutate(data.mobile, {
      onSuccess: () => {
        setStep("OTP");
        setTimeLeft(120);
      },
      onError: (err) =>
        alert("خطا در ارسال کد: " + err.response?.data?.message || err.message),
    });
  };

  const resendHandler = () => {
    sendOtpMutation.mutate(mobile);
    setTimeLeft(120);
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

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

  const submitOtp = () => {
    if (otp.some((d) => d === "")) {
      setOtpError("کد تایید را کامل وارد کنید");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    const code = otp.join("");

    verifyOtpMutation.mutate(
      { mobile, otp: code },
      {
        onSuccess: (res) => {
          // بک‌اند شما برمی‌گرداند: res.accessToken و res.user.firstName
          const token = res.accessToken;
          const name = res.user?.firstName || "";
          Cookies.set("token", token);
          localStorage.setItem("userName", name);
          onClose();
          router.push("/");
        },
        onError: () => {
          setOtpError("کد اشتباه است");
          setShake(true);
          setTimeout(() => setShake(false), 400);
        },
      },
    );
  };

  return (
    <div className={styles.toast_overlay}>
      <div className={styles.toast_box}>
        {/* UI همان قبلی است */}
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

        {step === "PHONE" && (
          <>
            <h2 className={styles.title}>
              {isRegister ? "ثبت نام" : "ورود به تورینو"}
            </h2>

            {!isRegister ? (
              <form
                className={styles.form}
                onSubmit={handleSubmit(submitPhone)}
              >
                <div className={styles.field}>
                  <label>شماره موبایل خود را وارد کنید</label>
                  <input
                    type="tel"
                    placeholder="۰۹۱۲***۶۶۰۶"
                    className={errors.mobile ? styles.inputError : ""}
                    {...register("mobile", {
                      required: "شماره موبایل الزامی است",
                    })}
                  />
                  <span className={styles.error}>{errors.mobile?.message}</span>
                </div>
                <p className={styles.loginPage}>
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className={styles.loginPage}
                  >
                    ثبت نام!
                  </button>
                </p>
                <button className={styles.submit}>ارسال کد تایید</button>
              </form>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit(submitPhone)}
              >
                <input
                  placeholder="نام"
                  {...register("name", { required: "نام الزامی است" })}
                />
                <span className={styles.error}>{errors.name?.message}</span>
                <input
                  placeholder="شماره موبایل"
                  {...register("mobile", {
                    required: "شماره موبایل الزامی است",
                  })}
                />
                <span className={styles.error}>{errors.mobile?.message}</span>
                <button className={styles.submit}>ثبت‌نام و ارسال کد</button>
              </form>
            )}
          </>
        )}

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
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  value={value}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
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
