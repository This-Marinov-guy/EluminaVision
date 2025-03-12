"use client";
import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";

import PageContainer from "../container";
import PageSectionHeading from "../../_basic/heading";

import styles from "./style.module.scss";

const members = [
  {
    avatar: "/img/team/team-1.jpeg",
    name: "Vladislav Marinov",
    role: "Web Developer",
    description: "BSc Business Management & Economics | Bayes Business School London",
  },
  {
    avatar: "/img/team/team-2.jpeg",
    name: "Georgi Tashev",
    role: "External Relations & Marketing",
    description: "BEng in Electronics and Electrical Engineering | Brunel University London",
  },
  {
    avatar: "/img/team/team-3.jpeg",
    name: "Ivan Babev",
    role: "Digital Animator",
    description: "BA in Animation & Interactive Technology | Northumbria University Newcastle",
  },
];

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 3,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const TeamSection = () => {
  return (
    <section id="team" className={styles.wrapper}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <PageContainer>
          <PageSectionHeading title="Team." slogan="who are the people behind the project" />
          <Carousel
            infinite
            autoPlay
            autoPlaySpeed={5000}
            arrows={false}
            responsive={responsive}
            className={styles.section}
          >
            {members.map((member) => (
              <div key={member.name} className={styles.member}>
                <div className={styles.avatar}>
                  <Image
                    src={member.avatar}
                    alt={`${member.name} avatar`}
                    width={100}
                    height={100}
                    className={`${styles.image}`}
                  />
                </div>
                <div className={styles.info}>
                  <h4 className={styles.name}>{member.name}</h4>
                  <p className={styles.role}>{member.role}</p>
                  <p className={styles.description}>{member.description}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </PageContainer>
      </motion.div>
    </section>
  );
};

export default TeamSection;
