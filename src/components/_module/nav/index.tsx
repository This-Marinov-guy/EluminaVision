"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

import styles from "./style.module.scss";

const linkMap = [
  { name: "About", link: "about" },
  { name: "Service", link: "service" },
  { name: "Team", link: "team" },
  { name: "Contact", link: "contact" },
];

const NavBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <nav className={styles.wrapper}>
      <ScrollLink to="hero" smooth={true} duration={500} className={styles.logoWrapper}>
        <Image src="/img/logo.png" alt={"logo"} width={400} height={200} className={styles.logo} />
      </ScrollLink>
      <div className={styles.navs}>
        {linkMap.map((item) => (
          <ScrollLink
            to={item.link}
            smooth={true}
            duration={500}
            key={item.name}
            href={item.link}
            activeClass="text-opacity-50"
            className={classNames(styles.nav)}
          >
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              whileHover={{
                y: [-20, 0],
                opacity: [0, 1],
                transition: {
                  duration: 0.5,
                },
              }}
            >
              <div className="h-10">{item.name}</div>
            </motion.div>
          </ScrollLink>
        ))}
      </div>
      <div className={styles.mobileNav}>
        <button className={styles.hamburger} onClick={() => setIsOpenMenu((prev) => !prev)}>
          <div className={classNames(styles.line1, { [styles.active]: isOpenMenu })}></div>
          <div className={classNames(styles.line2, { [styles.active]: isOpenMenu })}></div>
          <div className={classNames(styles.line3, { [styles.active]: isOpenMenu })}></div>
        </button>
        <div className={classNames(styles.mobilePanel, { [styles.active]: isOpenMenu })}>
          {linkMap.map((link) => (
            <div key={link.name}>
              <ScrollLink to={link.link} smooth={true} className={styles.link} onClick={() => setIsOpenMenu(false)}>
                {link.name}
              </ScrollLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
