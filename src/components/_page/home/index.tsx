import React from "react";

import NavBar from "../../_module/nav";
import HeroSection from "../../_module/hero";
import AboutUsSection from "../../_module/aboutus";
import OurServicesSection from "../../_module/services";
import TeamSection from "../../_module/teams";

import styles from "./style.module.scss";
import ContactUsSection from "../../_module/contactus";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <NavBar />
      <HeroSection />
      <AboutUsSection />
      <OurServicesSection />
      <TeamSection />
      <ContactUsSection />
    </div>
  );
};

export default HomePage;
