import React from "react";

import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

const linkMap = [
  { name: "About", link: "#" },
  { name: "Service", link: "#" },
  { name: "Team", link: "#" },
  { name: "Contact", link: "#" },
];

const NavBar = () => {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <Image src="/img/logo.png" alt={"logo"} width={400} height={200} className={styles.logo} />
      </div>
      <div className={styles.navs}>
        {linkMap.map((item) => (
          <Link key={item.name} href={item.link}>
            <div className={classNames(styles.nav, { [styles.active]: item.name === "About" })}>{item.name}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
