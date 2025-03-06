import React from "react";
import Image from "next/image";

import styles from "./style.module.scss";
export const dynamicParams = true;

const Redirect = () => {
  return (
    <section id="loading" className={styles.wrapper}>
      <div className={styles.loaderSection}>
        <Image src="/img/logo.png" alt={"loading"} width={100} height={50} className={styles.logo} />
        <p className={styles.text}>Loading...</p>
      </div>
    </section>
  );
};

export default Redirect;
