import React from "react";

import styles from "./style.module.scss";

const TextInput: React.FC<any> = (props) => {
  return <input {...props} className={styles.wrapper}/>;
};

export default TextInput;
