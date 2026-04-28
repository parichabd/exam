import React from "react";
import Image from "next/image";
import styles from "./WebInfo.module.css";
import Divider from "./Divider";

function WebInfo() {
  return (
    <div>
      <Divider/>
      <div className={styles.mainDiv}>
        <div className={styles.info}>
          <Image src="/SVG/static/1.svg" alt="pic" width={80} height={70}/>
          <div className={styles.eachParagraph}>
            <h2>بصرفه ترین قیمت</h2>
            <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
          </div>
        </div>

        <div className={styles.info}>
          <Image src="/SVG/static/2.svg" alt="pic" width={80} height={70}/>
          <div className={styles.eachParagraph}>
            <h2>پشتیبانی</h2>
            <p>پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.</p>
          </div>
        </div>

        <div className={styles.info}>
          <Image src="/SVG/static/3.svg" alt="pic" width={80} height={70}/>
          <div className={styles.eachParagraph}>
            <h2>رضایت کاربران</h2>
            <p>رضایت بیش از 10هزار کاربر از تور های ما.</p>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default WebInfo;
