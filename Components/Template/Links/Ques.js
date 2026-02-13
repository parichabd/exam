import styles from "./Ques.module.css";

function Ques() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>سوالات متداول</h1>

      <div className={styles.faq}>
        <details className={styles.item}>
          <summary>در راه آهن و هنگام سوار شدن به قطار چه مدارکی لازم است؟</summary>
          <p>
            برای سوار شدن به قطار نیاز به بلیط الکترونیکی یا چاپ شده و مدارک
            شناسایی مانند کارت ملی یا گذرنامه دارید.
          </p>
        </details>

        <details className={styles.item}>
          <summary>مقدار بار مجاز در قطار چقدر است؟</summary>
          <p>
            مقدار بار مجاز در قطار معمولاً ۳۰ کیلوگرم برای هر مسافر است. در صورت
            حمل بار بیشتر، ممکن است نیاز به پرداخت هزینه اضافی داشته باشید.
          </p>
        </details>

        <details className={styles.item}>
          <summary>نرخ بلیط برای نوزادان و کودکان زیر ۱۲ سال چگونه است؟</summary>
          <p>
            نرخ بلیط برای نوزادان زیر ۲ سال معمولاً رایگان یا با تخفیف است و
            برای کودکان بین ۲ تا ۱۲ سال نیز تخفیف اعمال می‌شود.
          </p>
        </details>

        <details className={styles.item}>
          <summary>روال استرداد یا کنسلی بلیط قطار چگونه است؟</summary>
          <p>
            برای کنسلی بلیط باید از طریق سایت یا دفتر فروش اقدام کنید. میزان
            جریمه به زمان باقی‌مانده تا حرکت قطار بستگی دارد.
          </p>
        </details>

        <details className={styles.item}>
          <summary>
            آیا پس از خرید بلیط قطار، امکان تغییر نام یا نام خانوادگی وجود دارد؟
          </summary>
          <p>
            بله، برای تغییر اطلاعات مسافر باید از طریق سامانه فروش بلیط یا
            پشتیبانی درخواست ثبت کنید.
          </p>
        </details>
      </div>
    </div>
  );
}

export default Ques;