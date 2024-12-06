import React from "react";
import Image from "next/image";

import PageContainer from "../container";

import styles from "./style.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <PageContainer className={styles.container}>
        <div className={styles.logoWrapper}>
          <Image src="/img/logo-1.png" alt={"logo"} width={100} height={100} className={styles.logo} />
          <span className={styles.copyright}>© 2024 Elumina Vision Solutions</span>
        </div>
        <div className={styles.socials}>
          <Link href="/" className={styles.social}>
            F
          </Link>
          <Link href="/" className={styles.social}>
            L
          </Link>
        </div>
        <div className={styles.getTouch}>
          <span className={styles.title}>Get In Touch</span>
          <span className={styles.email}>Eluminavision@gmail.com</span>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
