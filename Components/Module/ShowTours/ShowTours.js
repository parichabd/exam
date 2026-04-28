"use client";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { TbMapSearch } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ShowTours.module.css";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // ← این خط اصلاح شد
const SKELETON_COUNT = 3;
const INITIAL_VISIBLE_COUNT = 4;
const LARGE_SCREEN_COUNT = 6;
const LARGE_SCREEN_BREAKPOINT = 1024;
const LOADING_DELAY = 2000;

export default function ShowTours({ tours, isLoading, hasError }) {
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    function updateVisibleCount() {
      const width = window.innerWidth;
      setVisibleCount(
        width >= LARGE_SCREEN_BREAKPOINT 
          ? LARGE_SCREEN_COUNT 
          : INITIAL_VISIBLE_COUNT
      );
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, LOADING_DELAY);
    return () => clearTimeout(timer);
  }, []);

  if (showSkeleton) {
    return (
      <div className={styles.tourInfo_Mbobile}>
        <div className={styles.headerTours}>
          <h1>همه تور ها</h1>
        </div>
        <div className={styles.skeletonGrid}>
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <Skeleton height={180} style={{ display: "block" }} />
              <div className={styles.skeletonContent}>
                <Skeleton width="60%" height={20} />
                <Skeleton width="40%" height={16} />
                <div className={styles.skeletonRow}>
                  <Skeleton width="30%" height={14} />
                  <Skeleton width="25%" height={14} />
                </div>
                <Skeleton width="50%" height={24} />
              </div>
            </div>
          ))}
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
        <p className={styles.emptyMessage}>
          {hasError ? "مشکل در اتصال به سرور" : "هیچ توری موجود نیست"}
        </p>
      </div>
    );
  }

  const visibleTours = showAll ? tours : tours.slice(0, visibleCount);

  return (
    <div className={styles.tourInfo_Mbobile}>
      <div className={styles.headerTours}>
        <h1>همه تور ها</h1>
      </div>
      <ul className={styles.results}>
        {visibleTours.map((tour) => {
          const startDate = new Date(tour.startDate);
          const endDate = new Date(tour.endDate);
          const monthName = startDate.toLocaleString("fa-IR", {
            month: "long",
          });
          const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

          const vehicleMap = {
            bus: "اتوبوس",
            train: "قطار",
            flight: "پرواز",
            airplane: "پرواز",
            suv: "SUV",
          };
          const vehicleFa = vehicleMap[tour.fleetVehicle?.toLowerCase()] || "پرواز";
          const priceFa = tour.price ? tour.price.toLocaleString("fa-IR") : "—";

          // ✅ ساخت URL عکس - اصلاح شده
          let imageSrc = "/default-tour.jpg";
          if (tour?.image) {
            if (tour.image.startsWith("http")) {
              imageSrc = tour.image;
            } else {
              const baseUrl = BACKEND_BASE_URL?.replace(/\/$/, "") || "";
              const imagePath = tour.image.startsWith("/") ? tour.image : `/${tour.image}`;
              imageSrc = `${baseUrl}${imagePath}`;
            }
          }

          return (
            <li key={tour.id} className={styles.tourCard}>
              <Link href={`/tours/${tour.id}`} className={styles.imageWrapper}>
                <Image
                  src={imageSrc}
                  alt={tour.title || "تور"}
                  width={400}
                  height={220}
                  unoptimized={process.env.NODE_ENV === "development"}
                />
                <div className={styles.overlay}>
                  <span className={styles.zoomIcon}>
                    <TbMapSearch />
                  </span>
                  <span className={styles.overlayText}>جزئیات تور</span>
                </div>
              </Link>
              <h2 className={styles.tourTitle}>{tour.title}</h2>
              <p className={styles.tourMeta}>
                <span className={styles.metaItem}>{monthName} ماه</span>
                <span className={styles.metaSeparator}>·</span>
                <span className={styles.metaItem}>{days} روزه</span>
                <span className={styles.metaSeparator}>·</span>
                <span className={styles.metaItem}>{vehicleFa}</span>
              </p>
              <div className={styles.divider}></div>
              <div className={styles.bottomRow}>
                <Link href={`/bookTour/${tour.id}`}>
                  <button className={styles.bookBtn}>رزرو</button>
                </Link>
                <p className={styles.price}>
                  <span>{priceFa}</span> تومان
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      {tours.length > visibleCount && !showAll && (
        <div className={styles.showMoreWrapper}>
          <button
            className={styles.showMoreBtn}
            onClick={() => setShowAll(true)}
          >
            جزئیات بیشتر <IoIosArrowDown />
          </button>
        </div>
      )}
    </div>
  );
}