"use client";

import styles from "./ServerConectionError.module.css";
import Image from "next/image";

export default function ServerConectionError({ error, reset }) {
  return (
    <div className={styles.errordetails}>
      <Image
        src="/image/error/Error Lamp Robot.png"
        alt="Server Error"
        width={400}
        height={300}
        style={{ width: "100%", height: "auto" }}
      />
      <div className={styles.errordetails_prograph}>
        <p className={styles.footer_text}>
          اتصال با سرور برقرار نیست!
        </p>
        <p className={styles.footer_subtext}>
          لطفا بعدا دوباره امتحان کنید.
        </p>

        <button onClick={() => reset()}>
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}