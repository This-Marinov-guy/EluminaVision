"use client";
import React from "react";
import Image from "next/image";
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
    role: "External Relations",
    description: "BEng in Electronics and Electrical Engineering | Brunel University London",
  },
  {
    avatar: "/img/team/team-3.jpeg",
    name: "Vladimir Tsagov",
    role: "Content Creator",
    description: "Master Degree in Finance and Investment | Brunel University London",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const TeamSection = () => {
  return (
    <section className={styles.wrapper}>
      <motion.div initial="hidden" whileInView="visible" transition={{ duration: 0.5 }} variants={containerVariants}>
        <PageContainer>
          <PageSectionHeading title="Team." slogan="who are the people behind the project" />
          <div className={styles.section}>
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
          </div>
        </PageContainer>
      </motion.div>
    </section>
  );
};

export default TeamSection;
