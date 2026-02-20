"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./BookDate.module.css";

function BookDate() {
  const [tours, setTours] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startLoc, setStartLoc] = useState("مبدا");
  const [endLoc, setEndLoc] = useState("مقصد");

  // fetch از بک‌اند
  useEffect(() => {
    // Map برای فارسی کردن نام شهرها
    const translateLocations = {
      Tehran: "تهران",
      Isfahan: "اصفهان",
      Sanandaj: "سنندج",
      Madrid: "مادرید",
      Hewler: "هولر",
      Mazandaran: "مازندران",
      Italy: "ایتالیا",
      "offRoad Center": "آفرود سنتر",
      sulaymaniyahTour: "سلیمانیه",
    };
    fetch("http://localhost:6500/tour")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);

        // لیست یکتا از مبداها و تبدیل به فارسی
        const uniqueOrigins = Array.from(
          new Set(data.map((t) => t.origin.name)),
        ).map((name) => translateLocations[name] || name);
        setOrigins(uniqueOrigins);

        // لیست یکتا از مقصدها و تبدیل به فارسی
        const uniqueDestinations = Array.from(
          new Set(data.map((t) => t.destination.name)),
        ).map((name) => translateLocations[name] || name);
        setDestinations(uniqueDestinations);
      })
      .catch((err) => console.error("Error fetching tours:", err));
  }, []);

  return (
    <div className={styles.date_info}>
      <h1>
        <span style={{ color: "#28A745" }}>تورینو </span>
        برگزار کننده بهترین تور های داخلی و خارجی
      </h1>

      <div className={styles.booktour}>
        {/* مبدا */}
        <div className={styles.dropdown}>
          <button
            className={`${styles.startLoc} ${styles.locations}`}
            onClick={() => setStartOpen(!startOpen)}
          >
            <Image
              src="/SVG/location/location.svg"
              alt="location"
              width={18}
              height={18}
            />
            <p>{startLoc}</p>
          </button>
          {startOpen && (
            <ul className={styles.dropdownMenu}>
              {/* هدر پر پرتردد */}
              <li className={styles.frequentHeader}>پر پرتردد</li>

              {/* لیست مبداها */}
              {origins.map((loc, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setStartLoc(loc);
                    setStartOpen(false);
                  }}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* مقصد */}
        <div className={styles.dropdown}>
          <button
            className={`${styles.endLoc} ${styles.locations}`}
            onClick={() => setEndOpen(!endOpen)}
          >
            <Image
              src="/SVG/location/global-search.svg"
              alt="location"
              width={18}
              height={18}
            />
            <p>{endLoc}</p>
          </button>
          {endOpen && (
            <ul className={styles.dropdownMenu}>
              {destinations.map((loc, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setEndLoc(loc);
                    setEndOpen(false);
                  }}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDate;
