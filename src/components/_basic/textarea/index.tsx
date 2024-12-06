import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

type Props = {
  placeholder?: string;
  className?: string;
};

const TextArea: React.FC<Props> = ({ placeholder = "", className = "" }) => {
  return <textarea className={classNames(styles.wrapper, className)} placeholder={placeholder} rows={5} />;
};

export default TextArea;
