"use client"; // ⚠️ فراموش نکن، چون useRouter یک hook client-side است
import { useRouter } from "next/navigation";
import styles from "./PageNotfoundError.module.css";
import Image from "next/image";

export default function PageNotFound() {
  const router = useRouter();

  const homeHandler = () => {
    router.replace("/"); // یا router.push("/") اگر میخوای history نگه داشته بشه
  };

  return (
    <div className={styles.errordetails}>
      <Image
        src="/image/error/Error TV.svg"
        alt="Error TV"
        width={400}
        height={300}
        style={{ width: "100%", height: "auto" }}
      />
      <div className={styles.errordetails_prograph}>
        <p className={styles.footer_text}>صفحه مورد نظر یافت نشد!</p>
        <button className={styles.footer_button} onClick={homeHandler}>
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}