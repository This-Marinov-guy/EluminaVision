import { useStore } from "@/stores/storeProvider";
import React from "react";
import styles from "./style.module.scss";
import { observer } from "mobx-react-lite";

const UserPanel = () => {
  const { userStore } = useStore();
  const { user } = userStore;

  return (
    <div style={{color: 'white'}} className={styles.wrapper}>
      <div>
        <h5>Email: {user?.email}</h5>
      </div>
    </div>
  );
};

export default observer(UserPanel);
