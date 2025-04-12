import React, { use, useEffect, useState } from "react";
import { Badge, Button, Card, CardBody, CardHeader, HStack, Image } from "@chakra-ui/react";
import {QRCodeSVG} from 'qrcode.react';
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Skeleton } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { QR_CODE_DOMAIN } from "@/utils/defines";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";
import QrCard from "@/components/_basic/input/QrCard";

const QRcodes = () => {
  const [link, setLink] = useState("");

  const { userStore } = useStore();
  const { user, qrCodesLoading, qrCodes } = userStore;

  const router = useRouter();

  const goToProducts = () => {
    router.push("/products");
  };

  let qrCodesPanel = null;

  if (qrCodesLoading) {
    qrCodesPanel = (
      <div className={styles.wrapper2}>
        <h1>Your QR codes</h1>

        <div className="flex justify-around gap-4 items-center mt-7 px-10">
          <Skeleton height="100px" width="200px" />
          <Skeleton height="100px" width="200px" />
          <Skeleton height="100px" width="200px" />
        </div>
      </div>
    );
  } else {
    qrCodesPanel = (
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
  }

  return (
    <>
      <div className="text-white">
        <div>
          <p className="py-2">
            We bring more by making QR codes dynamic - you control what the link is while the image never changes. You
            can order more codes from{" "}
            <Button size="sm" className="btn-light gap-2" onClick={goToProducts}>
              The Product Page
            </Button>{" "}
            or activate the ones you do not see here from the{" "}
            <Button size="sm" variant="solid" onClick={userStore.toggleQRCodeModal}>
              <i className="mr-2 fa-solid fa-qrcode"></i> Activate
            </Button>{" "}
            button
          </p>
        </div>
      </div>
      {qrCodesPanel}
    </>
  );
};

export default observer(QRcodes);
