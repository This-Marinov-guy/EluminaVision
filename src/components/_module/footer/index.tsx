import React from "react";
import Image from "next/image";

import PageContainer from "../container";

import styles from "./style.module.scss";
import { EMAIL, FACEBOOK, INSTAGRAM } from "@/utils/defines";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <PageContainer className={styles.container}>
        <div className={styles.logoWrapper}>
          <Image src="/img/logo.png" alt="logo" width={400} height={200} className={styles.logo} />
          <span className={styles.copyright}>© {new Date().getFullYear()} Elumina Vision Solutions LTD</span>
        </div>
        <div className={styles.socials}>
          <a href={FACEBOOK} target="_blank" className={styles.social}>
            <i className="fab fa-facebook" aria-hidden="true" />
          </a>
          <a href={INSTAGRAM} target="_blank" className={styles.social}>
            <i className="fab fa-instagram" aria-hidden="true" />
          </a>
        </div>
        <div className={styles.getTouch}>
          <span className={styles.title}>Get In Touch</span>
          <span className={styles.email}>{EMAIL}</span>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
