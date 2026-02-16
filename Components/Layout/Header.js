"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthToast from "@/Components/Auth/AuthToast";

import styles from "./Layout.module.css";

import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAirplaneTicket, MdOutlinePermPhoneMsg } from "react-icons/md";
import { PiUserSoundDuotone } from "react-icons/pi";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const pathname = usePathname();

  // state شماره موبایل
  const [mobile, setMobile] = useState(null);

  const menuHandler = () => setIsOpen((prev) => !prev);
  const openLogin = () => {
    setAuthMode("login");
    setIsToastOpen(true);
  };
  const openRegister = () => {
    setAuthMode("register");
    setIsToastOpen(true);
  };

  // خواندن شماره موبایل از localStorage هنگام mount
  useEffect(() => {
    const storedMobile = localStorage.getItem("mobile");
    if (storedMobile) {
      // حالت async برای جلوگیری از رندر همزمان
      setTimeout(() => {
        setMobile(storedMobile);
      }, 0);
    }
  }, [pathname]);

  return (
    <>
      <header className={`${styles.header_layout} ${styles.container}`}>
        <div className={styles.left_side}>
          <div className={styles.desktop_menu}>
            <Image
              src="/image/Torino (4) 1.png"
              alt="Torino Logo"
              width={120}
              height={40}
            />
            <Link href="/">صفحه اصلی</Link>
            <Link href="/Guide/TourismServices">خدمات گردشگری</Link>
            <Link href="/Info/about-us">درباره ما</Link>
            <Link href="/Info/contact">تماس با ما</Link>
          </div>

          <div className={styles.mobile_menu}>
            <button
              className={`${styles.button} ${styles.overlay}`}
              onClick={menuHandler}
            >
              <Image
                src="/icon/Group 46.png"
                alt="menu"
                width={35}
                height={35}
              />
            </button>
          </div>
        </div>

        <div className={styles.right_side}>
          <div className={styles.desktop_menu}>
            <div className={styles.login_desktop}>
              {mobile ? (
                // اگر شماره موبایل موجود بود، نمایشش بده
                <span className={styles.user_mobile}>{mobile}</span>
              ) : (
                // اگر نبود، دکمه‌های ورود/ثبت نام
                <>
                  <div className={styles.login_icon}>
                    <Image
                      src="/icon/profile.png"
                      alt="profile"
                      width={24}
                      height={24}
                    />
                    <button
                      className={styles.mobile_buttom}
                      onClick={openLogin}
                    >
                      <span>ورود</span>
                    </button>
                    <span>|</span>
                  </div>
                  <button
                    className={styles.mobile_buttom}
                    onClick={openRegister}
                  >
                    <span className={styles.signup}>ثبت نام</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.mobile_menu}>
            {mobile ? (
              <span className={styles.user_mobile}>{mobile}</span>
            ) : (
              <button className={styles.mobile_buttom} onClick={openLogin}>
                <Image
                  src="/icon/sign in buttom.png"
                  alt="sign in"
                  width={40}
                  height={40}
                />
              </button>
            )}
          </div>
        </div>
      </header>

      {isOpen && (
        <div className={styles.mobile_overlay} onClick={menuHandler} />
      )}

      <nav className={`${styles.mobile_drawer} ${isOpen ? styles.open : ""}`}>
        <Link href="/" onClick={menuHandler}>
          <IoHomeOutline /> صفحه اصلی
        </Link>
        <Link href="/Guide/TourismServices" onClick={menuHandler}>
          <MdOutlineAirplaneTicket /> خدمات گردشگری
        </Link>
        <Link href="/Info/about" onClick={menuHandler}>
          <PiUserSoundDuotone /> درباره ما
        </Link>
        <Link href="/Info/contact" onClick={menuHandler}>
          <MdOutlinePermPhoneMsg /> تماس با ما
        </Link>
      </nav>

      {isToastOpen && (
        <AuthToast mode={authMode} onClose={() => setIsToastOpen(false)} />
      )}
    </>
  );
}
