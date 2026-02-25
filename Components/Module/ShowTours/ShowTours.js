"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ShowTours.module.css";

export default function ShowTours({ tours, isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.skeletonWrapper}>
        <Skeleton height={50} count={3} style={{ marginBottom: 10 }} />
      </div>
    );
  }

  if (!tours || tours.length === 0) return null;

  return (
    <ul className={styles.results}>
      {tours.map((t, i) => (
        <li key={i}>
          {t.origin.name} → {t.destination.name} |{" "}
          {t.startDate.split("T")[0]} تا {t.endDate.split("T")[0]}
        </li>
      ))}
    </ul>
  );
}