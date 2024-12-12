import React from "react";

import styles from "./style.module.scss";

type Props = {
  title: string;
  slogan: string;
};

const PageSectionHeading: React.FC<Props> = ({ title, slogan }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}></div>
      <h2 className={styles.heading}>{title}</h2>
      <span className={styles.who}>{slogan}</span>
    </div>
  );
};

export default PageSectionHeading;
