import styles from "./BookDate.module.css";
import Image from "next/image";

function BookDate() {
  
  return (
    <>
      <div className={styles.date_info}>
        <h1>
          <span style={{ color: "#28A745" }}>تورینو </span>
          برگزار کننده بهترین تور های داخلی و خارجی
        </h1>

        <div className={styles.booktour}>
          <button className={`${styles.startLoc} ${styles.locations}`}>
            <Image
              src="/SVG/location/location.svg"
              alt="location"
              width={18}
              height={18}
            />
            <p>مبدا</p>
          </button>
          <button className={`${styles.endLoc} ${styles.locations}`}>
            <Image
              src="/SVG/location/global-search.svg"
              alt="location"
              width={18}
              height={18}
            />
            <p>مقصد</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default BookDate;
