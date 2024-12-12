"use client";
import React from "react";

import NavBar from "../../_module/nav";
import HeroSection from "../../_module/hero";
import AboutUsSection from "../../_module/aboutus";
import OurServicesSection from "../../_module/services";
import TeamSection from "../../_module/teams";
import ContactUsSection from "../../_module/contactus";
import LoadingScreen from "../loading";

import styles from "./style.module.scss";
import "/public/icon-fonts/flat-icon/flaticon.css";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <LoadingScreen />
      <div className={styles.wrapper}>
        <HeroSection />
        <AboutUsSection />
        <OurServicesSection />
        <TeamSection />
        <ContactUsSection />
      </div>
    </>
  );
};

export default HomePage;
