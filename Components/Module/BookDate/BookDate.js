"use client";

import { useState, useEffect, useRef } from "react";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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
  const [selectedDate, setSelectedDate] = useState(null);

  const [foundTours, setFoundTours] = useState([]);

  const startRef = useRef(null);
  const endRef = useRef(null);
  const dateRef = useRef(null);

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
          new Set(data.map((t) => t.origin.name)),
        ).map((name) => translateLocations[name] || name);
        setOrigins(uniqueOrigins);

        const uniqueDestinations = Array.from(
          new Set(data.map((t) => t.destination.name)),
        ).map((name) => translateLocations[name] || name);
        setDestinations(uniqueDestinations);
      })
      .catch((err) => console.error("Error fetching tours:", err));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (startRef.current && !startRef.current.contains(event.target)) {
        setStartOpen(false);
      }
      if (endRef.current && !endRef.current.contains(event.target)) {
        setEndOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setSelectedDate(selectedDate);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedDate]);

  const handleSearch = () => {
    if (!selectedDate || startLoc === "مبدا" || endLoc === "مقصد") {
      alert("لطفاً مبدا، مقصد و تاریخ را انتخاب کنید!");
      return;
    }

    // تبدیل تاریخ شمسی به میلادی و فرمت YYYY-MM-DD
    const formattedDate = selectedDate.toDate().toISOString().split("T")[0];

    // ترجمه معکوس فارسی -> انگلیسی برای مقایسه با داده بک‌اند
    const reverseTranslate = {
      تهران: "Tehran",
      اصفهان: "Isfahan",
      سنندج: "Sanandaj",
      مادرید: "Madrid",
      هولر: "Hewler",
      مازندران: "Mazandaran",
      ایتالیا: "Italy",
      "آفرود سنتر": "offRoad Center",
      سلیمانیه: "sulaymaniyahTour",
    };

    const originEng = reverseTranslate[startLoc] || startLoc;
    const destEng = reverseTranslate[endLoc] || endLoc;

    const results = tours.filter((t) => {
      const start = t.startDate.split("T")[0];
      const end = t.endDate.split("T")[0];

      return (
        t.origin.name === originEng &&
        t.destination.name === destEng &&
        formattedDate >= start &&
        formattedDate <= end
      );
    });

    setFoundTours(results);
  };

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
              setEndOpen(false);
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

      {/* تاریخ */}
      <div className={styles.dateBox} ref={dateRef}>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="تاریخ"
          calendarPosition="bottom-center"
          className={styles.myCustomPicker}
        />
        <Image
          src="/SVG/location/calendar.svg"
          alt="calendar"
          width={18}
          height={18}
          className={`${styles.dateIcon} ${
            selectedDate ? styles.iconSelected : ""
          }`}
        />
      </div>

      {/* دکمه جست‌وجو */}
      <button className={styles.searchButton} onClick={handleSearch}>
        جست‌وجو
      </button>

      {/* نمایش نتایج */}
      {foundTours.length > 0 && (
        <ul className={styles.results}>
          {foundTours.map((t, i) => (
            <li key={i}>
              {t.origin.name} → {t.destination.name} |{" "}
              {t.startDate.split("T")[0]} تا {t.endDate.split("T")[0]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookDate;
