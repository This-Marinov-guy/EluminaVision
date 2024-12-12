import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

const Button: React.FC<any> = (props) => {
  const {className, children} = props;

  return (
    <button {...props} className={classNames(styles.wrapper, className)}>
      {children}
    </button>
  );
};

export default Button;
