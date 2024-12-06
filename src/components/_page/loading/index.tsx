import React from "react";

import styles from "./style.module.scss";
import Image from "next/image";

const LoadingScreen = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.loaderSection}>
        <Image src="/img/logo.png" alt={"loading"} width={100} height={50} className={styles.logo} />
        <p className={styles.text}>Loading...</p>
      </div>
    </section>
  );
};

export default LoadingScreen;
