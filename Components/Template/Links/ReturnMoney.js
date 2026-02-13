import styles from "./ReturnMoney.module.css";

export default function ReturnMoney() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>راهنمای استرداد و کنسلی</h1>

      <section className={styles.section}>
        <h2>شرایط کنسلی</h2>
        <p>
          شرایط استرداد مبلغ تور بسته به زمان درخواست لغو به صورت زیر می‌باشد:
        </p>

        <ul>
          <li>تا <strong>۷۲ ساعت قبل از شروع تور</strong> → استرداد کامل مبلغ</li>
          <li>تا <strong>۴۸ ساعت قبل از شروع تور</strong> → ۷۰٪ مبلغ بازگردانده می‌شود</li>
          <li><strong>کمتر از ۲۴ ساعت قبل از شروع تور</strong> → امکان استرداد وجود ندارد</li>
        </ul>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h2>زمان و نحوه بازگشت وجه</h2>
        <ul>
          <li>
            مبلغ پرداختی حداکثر تا <strong>۳ الی ۵ روز کاری</strong> پس از تأیید
            کنسلی بازگردانده می‌شود.
          </li>
          <li>
            بازگشت وجه به <strong>همان کارت بانکی پرداخت‌کننده</strong> انجام
            خواهد شد.
          </li>
          <li>
            در برخی موارد، امکان واریز مبلغ به <strong>کیف پول کاربری</strong>
            نیز وجود دارد.
          </li>
        </ul>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h2>استثناها</h2>
        <p>در شرایط زیر قوانین استرداد ممکن است متفاوت باشد:</p>

        <ul>
          <li>تورهای چارتر</li>
          <li>تورهای لحظه آخری</li>
          <li>تورهای خارجی</li>
          <li>شرایط خاص و فورس ماژور (Force Majeure)</li>
        </ul>

        <p>
          در این موارد، شرایط استرداد بر اساس قوانین برگزارکننده تور محاسبه
          می‌شود.
        </p>
      </section>
    </main>
  );
}