"use client";
import { useState, useEffect, useRef } from "react";
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(null);

  const pathname = usePathname();
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const menuHandler = () => setIsOpen((prev) => !prev);

  const openLogin = () => {
    setAuthMode("login");
    setIsToastOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setIsToastOpen(true);
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen((prev) => !prev);
  };

  // بستن منو با کلیک بیرون (با توجه به دسکتاپ یا موبایل)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDesktop = window.innerWidth >= 1024;
      const ref = isDesktop ? desktopRef.current : mobileRef.current;

      if (ref && !ref.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // خواندن شماره موبایل
  useEffect(() => {
    const storedMobile = localStorage.getItem("mobile");
    if (storedMobile) {
      setTimeout(() => setMobile(storedMobile), 0);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("mobile");
    setMobile(null);
    setIsUserMenuOpen(false);
  };
  //ثبت نام
  const userMenuContent = (
    <div className={styles.userMenu}>
      {mobile && (
        <div className={`${styles.item} ${styles.mobileOnly}`}>{mobile}</div>
      )}
      <div className={styles.item}>اطلاعات حساب کاربری</div>
      <div className={styles.item} onClick={handleLogout}>
        خروج از حساب کاربری
      </div>
    </div>
  );

  return (
    <>
      <header className={`${styles.header_layout} ${styles.container}`}>
        {/* LEFT SIDE */}
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
            <button className={styles.button} onClick={menuHandler}>
              <Image
                src="/icon/Group 46.png"
                alt="menu"
                width={35}
                height={35}
              />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right_side}>
          {/* DESKTOP USER SECTION */}
          <div className={styles.desktop_menu}>
            <div
              className={`${styles.login_desktop} ${
                mobile ? styles.noBorder : ""
              }`}
            >
              {mobile ? (
                <div className={styles.userWrapper} ref={desktopRef}>
                  <div className={styles.userSection} onClick={toggleUserMenu}>
                    <Image
                      className={styles.profile_icon}
                      src="/icon/profile.png"
                      alt="profile"
                      width={19}
                      height={14}
                    />
                    <span className={styles.user_mobile}>{mobile}</span>
                    <Image
                      src="/SVG/arrow-down.svg"
                      alt="arrow"
                      width={18}
                      height={18}
                      className={`${styles.profile_arrow} ${
                        isUserMenuOpen ? styles.rotateArrow : ""
                      }`}
                    />
                  </div>

                  {isUserMenuOpen && userMenuContent}
                </div>
              ) : (
                <>
                  <div className={styles.login_icon}>
                    <Image
                      src="/icon/profile.png"
                      alt="profile"
                      width={22}
                      height={22}
                    />
                    <button onClick={openLogin}>ورود</button>
                    <span>|</span>
                  </div>
                  <div className={styles.login_icon}>
                    <button onClick={openRegister}>ثبت نام</button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* MOBILE USER SECTION */}
          <div className={styles.mobile_menu}>
            {mobile ? (
              <div className={styles.userWrapper} ref={mobileRef}>
                <div className={styles.userSection} onClick={toggleUserMenu}>
                  <Image
                    className={styles.profile_icon}
                    src="/icon/profile.png"
                    alt="profile"
                    width={20}
                    height={20}
                  />
                  <span className={styles.user_mobile}>{mobile}</span>
                  <Image
                    src="/SVG/arrow-down.svg"
                    alt="arrow"
                    width={18}
                    height={18}
                    className={`${styles.profile_arrow} ${
                      isUserMenuOpen ? styles.rotateArrow : ""
                    }`}
                  />
                </div>

                {isUserMenuOpen && userMenuContent}
              </div>
            ) : (
              <button onClick={openLogin}>
                <Image
                  src="/icon/sign in buttom.png"
                  alt="sign in"
                  width={47}
                  height={47}
                />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY & DRAWER */}
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

      {/* AUTH TOAST */}
      {isToastOpen && (
        <AuthToast mode={authMode} onClose={() => setIsToastOpen(false)} />
      )}
    </>
  );
}
