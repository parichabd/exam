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
import { toPersianNumber } from "@/utils/number";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
  const [mobile, setMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mobile");
    }
    return null;
  });

  const handleLogout = () => {
    localStorage.removeItem("mobile");
    setMobile(null);
    setIsUserMenuOpen(false);
  };

  const userMenuContent = (
    <div className={styles.userMenu}>
      {mobile && (
        <div className={`${styles.item} ${styles.mobileOnly}`}>

          {toPersianNumber(mobile)}
        </div>
      )}
      <div className={styles.item}>
        <h1>اطلاعات حساب کاربری</h1>
        <Image
          src="/SVG/profile/profile.svg"
          alt="Torino Logo"
          width={20}
          height={20}
        />
      </div>
      <div className={styles.divider_profile}></div>
      <div className={styles.item} onClick={handleLogout}>
        <h1>خروج از حساب کاربری </h1>
        <Image
          src="/SVG/profile/logout.svg"
          alt="Torino Logo"
          width={20}
          height={20}
        />
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
          {/* DESKTOP */}
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
                      src="/icon/profile.png"
                      alt="profile"
                      width={19}
                      height={14}
                    />
                    <span className={styles.user_mobile}>
                      {toPersianNumber(mobile)}
                    </span>
                    <Image
                      src="/SVG/arrow-down.svg"
                      alt="arrow"
                      width={18}
                      height={18}
                      className={isUserMenuOpen ? styles.rotateArrow : ""}
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

          {/* MOBILE */}
          <div className={styles.mobile_menu}>
            {mobile ? (
              <div className={styles.userWrapper} ref={mobileRef}>
                <div className={styles.userSection} onClick={toggleUserMenu}>
                  <Image
                    src="/icon/profile.png"
                    alt="profile"
                    width={22}
                    height={22}
                  />
                  <span className={styles.user_mobile}>
                    {toPersianNumber(mobile)}
                  </span>
                  <Image
                    src="/SVG/arrow-down.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                    className={isUserMenuOpen ? styles.rotateArrow : ""}
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

      {/* MOBILE DRAWER */}
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
