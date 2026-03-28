import Image from "next/image";
import Styles from "./tourDetails.module.css";
import { toPersianNumber, formatNumber } from "../../../utils/number";
import Link from "next/link";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:6500";

export default async function TourPage({ params }) {
  // ⚡ unwrap کردن params
  const { slug: id } = await params; // ← این مهمه در Next.js 14+

  let tour = null;
  let error = null;

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/tour/${id}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      error = `خطا ${res.status} – ${res.statusText}`;
    } else {
      tour = await res.json();
    }
  } catch (err) {
    error = "خطا در ارتباط با سرور";
    console.error(err);
  }

  if (!tour) {
    return (
      <div dir="rtl" style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ color: "#e74c3c" }}>تور یافت نشد</h1>
        <p>ID دریافتی: {id}</p>
        {error && <p style={{ color: "#e74c3c" }}>خطا: {error}</p>}
      </div>
    );
  }

  let durationInDays = 0;
  if (tour.startDate && tour.endDate) {
    const startDate = new Date(tour.startDate);
    const endDate = new Date(tour.endDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    durationInDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // تقسیم بر میلی‌ثانیه در یک روز
  }

  // محاسبه تعداد شب‌ها (معمولاً یک شب کمتر از روزها)
  const durationInNights = durationInDays > 0 ? durationInDays - 1 : 0;

  return (
    <div className={Styles.mainPageInfo}>
      <div className={Styles.mainDetails}>
        <div className={Styles.picture}>
          <Image
            src={
              tour.image?.startsWith("http")
                ? tour.image
                : `${BACKEND_BASE_URL}${tour.image}`
            }
            alt={tour.title || "تصویر تور"}
            width={400}
            height={260}
            style={{ borderRadius: "12px", objectFit: "cover" }}
            priority
            unoptimized
          />
        </div>
        <div className={Styles.infoTour}>
          <h1>{tour.title || "بدون عنوان"}</h1>
          <div className={Styles.dayAndNight}>
            {durationInDays > 0 && (
              <p>
                {/* استفاده از تابع import شده */}
                {toPersianNumber(durationInDays)} روز و{" "}
                {toPersianNumber(durationInNights)} شب
              </p>
            )}
          </div>
          <div className={Styles.details}>
            <div className={Styles.details_icons}>
              <Image />
              <p>تورلیدر از مبدا</p>
            </div>
            <div className={Styles.details_icons}>
              <Image />
              <p>برنامه سفر</p>
            </div>
            <div className={Styles.details_icons}>
              <Image />
              <p>تضمین کیفیت</p>
            </div>
          </div>
          <div className={Styles.priceAndbook}>
            <div className={Styles.price}>
              <p>
                {" "}
                <span>{Number(tour.price).toLocaleString("fa-IR")}</span> تومان
              </p>
            </div>
            <div className={Styles.bookBtn}>
              <Link href="/">
                <button className={Styles.bookBtn}>رزرو و خرید</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.tourMainDetails}>
        <div className={Styles.tourInfoDetails}>
          <div>
            <Image />
            <p>مبدا</p>
          </div>
          <div>
            <p>{tour.origin?.name || "—"}</p>
          </div>
        </div>
        <div className={Styles.divider}></div>
        <div className={Styles.tourInfoDetails}>
          <div>
            <Image />
            <p>تاریخ رفت </p>
          </div>
          <div>
            <p>{new Date(tour.startDate).toLocaleDateString("fa-IR")}</p>
          </div>
        </div>
        <div className={Styles.divider}></div>
        <div className={Styles.tourInfoDetails}>
          <div>
            <Image />
            <p>تاریخ برگشت</p>
          </div>
          <div>
            <p>{new Date(tour.startDate).toLocaleDateString("fa-IR")}</p>
          </div>
        </div>
        <div className={Styles.divider}></div>

        <div className={Styles.tourInfoDetails}>
          <div>
            <Image />
            <p>حمل و نقل</p>
          </div>
          <div>
            <p>{tour.fleetVehicle}</p>
          </div>
        </div>
        <div className={Styles.divider}></div>

        <div className={Styles.tourInfoDetails}>
          <div>
            <Image />
            <p>ظرفیت</p>
          </div>
          <div>
            <p>حداکثر {tour.availableSeats} نفر</p>
          </div>
        </div>
        <div className={Styles.divider}></div>

        <div className={Styles.tourInfoDetails}>
          <div>
            <Image />
            <p>بیمه</p>
          </div>
          <div>
            <p> {tour.insurance ? "دارد" : "ندارد"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
