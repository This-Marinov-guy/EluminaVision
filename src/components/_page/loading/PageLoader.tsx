"use client";

import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";

const PageLoader = () => {
  return (
    <section style={{ backgroundColor: "black" }} id="loading" className={styles.wrapper}>
      <div className={styles.loaderSection}>
        <Image src="/img/logo.png" alt={"loading"} width={100} height={50} className={styles.logo} />
        <p className={styles.textWhite}>Loading</p>
      </div>
    </section>
);
};

export default PageLoader;
