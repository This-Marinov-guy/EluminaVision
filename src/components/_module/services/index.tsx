"use client";
import React from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

import PageSectionHeading from "../../_basic/heading";
import PageContainer from "../container";

import styles from "./style.module.scss";
import Image from "next/image";

const services = [
  {
    icon: "",
    heading: "Branding",
    description:
      "Your brand is your identity. A logo and some colors that represent your goals are a must in order a customer to embed your product in their mind.",
    color: "bg-red",
  },
  {
    icon: "",
    heading: "Web Development",
    description:
      "Get yourself available on the web with a graceful informative website that corresponds to your style. Option for scaling into web app is available (examples: orders, payments, etc.).",
    color: "bg-yellow",
  },
  {
    icon: "",
    heading: "Social Media",
    description:
      "Influence people by your social platforms. Our young team best knows what is trendy and how to attract customers to your product/service.",
    color: "bg-red",
  },
  {
    icon: "",
    heading: "Advertising",
    description:
      "Drag some attention on all platforms with our catchy ads. A guaranteed way of increasing targeted customers and let people know about you.",
    color: "bg-yellow",
  },
  {
    icon: "",
    heading: "Content Creation",
    description:
      "For advertising, for presentations, for everything. We make messages clear with our short movies with appealing editing and strong mix of music and video.",
    color: "bg-red",
  },
  {
    icon: "",
    heading: "Analysis",
    description:
      "If you do not know what is suitable for you, we can advice you. By exploring your business, we can easily examine your target audience and what is the most optimal and fastest way of attracting them to you.",
    color: "bg-yellow",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const OurServicesSection = () => {
  return (
    <section id="service" className={styles.wrapper}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <PageContainer>
          <PageSectionHeading title="Our services" slogan="what do we offer" />
          <div className={styles.services}>
            {services.map((service) => (
              <motion.div
                key={service.heading}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.35, ease: "easeIn" }}
              >
                <div className={classNames(styles.service, service.color)}>
                  <div className={styles.avatar}>
                    <Image src={"/img/logo.png"} width={100} height={100} alt="icon" className={styles.icon} />
                  </div>
                  <h4 className={styles.heading}>{service.heading}</h4>
                  <p className={styles.description}>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </PageContainer>
      </motion.div>
    </section>
  );
};

export default OurServicesSection;
