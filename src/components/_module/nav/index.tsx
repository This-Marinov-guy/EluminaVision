"use client";
import React from "react";
import Image from "next/image";
import classNames from "classnames";
import { Link as ScrollLink } from "react-scroll";

import styles from "./style.module.scss";

const linkMap = [
  { name: "About", link: "about" },
  { name: "Service", link: "service" },
  { name: "Team", link: "team" },
  { name: "Contact", link: "contact" },
];

const NavBar = () => {
  return (
    <nav className={styles.wrapper}>
      <ScrollLink to="hero" smooth={true} duration={500} className={styles.logoWrapper}>
        <Image src="/img/logo.png" alt={"logo"} width={400} height={200} className={styles.logo} />
      </ScrollLink>
      <div className={styles.navs}>
        {linkMap.map((item) => (
          <ScrollLink to={item.link} smooth={true} duration={500} key={item.name} href={item.link}>
            <div className={classNames(styles.nav, { [styles.active]: item.name === "About" })}>{item.name}</div>
          </ScrollLink>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
