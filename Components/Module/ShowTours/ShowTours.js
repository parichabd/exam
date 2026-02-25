"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import styles from "./ShowTours.module.css";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:6500";

export default function ShowTours({ tours, isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.tourInfo_Mbobile}>
        <div className={styles.headerTours}>
          <h1>همه تور ها</h1>
        </div>
        <div className={styles.skeletonWrapper}>
          <Skeleton height={200} count={3} style={{ marginBottom: 20 }} />
        </div>
      </div>
    );
  }

  if (!tours || tours.length === 0) {
    return (
      <div className={styles.tourInfo_Mbobile}>
        <div className={styles.headerTours}>
          <h1>همه تور ها</h1>
        </div>
        <p style={{ textAlign: "center", marginTop: 20 }}>
          هیچ توری موجود نیست
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tourInfo_Mbobile}>
      <div className={styles.headerTours}>
        <h1>همه تور ها</h1>
      </div>

      <div className={styles.eachTourInfo}>
        <ul className={styles.results}>
          {tours.map((tour, index) => {
            const startDate = new Date(tour.startDate);
            const endDate = new Date(tour.endDate);
            const monthName = startDate.toLocaleString("fa-IR", {
              month: "long",
            });
            const days =
              Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

            // ساخت آدرس تصویر به صورت امن
            let imageSrc = "/default-tour.jpg"; // fallback

            if (tour?.image) {
              // اگر با http/https شروع شده → همون رو استفاده کن
              if (tour.image.startsWith("http")) {
                imageSrc = tour.image;
              } else {
                // اضافه کردن BASE_URL + اطمینان از اسلش درست
                const path = tour.image.startsWith("/") ? tour.image : `/${tour.image}`;
                imageSrc = `${BACKEND_BASE_URL}${path}`;
              }
            }

            return (
              <li key={index} className={styles.tourCard}>
                <div className={styles.tourImage}>
                  <Image
                    src={imageSrc}
                    alt={tour.title || "تور"}
                    width={300}
                    height={180}
                    style={{ borderRadius: "8px" }}
                    // برای جلوگیری از خطای hydration در dev mode
                    unoptimized={process.env.NODE_ENV === "development"}
                  />
                </div>

                <div className={styles.tourDetails}>
                  <h2 className={styles.tourName}>{tour.title}</h2>
                  <p>
                    ماه: <strong>{monthName}</strong> | تعداد روز:{" "}
                    <strong>{days}</strong>
                  </p>
                  <p>
                    حرکت: <strong>{tour.fleetVehicle || "پرواز"}</strong> | هتل:{" "}
                    <strong>{tour.hotel || "---"}</strong>
                  </p>
                  <p>
                    قیمت: <strong>{tour.price?.toLocaleString() || "—"} تومان</strong>
                  </p>

                  <button className={styles.bookBtn}>رزرو</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}