"use client";
import React from "react";

import NavBar from "../../_module/nav";
import HeroSection from "../../_module/hero";
import AboutUsSection from "../../_module/aboutus";
import OurServicesSection from "../../_module/services";
import TeamSection from "../../_module/teams";
import ContactUsSection from "../../_module/contactus";
import LoadingScreen from "../loading";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <LoadingScreen />
      <HeroSection />
      <AboutUsSection />
      <OurServicesSection />
      <TeamSection />
      <ContactUsSection />
    </>
  );
};

export default HomePage;
