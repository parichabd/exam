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

  // تایمر
  useEffect(() => {
    if (step !== "OTP" || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // ارسال شماره
  const submitPhone = async (data) => {
    setMobile(data.mobile);

    if (isRegister) {
      try {
        await registerUser(data);
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || "خطای ثبت نام";
        alert(message);
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
        const message =
          err.response?.data?.message || err.message || "خطا در ارسال کد";
        alert(message);
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

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // ارسال OTP
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
          const token = res.accessToken;
          const name = res.user?.firstName || "";

          Cookies.set("token", token);
          localStorage.setItem("userName", name);

          onClose();
          router.push("/new");
        },
        onError: (err) => {
          const message =
            err.response?.data?.message || "کد اشتباه است";
          setOtpError(message);
          setShake(true);
          setTimeout(() => setShake(false), 400);
        },
      }
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
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
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
              className={`${styles.otpWrapper} ${
                shake ? styles.shake : ""
              }`}
            >
              <OtpInput
                value={otp}
                onChange={(value) => {
                  if (/^\d*$/.test(value)) {
                    setOtp(value);
                    setOtpError("");
                  }
                }}
                numInputs={6}
                shouldAutoFocus
                inputType="tel"
                renderSeparator={<span style={{ width: "8px" }} />}
                renderInput={(props) => (
                  <input
                    {...props}
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
              <button
                className={styles.resend}
                onClick={resendHandler}
              >
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