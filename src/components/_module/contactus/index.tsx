"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

import PageContainer from "../container";
import PageSectionHeading from "../../_basic/heading";
import TextInput from "../../_basic/input";
import TextArea from "../../_basic/textarea";
import Button from "../../_basic/button";

import styles from "./style.module.scss";
import { EMAIL, PHONE } from "@/utils/defines";

const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const ContactUsSection = () => {
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE ?? "",
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE ?? "",
        e.target,
        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY ?? "",
      )
      .then(
        () => {
          setMessage("Your message was received - we will come back to you shortly!");
          setMessageClass("text-green-500");
        },
        () => {
          setMessage("There was a problem with your message - please try again!");
          setMessageClass("text-red-500");
        },
      )
      .catch(() => {
        setMessage("There was a problem with your message - please try again!");
        setMessageClass("text-red-500");
      })
      .finally(() => setLoading(false));
  };

  return (
    <section id="contact" className={styles.wrapper}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <PageContainer>
          <PageSectionHeading title="Contact us." slogan="get in touch" />
          <form onSubmit={handleSubmit} className={styles.content}>
            <div className={styles.infoWrapper}>
              <div className={styles.info}>
                <div className={styles.icon}></div>
                <div className={styles.contact}>{EMAIL}</div>
                <div className={styles.type}>Email</div>
              </div>
              <div className={styles.info}>
                <div className={styles.icon}></div>
                <div className={styles.contact}>{PHONE}</div>
                <div className={styles.type}>Phone</div>
              </div>
            </div>
            <div className={styles.formWrapper}>
              <div className={styles.line}>
                <TextInput type="text" name="name" placeholder="Name" />
                <TextInput type="text" name="email" placeholder="Email" />
              </div>
              <TextArea className={styles.textarea} name="message" placeholder="How can we help you?" rows={5} />
              <div className={styles.buttonWrapper}>
                <Button disabled={loading} type="submit">
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </div>
              <h3 className={`mt-3 ${messageClass}`}>{message}</h3>
            </div>
          </form>
        </PageContainer>
      </motion.div>
    </section>
  );
};

export default ContactUsSection;
