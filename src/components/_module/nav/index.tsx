"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

import styles from "./style.module.scss";
import { Button } from "@chakra-ui/react";
import CartButton from "@/components/_basic/button/CartButton";
import { useRouter } from "next/navigation";

const linkMap = [
  { name: "Products", link: "products", external: true, className: "special" },
  { name: "About", link: "about" },
  { name: "Service", link: "service" },
  { name: "Team", link: "team" },
  { name: "Contact", link: "contact" },
];

const NavBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();

const handleHomeRedirect = async (section = "") => {
  if (section === "products") {
    await router.push(`/products`);
  } else if (section) {
    await router.push(`/#${section}`);
    setTimeout(() => {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    await router.push("/"); 
  }
};

  return (
    <nav className={styles.wrapper}>
      <ScrollLink to="hero" smooth={true} duration={500} className={styles.logoWrapper}>
        <Image
          onClick={() => handleHomeRedirect()}
          src="/img/logo.png"
          alt={"logo"}
          width={400}
          height={200}
          className={styles.logo}
        />
      </ScrollLink>
      <div className={styles.navs}>
        <CartButton />
        {linkMap.map((item) =>
          item.external ? (
            <Button
              key={item.name}
              onClick={() => handleHomeRedirect(item.link)}
              className={classNames(styles.nav) + " " + styles[item.className]}
            >
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                whileHover={{
                  y: -20,
                  opacity: 0.5,
                  transition: {
                    duration: 0.5,
                  },
                }}
              >
                <div className="h-5">{item.name}</div>
              </motion.div>
            </Button>
          ) : (
            <ScrollLink
              smooth={true}
              duration={500}
              key={item.name}
              to={item.link}
              activeClass="text-opacity-50"
              className={classNames(styles.nav) + " " + styles[item.className]}
              onClick={() => handleHomeRedirect(item.link)}
            >
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                whileHover={{
                  y: -5,
                  opacity: 0.7,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
              >
                <div className="h-5">{item.name}</div>
              </motion.div>
            </ScrollLink>
          ),
        )}
      </div>
      <div className={styles.mobileNav}>
        <div className="flex row items-center align-center justify-center gap-16">
          <CartButton />
          <button className={styles.hamburger} onClick={() => setIsOpenMenu((prev) => !prev)}>
            <div className={classNames(styles.line1, { [styles.active]: isOpenMenu })}></div>
            <div className={classNames(styles.line2, { [styles.active]: isOpenMenu })}></div>
            <div className={classNames(styles.line3, { [styles.active]: isOpenMenu })}></div>
          </button>
        </div>
        <div className={classNames(styles.mobilePanel, { [styles.active]: isOpenMenu })}>
          {linkMap.map((link) =>
            link.external ? (
              <Button
                key={link.name}
                onClick={() => handleHomeRedirect(link.link)}
                className={classNames(styles.link) + " " + styles[link.className]}
              >
                {link.name}
              </Button>
            ) : (
              <div key={link.name}>
                <ScrollLink
                  to={link.link}
                  smooth={true}
                  className={styles.link + " " + styles[link.className]}
                  onClick={() => handleHomeRedirect(link.link)}
                >
                  {link.name}
                </ScrollLink>
              </div>
            ),
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
