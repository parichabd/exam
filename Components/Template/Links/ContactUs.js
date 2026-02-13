import { IoLocationOutline } from "react-icons/io5";
import styles from "./ContactUs.module.css";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
function ContactUs() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Image */}
        <div className={styles.imageBox}>
          <img src="/image/main/2477332.jpg" alt="Contact Tourino" />
        </div>

        {/* Info */}
        <div className={styles.info}>
          <h1>تماس با تورینو</h1>

          <div className={styles.item}>
            <h2>
              <IoLocationOutline /> آدرس
            </h2>
            <p>
              آرژانتین-ساعی، خیابان شهید عماد مغنیه (بهاران)، خیابان بیست و سوم،
              پلاک ۹، طبقه ۵، واحد ۱۳
            </p>
          </div>

          <div className={styles.item}>
            <h2>
              <MdOutlinePhoneEnabled /> تلفن پشتیبانی
            </h2>
            <p>۰۲۱-۲۳۴۳۴۴۱</p>
          </div>

          <div className={styles.item}>
            <h2>
              <TfiEmail /> ایمیل
            </h2>
            <p>info@tourino.ir</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
