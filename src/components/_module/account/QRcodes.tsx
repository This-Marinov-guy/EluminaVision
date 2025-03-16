import React, { use, useEffect, useState } from "react";
import { Badge, Card, CardBody, CardHeader, HStack, Image } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Skeleton } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { QR_CODE_DOMAIN } from "@/utils/defines";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";
import QrCard from "@/components/_basic/input/QrCard";

const QRcodes = () => {
  const [link, setLink] = useState("");

  const { userStore } = useStore();
  const { user, qrCodesLoading, qrCodes } = userStore;

  if (qrCodesLoading) {
    return (
      <div className={styles.wrapper2}>
        <h1>Your QR codes</h1>

        <div className="flex justify-around gap-4 items-center mt-7 px-10">
          <Skeleton height="100px" width="200px" />
          <Skeleton height="100px" width="200px" />
          <Skeleton height="100px" width="200px" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper2}>
      <h1 className="text-center mt-7">Your QR codes</h1>

      {qrCodes.length == 0 ? (
        <h2 className="text-center">No codes yet - try ordering some or activating</h2>
      ) : (
        <div className={styles.services}>
          {qrCodes.map((code) => (
            <QrCard key={code.id} code={code} />
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(QRcodes);
