"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSendOtp } from "@/Hooks/useSendOtp";
import { useVerifyOtp } from "@/Hooks/useVerifyOtp";
import { registerUser } from "@/Services/Auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import { FaArrowLeftLong } from "react-icons/fa6";
import styles from "./AuthToast.module.css";

export default function AuthToast({ onClose, mode = "login" }) {
  const router = useRouter();

  const [step, setStep] = useState("PHONE");
  const [isRegister, setIsRegister] = useState(mode === "register");
  const [mobile, setMobile] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [shake, setShake] = useState(false);

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

  // تبدیل اعداد فارسی به انگلیسی
  const persianToEnglish = (str) =>
    str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

  const submitPhone = async (data) => {
    setMobile(data.mobile);
    if (isRegister) {
      try {
        await registerUser(data);
      } catch (err) {
        alert(err.response?.data?.message || err.message || "خطای ثبت نام");
        return;
      }
    }
    sendOtpMutation.mutate(data.mobile, {
      onSuccess: () => {
        setStep("OTP");
        setTimeLeft(120);
        setOtp("");
      },
      onError: (err) => {
        alert(err.response?.data?.message || err.message || "خطا در ارسال کد");
      },
    });
  };

  const resendHandler = () => {
    sendOtpMutation.mutate(mobile, {
      onSuccess: () => {
        setTimeLeft(120);
        setOtp("");
      },
    });
  };

  const formatTime = (t) =>
    `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;

  const submitOtp = () => {
    if (otp.length !== 6) {
      setOtpError("کد تایید را کامل وارد کنید");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    verifyOtpMutation.mutate(
      { mobile, otp },
      {
        onSuccess: (res) => {
          Cookies.set("token", res.accessToken);
          localStorage.setItem("userName", res.user?.firstName || "");
          onClose();
          router.push("/new");
        },
        onError: (err) => {
          setOtpError(err.response?.data?.message || "کد اشتباه است");
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
              setOtp("");
              setOtpError("");
              setTimeLeft(120);
            }}
          >
            <FaArrowLeftLong />
          </button>
        )}

        {/* فرم شماره */}
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

              <button
                className={styles.submit}
                disabled={sendOtpMutation.isPending}
              >
                {sendOtpMutation.isPending
                  ? "در حال ارسال..."
                  : isRegister
                    ? "ثبت‌نام و ارسال کد"
                    : "ارسال کد تایید"}
              </button>

              {!isRegister && (
                <p className={styles.loginPage}>
                  <button type="button" onClick={() => setIsRegister(true)}>
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
              className={`${styles.otpWrapper} ${shake ? styles.shake : ""}`}
            >
              <OtpInput
                value={otp}
                onChange={(v) => {
                  const clean = persianToEnglish(v.replace(/[^0-9۰-۹]/g, ""));
                  setOtp(clean);
                  setOtpError("");
                }}
                numInputs={6}
                shouldAutoFocus
                inputType="tel"
                renderSeparator={<span style={{ width: "16px" }} />}
                renderInput={(props) => (
                  <input
                    {...props}
                    maxLength={1}
                    style={{
                      width: "55px", // عرض مربع
                      height: "45px", // ارتفاع مربع
                      fontSize: "26px", // اندازه فونت
                      textAlign: "center",
                      borderRadius: "8px",
                      border: "1px solid #00000040",
                    }}
                    className={`${styles.otpInput} ${
                      otpError ? styles.otpErrorInput : ""
                    }`}
                  />
                )}
              />
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

            <button
              className={styles.submit}
              onClick={submitOtp}
              disabled={verifyOtpMutation.isPending}
            >
              {verifyOtpMutation.isPending
                ? "در حال بررسی..."
                : "ورود به تورینو"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
