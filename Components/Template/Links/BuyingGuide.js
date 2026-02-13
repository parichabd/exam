import styles from "./BuyingGuide.module.css";

function BuyingGuide() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>راهنمای خرید تور</h1>

      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.number}>{index + 1}</div>

            <div className={styles.content}>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>

            <div className={styles.image}>
              <img src={step.image} alt={step.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps = [
  {
    title: "قدم اول",
    text:
      "برای رزرو تور، ابتدا وارد سایت تورینو شده و از نوار جستجو شهر مبدا، مقصد، تاریخ و تعداد مسافران را انتخاب کنید.",
    image: "",
  },
  {
    title: "قدم دوم",
    text:
      "با استفاده از فیلترها و مقایسه قیمت‌ها، هتل مورد نظر خود را انتخاب کرده و جزئیات آن را بررسی کنید.",
    image: "",
  },
  {
    title: "قدم سوم",
    text:
      "وسایل نقلیه رفت و برگشت را بررسی کرده و مناسب‌ترین گزینه را انتخاب کنید.",
    image: "",
  },
  {
    title: "قدم چهارم",
    text:
      "خدمات جانبی تور را انتخاب کرده و وارد مرحله ثبت اطلاعات مسافران شوید.",
    image: "",
  },
  {
    title: "قدم پنجم",
    text:
      "در صورت نداشتن حساب کاربری، شماره موبایل خود را برای دریافت کد تایید وارد کنید.",
    image: "",
  },
  {
    title: "قدم ششم",
    text:
      "کد ارسال شده از طریق پیامک را وارد کنید.",
    image: "",
  },
  {
    title: "قدم هفتم",
    text:
      "اطلاعات مسافران را ثبت کنید. این اطلاعات برای دفعات بعد ذخیره می‌شود.",
    image: "",
  },
  {
    title: "قدم هشتم",
    text:
      "خلاصه سفارش را بررسی کرده و به مرحله پرداخت بروید.",
    image: "",
  },
  {
    title: "قدم نهم",
    text:
      "پس از پرداخت، تاییدیه موقت صادر می‌شود و نتیجه نهایی از طریق پیامک اطلاع داده خواهد شد.",
    image: "",
  },
];

export default BuyingGuide;