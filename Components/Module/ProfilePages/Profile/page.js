"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { toPersianNumber } from "@/utils/number"; // فرض بر این است که این تابع را دارید
import styles from "./Profile.module.css";

// تابع کمکی برای خواندن کوکی
const getCookieValue = (name) => {
  if (typeof window === "undefined") return "";
  return Cookies.get(name) || "";
};

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  
  const [accountData, setAccountData] = useState({ mobile: "", email: "" });
  const [personalData, setPersonalData] = useState({
    fullName: "",
    gender: "",
    nationalId: "",
    birthDate: "",
  });
  const [bankData, setBankData] = useState({
    cardNumber: "",
    sheba: "",
  });

  useEffect(() => {
    // ۱. اطلاعات حساب (از لاگین)
    const mobile = localStorage.getItem("mobile") || "";
    // نام کاربری ممکن است در کوکی یا لوکال استوریج باشد
    const storedName = localStorage.getItem("userName") || getCookieValue("userName") || "";

    // ۲. اطلاعات شخصی (از رزرو)
    const fullName = localStorage.getItem("passengerFullName") || storedName;
    const gender = localStorage.getItem("passengerGender") || "";
    const nationalId = localStorage.getItem("passengerNationalId") || "";
    const birthDate = localStorage.getItem("passengerBirthDate") || "";

    // ۳. اطلاعات بانکی (از درگاه)
    const fullCard = localStorage.getItem("fullCardNumber") || "";
    // اگر کل کارت نبود، از ۴ رقم آخر استفاده کن (اما فرمت نشده)
    const lastFour = localStorage.getItem("lastUsedCard") || "";
    const cardToShow = fullCard || (lastFour ? `**** **** **** ${lastFour}` : "");

    setAccountData({ mobile, email: "user@example.com" }); // ایمیل را باید از API بگیرید یا در لاگین ذخیره کنید
    setPersonalData({ fullName, gender, nationalId, birthDate });
    setBankData({ cardNumber: cardToShow, sheba: "" });

    setLoading(false);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEditClick = (section) => {
    setEditingSection(section);
    if (section === "account") reset({ mobile: accountData.mobile, email: accountData.email });
    else if (section === "personal") reset({ ...personalData });
    else if (section === "bank") reset({ ...bankData });
  };

  const onSubmit = (data) => {
    if (editingSection === "account") {
      setAccountData(data);
      localStorage.setItem("mobile", data.mobile);
      toast.success("اطلاعات حساب ذخیره شد");
    } else if (editingSection === "personal") {
      setPersonalData(data);
      localStorage.setItem("passengerFullName", data.fullName);
      localStorage.setItem("passengerGender", data.gender);
      localStorage.setItem("passengerNationalId", data.nationalId);
      localStorage.setItem("passengerBirthDate", data.birthDate);
      toast.success("مشخصات مسافر ذخیره شد");
    } else if (editingSection === "bank") {
      setBankData(data);
      localStorage.setItem("fullCardNumber", data.cardNumber);
      toast.success("اطلاعات بانکی ذخیره شد");
    }
    setEditingSection(null);
  };

  if (loading) return <div className={styles.loading}>در حال بارگذاری...</div>;

  return (
    <div className={styles.container}>
      <Toaster position="top-center" />
      <h2 className={styles.title}>پروفایل کاربری</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* --- ۱. اطلاعات حساب کاربری --- */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>اطلاعات حساب کاربری</h3>
            <button type="button" className={styles.editBtn} onClick={() => handleEditClick("account")}>
              {editingSection === "account" ? "لغو" : "ویرایش"}
            </button>
          </div>
          <div className={styles.content}>
            {editingSection === "account" ? (
              <div className={styles.formGroup}>
                <label>شماره موبایل</label>
                <input type="tel" {...register("mobile", { required: "الزامی است" })} className={errors.mobile ? styles.errorInput : ""} />
                {errors.mobile && <span className={styles.errorText}>{errors.mobile.message}</span>}
                <label>ایمیل</label>
                <input type="email" {...register("email", { required: "الزامی است" })} className={errors.email ? styles.errorInput : ""} />
                {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
                <button type="submit" className={styles.saveBtn}>ذخیره</button>
              </div>
            ) : (
              <>
                <div className={styles.infoRow}>
                  <span className={styles.label}>شماره موبایل:</span>
                  <span className={styles.value} dir="ltr">{toPersianNumber(accountData.mobile)}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>ایمیل:</span>
                  <span className={styles.value} dir="ltr">{accountData.email}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* --- ۲. اطلاعات شخصی --- */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>اطلاعات شخصی و مسافر</h3>
            <button type="button" className={styles.editBtn} onClick={() => handleEditClick("personal")}>
              {editingSection === "personal" ? "لغو" : "ویرایش"}
            </button>
          </div>
          <div className={styles.content}>
            {editingSection === "personal" ? (
              <div className={styles.formGroup}>
                <div className={styles.twoCols}>
                  <div>
                    <label>نام و نام خانوادگی</label>
                    <input type="text" {...register("fullName", { required: "الزامی است" })} className={errors.fullName ? styles.errorInput : ""} />
                    {errors.fullName && <span className={styles.errorText}>{errors.fullName.message}</span>}
                  </div>
                  <div>
                    <label>جنسیت</label>
                    <select {...register("gender", { required: "الزامی است" })} className={errors.gender ? styles.errorInput : ""}>
                      <option value="male">مرد</option>
                      <option value="female">زن</option>
                      <option value="other">سایر</option>
                    </select>
                  </div>
                </div>
                <div className={styles.twoCols}>
                  <div>
                    <label>کد ملی</label>
                    <input type="text" {...register("nationalId", { required: "الزامی است", pattern: { value: /^[0-9]{10}$/, message: "۱۰ رقم باشد" } })} maxLength={10} className={errors.nationalId ? styles.errorInput : ""} />
                    {errors.nationalId && <span className={styles.errorText}>{errors.nationalId.message}</span>}
                  </div>
                  <div>
                    <label>تاریخ تولد</label>
                    <input type="text" {...register("birthDate", { required: "الزامی است" })} placeholder="1370/01/01" className={errors.birthDate ? styles.errorInput : ""} />
                    {errors.birthDate && <span className={styles.errorText}>{errors.birthDate.message}</span>}
                  </div>
                </div>
                <button type="submit" className={styles.saveBtn}>ذخیره</button>
              </div>
            ) : (
              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>نام و نام خانوادگی:</span>
                  <span className={styles.value}>{personalData.fullName || "ثبت نشده"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>جنسیت:</span>
                  <span className={styles.value}>{personalData.gender === "male" ? "مرد" : personalData.gender === "female" ? "زن" : "سایر"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>کد ملی:</span>
                  <span className={styles.value} dir="ltr">{personalData.nationalId || "ثبت نشده"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>تاریخ تولد:</span>
                  <span className={styles.value}>{personalData.birthDate || "ثبت نشده"}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* --- ۳. اطلاعات حساب بانکی --- */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>اطلاعات حساب بانکی</h3>
            <button type="button" className={styles.editBtn} onClick={() => handleEditClick("bank")}>
              {editingSection === "bank" ? "لغو" : "ویرایش"}
            </button>
          </div>
          <div className={styles.content}>
            {editingSection === "bank" ? (
              <div className={styles.formGroup}>
                <label>شماره شبا</label>
                <input type="text" {...register("sheba", { required: "الزامی است" })} placeholder="IR..." dir="ltr" className={errors.sheba ? styles.errorInput : ""} />
                {errors.sheba && <span className={styles.errorText}>{errors.sheba.message}</span>}
                <label>شماره کارت</label>
                <input type="text" {...register("cardNumber", { required: "الزامی است" })} placeholder="XXXX XXXX XXXX XXXX" dir="ltr" className={errors.cardNumber ? styles.errorInput : ""} />
                {errors.cardNumber && <span className={styles.errorText}>{errors.cardNumber.message}</span>}
                <button type="submit" className={styles.saveBtn}>ذخیره</button>
              </div>
            ) : (
              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>شماره شبا:</span>
                  <span className={styles.value} dir="ltr">{bankData.sheba || "ثبت نشده"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>شماره کارت:</span>
                  <span className={styles.value} dir="ltr">{bankData.cardNumber || "ثبت نشده"}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}