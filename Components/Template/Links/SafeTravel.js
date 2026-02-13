import styles from "./SafeTravel.module.css";

function SafeTravel() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>بیمه مسافرتی چیست؟</h1>
        <p>
          حادثه خبر نمی‌کند! هر جا این جمله معروف را بشنویم یاد بیمه می‌افتیم.
          حقیقتا هم همینطور است. در واقع بیمه راهی است برای جبران خسارت‌های
          احتمالی. بیمه مسافرتی هم درست مثل همه بیمه‌های عمر و ماشین و آتش‌سوزی
          و... دقیقا با همین ماموریت تعریف می‌شود و در اختیار مسافران قرار
          می‌گیرد؛ بیمه‌ای که قرار است با جبران خسارات احتمالی در سفر برای
          مسافران، مایه آرامش باشد.تصور کنید در سفر و در شرایطی که کیلومترها دور
          از خانه هستید، خدای نکرده اتفاق خاصی برای شما بیفتد؛ مثلا نیاز فوری به
          دندان‌پزشکی پیدا کنید یا خدای نکرده بیماری خاصی در سفر برایتان اتفاق
          بیفتد که نیاز به ویزیت پزشک یا مراجعه به بیمارستان داشته باشید. بیمه
          مسافرتی طراحی شده تا خسارت‌های مسافر را در صورت بروز چنین اتفاقاتی تا
          حد زیادی جبران کند.
        </p>
      </div>

      <div className={styles.header}>
        <h1>خرید بیمه مسافرتی</h1>
        <p>
          خرید بیمه مسافرتی برای بسیاری از سفرها اجباری نیست و این حق انتخاب
          برای مسافر وجود دارد که در سفرهایش بیمه بگیرد یا خیر؛ اما نکته‌ای که
          مسافران سفرهای خارجی باید در نظر داشته باشند این است که گرفتن بیمه
          مسافرتی برای بسیاری از کشورهای خارجی (گرفتن ویزا، مخصوصا شینگن) ضروری
          است که حتما باید آن بیمه را از یک شرکت معتبر بیمه مسافرتی دریافت کرده
          باشید. برای خرید بیمه مسافرتی، لازم است که قبل از سفر به یک شرکت بیمه
          که خدمات بیمه مسافرتی ارائه می‌کند مراجعه کنید یا با تورینو ارتباط
          بگیرید. اگر همسفر تورینو باشید، خرید بیمه مسافرتی سامان از تورینو
          کار به‌صرفه‌تر و سریع‌تری است؛ چرا که بدون دردسر و با پشتیبانی 24
          ساعته تورینو در هفت روز هفته، می‌توانید به‌سرعت بیمه متناسب با
          شرایطتان را پیدا و خریداری کنید.
        </p>
      </div>

      <div className={styles.features}>
        <div className={styles.card}>
          <img src="/SVG/root-canal.png" alt="دندان‌پزشکی" />
          <p>دندان‌پزشکی</p>
        </div>
        <div className={styles.card}>
          <img src="/SVG/documentation.png" alt="فوریت‌ پزشکی" />
          <p>فوریت‌ پزشکی</p>
        </div>
        <div className={styles.card}>
          <img src="/SVG/security-official.png" alt="بیمه اموال" />
          <p>بیمه اموال</p>
        </div>
        <div className={styles.card}>
          <img src="/SVG/suitcase.png" alt="مفقودی چمدان" />
          <p>مفقودی چمدان</p>
        </div>
        <div className={styles.card}>
          <img src="/SVG/equality.png" alt="مشاور حقوقی" />
          <p>مشاور حقوقی</p>
        </div>
        <div className={styles.card}>
          <img src="/SVG/airplane.png" alt="اورژانس هوایی" />
          <p>اورژانس هوایی</p>
        </div>
        <div className={styles.card}>
          <img src="/SVG/chronometer.png" alt="وقفه سفر" />
          <p>وقفه سفر</p>
        </div>
        <div className={styles.card}>
          <img src="/SVG/tickets.png" alt="کنسلی سفر" />
          <p>کنسلی سفر</p>
        </div>
      </div>

      <div className={styles.buy}>
        <a
          href="https://www.si24.ir/insurance/travel?utm_source=travel&utm_medium=button&utm_campaign=website"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/image/main/images.png" alt="خرید بیمه مسافرتی" />
        </a>
      </div>
    </section>
  );
}

export default SafeTravel;
