"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import classNames from "classnames";
import { motion } from "framer-motion";

import Button from "../../_basic/button";

import styles from "./style.module.scss";
import { FACEBOOK, INSTAGRAM } from "@/utils/defines";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
};

const carousel = [
  { image: "/img/slider/slider-1.jpg", alt: "welcome to", heading: "Elumina Vision" },
  { image: "/img/slider/slider-2.jpg", alt: "a weapon in the", heading: "Digital Age" },
  { image: "/img/slider/slider-3.jpg", alt: "your entrance to the", heading: "Web." },
  { image: "/img/slider/slider-4.jpg", alt: "your influence in the", heading: "Social Space" },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exist: {
    opacity: 0,
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const HeroSection = () => {
  return (
    <section id="hero" className={styles.wrapper}>
      <div className={styles.carouselWrapper}>
        <Carousel
          showDots
          autoPlay
          autoPlaySpeed={5000}
          rewind
          infinite
          pauseOnHover={false}
          draggable
          arrows={false}
          responsive={responsive}
          customDot={<CustomDot />}
        >
          {carousel.map((item) => (
            <CarouselItem key={item.alt} {...item} />
          ))}
        </Carousel>
      </div>
      <div className="text-3xl flex items-center justify-center gap-3 absolute bottom-2 right-5">
        <a href={FACEBOOK} target="_blank" className={styles.social}>
          <i className="fab fa-facebook" aria-hidden="true" />
        </a>
        <a href={INSTAGRAM} target="_blank" className={styles.social}>
          <i className="fab fa-instagram" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

const CarouselItem = ({ alt, heading, image }: { alt: string; heading: string; image: string }) => {
  return (
    <div className={styles.item}>
      <div className={styles.heroContentWrapper}>
        <motion.ul variants={container} initial="hidden" whileInView="visible" exit="exist">
          <div className={styles.heroContent}>
            <motion.li variants={itemVariants}>
              <span className={styles.title}>{alt}</span>
            </motion.li>
            <motion.li variants={itemVariants}>
              <h1 className={styles.heading}>{heading}</h1>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Button className={styles.button}>SEE MORE</Button>
            </motion.li>
          </div>
        </motion.ul>
      </div>
      <Image src={image} alt="slider" fill className={styles.image} />
    </div>
  );
};

const CustomDot = ({ ...rest }) => <div className={classNames(styles.dot, { [styles.active]: rest.active })}></div>;

export default HeroSection;
