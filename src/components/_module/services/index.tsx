import React from "react";

import PageSectionHeading from "../../_basic/heading";
import PageContainer from "../container";

import styles from "./style.module.scss";
import classNames from "classnames";

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

const OurServicesSection = () => {
  return (
    <section className={styles.wrapper}>
      <PageContainer>
        <PageSectionHeading title="Our services" slogan="what do we offer" />
        <div className={styles.services}>
          {services.map((service) => (
            <div key={service.heading} className={classNames(styles.service, service.color)}>
              <h4 className={styles.heading}>{service.heading}</h4>
              <p className={styles.description}>{service.description}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default OurServicesSection;
