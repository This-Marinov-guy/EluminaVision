import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <button className={classNames(styles.wrapper, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
