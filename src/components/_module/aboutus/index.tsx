import React from "react";

import PageContainer from "../container";
import Button from "../../_basic/button";

import styles from "./style.module.scss";
import Image from "next/image";
import PageSectionHeading from "../../_basic/heading";

const features = [
  { title: "Who we are", text: "Young team of graduates wanting share our knowledge for business to prosper" },
  {
    title: "Our philosophy",
    text: "Customer is always right. We never try to make things our way - rather listen, give advice and deliver.",
  },
  {
    title: "How we work",
    text: "Entirely online - you are a few business calls away from us enhancing your online presence.",
  },
];

const AboutUsSection = () => {
  return (
    <section className={styles.wrapper}>
      <PageContainer className={styles.container}>
        <div className={styles.content}>
          <div className={styles.introWrapper}>
            <PageSectionHeading title="About us" slogan="who we are" />
            <div className={styles.text}>
              At Elumina Vision, our mission is to empower our clients by helping them build a strong and distinctive
              identity in the market. We specialize in providing comprehensive marketing solutions aimed at increasing
              brand visibility, attracting more customers, and ultimately driving profitability. Through strategic
              planning, creative execution, and a deep understanding of our clients&apos; needs, we collaborate closely
              to develop tailored strategies that set them apart from competitors and resonate with their target
              audience.&quot;
            </div>
            <Button className={styles.button}>SEE TEAM</Button>
          </div>
          <div className={styles.imageWrapper}>
            <Image src="/img/about.jpg" fill alt="about" className={styles.image} />
          </div>
        </div>
        <div className={styles.featureWrapper}>
          {features.map((feature) => (
            <div key={feature.title}>
              <h5 className={styles.heading}>{feature.title}</h5>
              <p className={styles.body}>{feature.text}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default AboutUsSection;
