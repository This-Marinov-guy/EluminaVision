import React from "react";

import Button from "../../_basic/button";

import styles from "./style.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.heroContentWrapper}>
        <div className={styles.heroContent}>
          <span className={styles.title}>Welcome to</span>
          <h1 className={styles.heading}>Elumina Vision</h1>
          <Button className={styles.button}>SEE MORE</Button>
        </div>
      </div>
      <div className={styles.carouselWrapper}></div>
    </section>
  );
};

export default HeroSection;
