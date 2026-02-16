"use client";
import styles from "./UserMenu.module.css";

export default function UserMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.menu}>
      <div className={styles.item}>پروفایل من</div>
      <div className={styles.item}>تراکنش‌ها</div>
      <div className={styles.item}>تنظیمات</div>
      <div className={styles.item} onClick={onClose}>بستن</div>
    </div>
  );
}