"use client";
import { useState, useEffect, useRef } from "react";
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

  // ✅ ساخت ref برای تشخیص کلیک بیرون
  const startRef = useRef(null);
  const endRef = useRef(null);

  // fetch از بک‌اند
  useEffect(() => {
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

        const uniqueOrigins = Array.from(
          new Set(data.map((t) => t.origin.name))
        ).map((name) => translateLocations[name] || name);
        setOrigins(uniqueOrigins);

        const uniqueDestinations = Array.from(
          new Set(data.map((t) => t.destination.name))
        ).map((name) => translateLocations[name] || name);
        setDestinations(uniqueDestinations);
      })
      .catch((err) => console.error("Error fetching tours:", err));
  }, []);

  // ✅ بستن مودال با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(event) {
      if (startRef.current && !startRef.current.contains(event.target)) {
        setStartOpen(false);
      }
      if (endRef.current && !endRef.current.contains(event.target)) {
        setEndOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.date_info}>
      <h1>
        <span style={{ color: "#28A745" }}>تورینو </span>
        برگزار کننده بهترین تور های داخلی و خارجی
      </h1>

      <div className={styles.booktour}>
        {/* مبدا */}
        <div className={styles.dropdown} ref={startRef}>
          <button
            className={`${styles.startLoc} ${styles.locations}`}
            onClick={() => {
              setStartOpen(!startOpen);
              setEndOpen(false); // اگه یکی باز شد اون یکی بسته شه
            }}
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
              <li className={styles.frequentHeader}>پرتردد</li>

              {origins.map((loc, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setStartLoc(loc);
                    setStartOpen(false);
                  }}
                >
                  <Image
                    src="/SVG/location/location.svg"
                    alt="location"
                    width={18}
                    height={18}
                  />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* مقصد */}
        <div className={styles.dropdown} ref={endRef}>
          <button
            className={`${styles.endLoc} ${styles.locations}`}
            onClick={() => {
              setEndOpen(!endOpen);
              setStartOpen(false);
            }}
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
                  <Image
                    src="/SVG/location/global-search.svg"
                    alt="location"
                    width={18}
                    height={18}
                  />
                  <span>{loc}</span>
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