import styles from "./TourismSer.module.css";
import Image from "next/image";

const services = [
  {
    src: "/SVG/Tour/man.png",
    title: "تور لیدر رسمی",
    desc: "راهنمایان رسمی و باتجربه برای سفرهای شهری، تاریخی و طبیعت‌گردی.",
    extra: "نمونه: آقای قلانی – راهنمای تور شهری و فرهنگی",
  },
  {
    src: "/SVG/Tour/translate.png",
    title: "مترجمان گردشگری",
    desc: "مترجمان مسلط به زبان‌های خارجی برای مسافران بین‌المللی.",
    extra: "زبان‌ها: انگلیسی، آلمانی، عربی، ترکی",
  },
  {
    src: "/SVG/Tour/tour-guide.png",
    title: "راهنمای فرهنگی و تاریخی",
    desc: "توضیحات تخصصی درباره تاریخ، معماری و فرهنگ مناطق.",
    extra: "مناسب موزه‌ها و اماکن تاریخی",
  },
  {
    src: "/SVG/Tour/google-maps.png",
    title: "کارشناس محلی مقصد",
    desc: "افراد بومی با اطلاعات دقیق و کاربردی از مقصد.",
    extra: "آشنایی با آداب، غذاها و مسیرهای محلی",
  },
  {
    src: "/SVG/Tour/handshake.png",
    title: "همراه گردشگران خارجی",
    desc: "همراهی کامل گردشگران خارجی در طول سفر.",
    extra: "مناسب سفرهای کاری و توریستی",
  },
  {
    src: "/SVG/Tour/planner.png",
    title: "مشاوره برنامه‌ریزی سفر",
    desc: "مشاوره تخصصی برای انتخاب مسیر و زمان‌بندی سفر.",
    extra: "بدون فروش یا رزرو مستقیم",
  },
];

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
        {services.map((service, index) => (
          <div className={styles.service} key={index}>
            <Image
              src={service.src}
              alt={service.title}
              width={64} // اندازه تقریبی یا اندازه واقعی
              height={64} // اندازه تقریبی یا اندازه واقعی
            />
            <ServiceCard
              title={service.title}
              desc={service.desc}
              extra={service.extra}
            />
          </div>
        ))}
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
