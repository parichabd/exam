import styles from "./OnlineSup.module.css";
import Image from "next/image";

export default function OnlineSup() {
  return (
    <section className={styles.support}>
      {/* Header */}
      <header className={styles.header}>
        <h1>پشتیبانی آنلاین تورینو</h1>
        <p>۷ روز هفته، از ساعت ۹ تا ۲۱ پاسخگوی شما هستیم</p>
      </header>

      {/* Contact Info */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <span>📞</span>
          <h3>تلفن پشتیبانی</h3>
          <p>۰۲۱-۸۵۷۴</p>
        </div>

        <div className={styles.card}>
          <span>📧</span>
          <h3>ایمیل</h3>
          <p>support@tourino.ir</p>
        </div>

        <div className={styles.card}>
          <span>💬</span>
          <h3>چت آنلاین</h3>
          <p>از طریق دکمه پایین صفحه</p>
        </div>
      </div>

      {/* FAQ */}
      <section className={styles.faq}>
        <h2>سوالات متداول</h2>

        <details>
          <summary>چطور تورم رو لغو کنم؟</summary>
          <p>
            وارد حساب کاربری شوید و از بخش «سفارش‌های من» درخواست لغو ثبت کنید.
          </p>
        </details>

        <details>
          <summary>زمان بازگشت وجه چقدره؟</summary>
          <p>بین ۳ تا ۷ روز کاری، بسته به نوع تور.</p>
        </details>

        <details>
          <summary>پرداخت ناموفق داشتم، چی کار کنم؟</summary>
          <p>اگر مبلغ کسر شده باشد، تا ۷۲ ساعت به‌صورت خودکار بازمی‌گردد.</p>
        </details>

        <details>
          <summary>امکان تغییر تاریخ تور هست؟</summary>
          <p>در صورت وجود ظرفیت و طبق قوانین تور، بله.</p>
        </details>
      </section>

      {/* Ticket Form */}
      {/* Ticket Form */}
      <section className={styles.ticket}>
        <h2>ارسال درخواست پشتیبانی</h2>
        <p>اگر پاسخ سوال خود را پیدا نکردید، فرم زیر را پر کنید.</p>

        <div className={styles.ticketWrapper}>
          {/* فرم */}
          <form className={styles.form}>
            <input type="text" placeholder="نام و نام خانوادگی" required />
            <input type="email" placeholder="ایمیل" required />

            <select required>
              <option value="">موضوع درخواست</option>
              <option>لغو یا بازگشت وجه</option>
              <option>مشکل پرداخت</option>
              <option>تغییر تاریخ تور</option>
              <option>سایر موارد</option>
            </select>

            <textarea rows="5" placeholder="توضیحات پیام" required></textarea>

            <button type="submit">ارسال درخواست</button>
          </form>

          {/* تصویر */}
          <div className={styles.ticketImage}>
            <Image
              src="/image/main/woman-having-video-call-home-laptop-device.jpg"
              alt="پشتیبانی آنلاین"
              width={800} // اندازه تقریبی یا اندازه واقعی تصویر
              height={500} // اندازه تقریبی یا اندازه واقعی تصویر
              style={{ width: "100%", height: "auto" }} // ریسپانسیو
              priority // چون احتمالاً تصویر Hero یا بالای صفحه است
            />
          </div>
        </div>
      </section>
    </section>
  );
}
