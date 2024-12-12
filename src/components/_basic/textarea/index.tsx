import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

const TextArea: React.FC<any> = (props) => {
  const {className} = props;

  return <textarea {...props} className={classNames(styles.wrapper, className)} />;
};

export default TextArea;
