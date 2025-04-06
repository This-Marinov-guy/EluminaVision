"use client";
import React, { useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";

import PageContainer from "../container";
import PageSectionHeading from "../../_basic/heading";

import styles from "./style.module.scss";
import {TeamCard} from "@/components/_basic/cards/Team";

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
  const [hovered, setHovered] = useState<number | null>(null);

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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
              {members.map((member, index) => (
                <TeamCard key={index} card={member} index={index} hovered={hovered} setHovered={setHovered} />
              ))}
            </div>
          </div>
        </PageContainer>
      </motion.div>
    </section>
  );
};

export default TeamSection;
