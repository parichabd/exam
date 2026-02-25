"use client";

import { useState, useEffect, useRef } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Image from "next/image";
import styles from "./BookDate.module.css";

function BookDate({ setFoundTours, setIsLoading }) {
  const [tours, setTours] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startLoc, setStartLoc] = useState("مبدا");
  const [endLoc, setEndLoc] = useState("مقصد");
  const [selectedDate, setSelectedDate] = useState([null, null]); // [start, end]

  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);

  const startRef = useRef(null);
  const endRef = useRef(null);
  const dateRef = useRef(null);

  const showToastMessage = (msg) => {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Fetch تورها و مبدا/مقصد
  useEffect(() => {
    const translateLocations = {
      Tehran: "تهران",
      Isfahan: "اصفهان",
      Sananndaj: "سنندج",
      Madrid: "مادرید",
      Hewler: "هولیر",
      Mazandaran: "مازندران",
      Italy: "ایتالیا",
      Gilan: "گیلان",
      Sulaymaniyah: "سلیمانیه",
    };

    fetch("http://localhost:6500/tour")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);

        const uniqueOrigins = Array.from(
          new Set(data.map((t) => t.origin.name)),
        ).map((name) => translateLocations[name] || name);

        const uniqueDestinations = Array.from(
          new Set(data.map((t) => t.destination.name)),
        ).map((name) => translateLocations[name] || name);

        setOrigins(uniqueOrigins);
        setDestinations(uniqueDestinations);

        setFoundTours(data);
      })
      .catch(() => showToastMessage("مشکل در اتصال به سرور!"));
  }, []);

  // بستن dropdown هنگام کلیک بیرون
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const [startSelected, endSelected] = selectedDate;

    if (!startSelected || !endSelected) {
      showToastMessage("لطفاً تاریخ شروع و پایان را انتخاب کنید!");
      return;
    }
    if (startLoc === "مبدا" || endLoc === "مقصد") {
      showToastMessage("لطفاً مبدا و مقصد را انتخاب کنید!");
      return;
    }

    const reverseTranslate = {
      تهران: "Tehran",
      اصفهان: "Isfahan",
      سنندج: "Sananndaj",
      مادرید: "Madrid",
      هولیر: "Hewler",
      مازندران: "Mazandaran",
      ایتالیا: "Italy",
      گیلان: "Gilan",
      سلیمانیه: "Sulaymaniyah",
    };

    const originEng = reverseTranslate[startLoc];
    const destEng = reverseTranslate[endLoc];

    setIsLoading(true);

    setTimeout(() => {
      const results = tours.filter((t) => {
        // تاریخ تور UTC
        const tourStartUTC = new Date(t.startDate);
        const tourEndUTC = new Date(t.endDate);
        tourStartUTC.setUTCHours(0, 0, 0, 0);
        tourEndUTC.setUTCHours(0, 0, 0, 0);

        // تاریخ انتخاب شده از DatePicker به UTC
        const startCheckUTC = new Date(startSelected.toDate());
        const endCheckUTC = new Date(endSelected.toDate());
        startCheckUTC.setUTCHours(0, 0, 0, 0);
        endCheckUTC.setUTCHours(0, 0, 0, 0);

        const originMatch = t.origin.name === originEng;
        const destMatch = t.destination.name === destEng;
        const dateMatch =
          startCheckUTC >= tourStartUTC && endCheckUTC <= tourEndUTC;

        return originMatch && destMatch && dateMatch;
      });

      if (results.length === 0) {
        showToastMessage("تور موجودی ندارد یا ورودی‌ها نامعتبر است!");
      }

      setFoundTours(results);
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className={styles.date_info}>
      <h1>
        <span style={{ color: "#28A745" }}>تورینو </span>
        برگزار کننده بهترین تور های داخلی و خارجی
      </h1>

      <div className={styles.searchBar_desktop}>
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
          <div className={styles.divider} />

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
          <div className={styles.divider} />
        </div>

        {/* تاریخ */}
        <div className={styles.dateBox} ref={dateRef}>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={selectedDate}
            onChange={(dates) => setSelectedDate(dates)}
            placeholder="تاریخ"
            calendarPosition="bottom-center"
            className={styles.myCustomPicker}
            range
          />
          <Image
            src="/SVG/location/calendar.svg"
            alt="calendar"
            width={18}
            height={18}
            className={`${styles.dateIcon} ${
              selectedDate[0] ? styles.iconSelected : ""
            }`}
          />
        </div>

        <button className={styles.searchButton} onClick={handleSearch}>
          جست‌وجو
        </button>
      </div>

      <div className={`${styles.toast} ${showToast ? styles.show : ""}`}>
        {toast}
      </div>
    </div>
  );
}

export default BookDate;
