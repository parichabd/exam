// Components/Layout/Header.js
"use client"; // فراموش نشه برای useState و تعامل کاربر
import { useState } from "react";
import Link from "next/link";
import AuthToast from "@/Components/Auth/AuthToast";

import styles from "./Layout.module.css";

import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAirplaneTicket, MdOutlinePermPhoneMsg } from "react-icons/md";
import { PiUserSoundDuotone } from "react-icons/pi";
import Image from "next/image";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const menuHandler = () => setIsOpen((prev) => !prev);
  const openLogin = () => {
    setAuthMode("login");
    setIsToastOpen(true);
  };
  const openRegister = () => {
    setAuthMode("register");
    setIsToastOpen(true);
  };

  return (
    <header className={`${styles.header_layout} ${styles.container}`}>
      {/* لوگو و منوی دسکتاپ */}
      <div className={styles.desktop_menu}>
        <Image
          src="/image/Torino (4) 1.png"
          width={145}
          height={40}
          alt="تورینو"
        />
        <Link href="/">صفحه اصلی</Link>
        <Link href="/Guide/TourismServices">خدمات گردشگری</Link>
        <Link href="/Info/about">درباره ما</Link>
        <Link href="/Info/contact">تماس با ما</Link>

        {/* ورود / ثبت نام دسکتاپ */}
        <div className={styles.login_desktop}>
          <button onClick={openLogin}>ورود</button>
          <span>|</span>
          <button onClick={openRegister}>ثبت نام</button>
        </div>
      </div>

      {/* منوی موبایل */}
      <div className={styles.mobile_menu}>
        <button className={styles.button} onClick={menuHandler}>
          <Image src="/icon/Group 46.png" width={500} height={500} alt="menu" />
        </button>
        <button className={styles.mobile_buttom} onClick={openLogin}>
          <Image
            src="/icon/sign in buttom.png"
            width={500}
            height={500}
            alt="ورود"
          />
        </button>
      </div>

      {/* Overlay موبایل */}
      {isOpen && (
        <div className={styles.mobile_overlay} onClick={menuHandler} />
      )}

      {/* Mobile Drawer */}
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

      {/* Auth Toast */}
      {isToastOpen && (
        <AuthToast mode={authMode} onClose={() => setIsToastOpen(false)} />
      )}
    </header>
  );
}
