"use client";
import styles from "./UserMenu.module.css";

export default function UserMenu({ isOpen, mobile }) {
  if (!isOpen) return null;

  return (
    <div className={styles.menu}>
      <div className={styles.item}> {mobile}</div>
      <div className={styles.item}>اطلاعات حساب کاربری</div>
      <div className={styles.item}>خروج از حساب کاربری</div>
    </div>
  );
}
