import React from "react";

import styles from "./style.module.scss";

type Props = {
  title: string;
  slogan: string;
  button?: any;
};

const PageSectionHeading: React.FC<Props> = ({ title, slogan, button = null }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}></div>
      <div className="flex items-center justify-between gap-3" style={{ width: "100%" }}>
        <h2 className={styles.heading}>{title}</h2>
        {button}
      </div>
      <span className={styles.who}>{slogan}</span>
    </div>
  );
};

export default PageSectionHeading;
