import React from "react";

import Button from "../../_basic/button";

import styles from "./style.module.scss";

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.heroContentWrapper}>
        <div className={styles.heroContent}>
          <span className={styles.title}>Welcome to</span>
          <h1 className={styles.heading}>Elumina Vision</h1>
          <Button className={styles.button}>SEE MORE</Button>
        </div>
        <Slider {...settings}></Slider>
      </div>
      <div className={styles.carouselWrapper}></div>
    </section>
  );
};

export default HeroSection;
