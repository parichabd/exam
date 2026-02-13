import styles from "./TourismSer.module.css";

export default function TourismSer() {
  return (
    <section className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1>خدمات گردشگری و راهنمایان محلی</h1>
        <p>
          در این بخش با راهنمایان، مترجمان و کارشناسان گردشگری همکاری‌کننده با
          ما آشنا می‌شوید.
        </p>
      </header>

      {/* Services */}
      <div className={styles.grid}>
        <div className={styles.service}>
          <img src="/SVG/Tour/man.png" alt="" />
          <ServiceCard
            title="تور لیدر رسمی"
            desc="راهنمایان رسمی و باتجربه برای سفرهای شهری، تاریخی و طبیعت‌گردی."
            extra="نمونه: آقای قلانی – راهنمای تور شهری و فرهنگی"
          />
        </div>

        <div className={styles.service}>
          <img src="/SVG/Tour/translate.png" alt="" />
          <ServiceCard
            title="مترجمان گردشگری"
            desc="مترجمان مسلط به زبان‌های خارجی برای مسافران بین‌المللی."
            extra="زبان‌ها: انگلیسی، آلمانی، عربی، ترکی"
          />
        </div>

        <div className={styles.service}>
          <img src="/SVG/Tour/tour-guide.png" alt="" />
          <ServiceCard
            title="راهنمای فرهنگی و تاریخی"
            desc="توضیحات تخصصی درباره تاریخ، معماری و فرهنگ مناطق."
            extra="مناسب موزه‌ها و اماکن تاریخی"
          />
        </div>

        <div className={styles.service}>
          <img src="/SVG/Tour/google-maps.png" alt="" />
          <ServiceCard
            title="کارشناس محلی مقصد"
            desc="افراد بومی با اطلاعات دقیق و کاربردی از مقصد."
            extra="آشنایی با آداب، غذاها و مسیرهای محلی"
          />
        </div>

        <div className={styles.service}>
          <img src="/SVG/Tour/handshake.png" alt="" />
          <ServiceCard
            title="همراه گردشگران خارجی"
            desc="همراهی کامل گردشگران خارجی در طول سفر."
            extra="مناسب سفرهای کاری و توریستی"
          />
        </div>

        <div className={styles.service}>
          <img src="/SVG/Tour/planner.png" alt="" />
          <ServiceCard
            title="مشاوره برنامه‌ریزی سفر"
            desc="مشاوره تخصصی برای انتخاب مسیر و زمان‌بندی سفر."
            extra="بدون فروش یا رزرو مستقیم"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, extra }) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <h3>{title}</h3>
      <p className={styles.desc}>{desc}</p>
      <p className={styles.extra}>{extra}</p>
    </div>
  );
}
