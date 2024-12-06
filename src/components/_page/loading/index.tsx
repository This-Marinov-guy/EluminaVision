import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./style.module.scss";

const LoadingScreen = () => {
  const [show, setShow] = useState(true);

  return (
    show && (
      <section id="loading" className={styles.wrapper}>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%", display: "none" }}
          transition={{
            delay: 0.8,
            duration: 0.3,
          }}
          onAnimationComplete={() => {
            setShow(false);
          }}
          style={{ position: "absolute", left: 0, width: "50%", height: "100vh", backgroundColor: "#010101" }}
        ></motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "100%", display: "none" }}
          transition={{
            delay: 0.8,
            duration: 0.3,
          }}
          style={{ position: "absolute", right: 0, width: "50%", height: "100vh", backgroundColor: "#010101" }}
        ></motion.div>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, display: "none" }}
          transition={{
            delay: 0.5,
            duration: 0.3,
          }}
        >
          <div className={styles.loaderSection}>
            <Image src="/img/logo.png" alt={"loading"} width={100} height={50} className={styles.logo} />
            <p className={styles.text}>Loading...</p>
          </div>
        </motion.div>
      </section>
    )
  );
};

export default LoadingScreen;
