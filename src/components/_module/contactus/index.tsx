"use client";
import React from "react";
import { motion } from "framer-motion";

import PageContainer from "../container";
import PageSectionHeading from "../../_basic/heading";
import TextInput from "../../_basic/input";
import TextArea from "../../_basic/textarea";
import Button from "../../_basic/button";

import styles from "./style.module.scss";

const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const ContactUsSection = () => {
  return (
    <section className={styles.wrapper}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <PageContainer>
          <PageSectionHeading title="Contact us." slogan="get in touch" />
          <div className={styles.content}>
            <div className={styles.infoWrapper}>
              <div className={styles.info}>
                <div className={styles.icon}></div>
                <div className={styles.contact}>Eluminavision@gmail.com</div>
                <div className={styles.type}>Email</div>
              </div>
              <div className={styles.info}>
                <div className={styles.icon}></div>
                <div className={styles.contact}>+44 7572 798567</div>
                <div className={styles.type}>Phone</div>
              </div>
            </div>
            <div className={styles.formWrapper}>
              <div className={styles.line}>
                <TextInput type="text" placeholder="Name" />
                <TextInput type="text" placeholder="Email" />
              </div>
              <TextArea className={styles.textarea} placeholder="How can we help you?" />
              <div className={styles.buttonWrapper}>
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </PageContainer>
      </motion.div>
    </section>
  );
};

export default ContactUsSection;
