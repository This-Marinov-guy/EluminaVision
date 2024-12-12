import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const PageContainer: React.FC<Props> = ({ children, className }) => {
  return <div className={classNames(styles.wrapper, className)}>{children}</div>;
};

export default PageContainer;
