import React from "react";

import styles from "./style.module.scss";

type Props = {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

const TextInput: React.FC<Props> = ({ type = "text", placeholder = "" }) => {
  return <input type={type} className={styles.wrapper} placeholder={placeholder} />;
};

export default TextInput;
