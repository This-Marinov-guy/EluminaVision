"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useToast, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";

import styles from "./style.module.scss";
import CartButton from "@/components/_basic/button/CartButton";
import AuthButton from "@/components/_basic/button/AuthButton";
// import AuthButton from "@/components/_basic/button/AuthButton";

const linkMap = [
  { name: "Products", link: "products", external: true, className: "special" },
  { name: "About", link: "about" },
  { name: "Service", link: "service" },
  { name: "Team", link: "team" },
  { name: "Contact", link: "contact" },
];

const mobileLinkMap = [...linkMap.slice(1), linkMap[0]]; // Keeps original intact

const NavBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toast = useToast();
  const { cartStore, commonStore } = useStore();
  const { loadCart } = cartStore;
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

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (commonStore.error) {
      toast({
        title: commonStore.error,
        status: "error",
      });
    }
  }, [commonStore.error]);

  return (
    <nav className={styles.wrapper}>
      {/* Logo */}
      <a href="/" className={styles.logoWrapper} onClick={() => handleHomeRedirect()}>
        <Image src="/img/logo-1.png" alt="logo" width={1000} height={1000} className={styles.logo} />
      </a>

      {/* Desktop Navigation */}
      <div className={styles.navs}>
        {/* <AuthButton /> */}
        <CartButton />
        {linkMap.map((item) =>
          item.external ? (
            <a href={`/${item.link}`} key={item.name} className={classNames(styles.nav, styles[item.className])}>
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                whileHover={{ y: -20, opacity: 0.5, transition: { duration: 0.5 } }}
              >
                <div className="h-5">{item.name}</div>
              </motion.div>
            </a>
          ) : (
            <a
              href={`/#${item.link}`}
              key={item.name}
              className={classNames(styles.nav, styles[item.className])}
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                handleHomeRedirect(item.link); // Smooth scrolling
              }}
            >
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                whileHover={{
                  y: -5,
                  opacity: 0.7,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div className="h-5">{item.name}</div>
              </motion.div>
            </a>
          ),
        )}
      </div>

      {/* Mobile Navigation */}
      <div className={styles.mobileNav}>
        <div className="flex row items-center align-center justify-center gap-12">
          <div className="flex items-center align-center gap-4">
            {/* <AuthButton /> */}
            <CartButton />
          </div>
          <button className={styles.hamburger} onClick={() => setIsOpenMenu((prev) => !prev)}>
            <div className={classNames(styles.line1, { [styles.active]: isOpenMenu })}></div>
            <div className={classNames(styles.line2, { [styles.active]: isOpenMenu })}></div>
            <div className={classNames(styles.line3, { [styles.active]: isOpenMenu })}></div>
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        <div className={classNames(styles.mobilePanel, { [styles.active]: isOpenMenu })}>
          {mobileLinkMap.map((link) =>
            link.external ? (
              <a href={`/${link.link}`} key={link.name} className={classNames(styles.link, styles[link.className])}>
                {link.name}
              </a>
            ) : (
              <a
                href={`/#${link.link}`}
                key={link.name}
                className={classNames(styles.link, styles[link.className])}
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeRedirect(link.link);
                }}
              >
                {link.name}
              </a>
            ),
          )}
        </div>
      </div>
    </nav>
  );
};

export default observer(NavBar);
