import Image from "next/image";

import styles from "./HeaderDate.module.css";

function HeaderDate() {
  return (
    <div>
      <div className={styles.mainPic}>
        <Image
          src="/image/main/Untitled_design__1_.svg"
          alt="main"
          width={1440}
          height={350}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default HeaderDate;
