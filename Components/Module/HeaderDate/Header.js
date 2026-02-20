import Image from "next/image";
import styles from "./HeaderDate.module.css";

function Header() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/image/main/Untitled_design__1_.svg"
        alt="main"
        fill
        priority
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export default Header;
