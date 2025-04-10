import React, { use, useEffect, useState } from "react";
import { Badge, Button, Card, CardBody, CardHeader, HStack, Image } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Skeleton } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { QR_CODE_DOMAIN } from "@/utils/defines";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";
import QrCard from "@/components/_basic/input/QrCard";
import BusinessCard from "@/components/_basic/input/BusinessCard";

const BusinessCards = () => {
  const [link, setLink] = useState("");

  const { userStore } = useStore();
  const { user, qrCodesLoading } = userStore;

  const qrCodes = [{
    id: 'dsadasdas-dsadasdasdas',
    link: 'dsadas'
  }]; 

  const router = useRouter();

  const goToProducts = () => {
    router.push("/products");
  };

  let qrCodesPanel = null;

  if (qrCodesLoading) {
    qrCodesPanel = (
      <div className={styles.wrapper2}>
        <h1>Your Business cards</h1>

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
        <h1 className="text-center mt-7">Your Business cards</h1>

        {qrCodes.length == 0 ? (
          <h2 className="text-center">No cards yet - try ordering some or activating</h2>
        ) : (
          <div className={styles.servicesTwo}>
            {qrCodes.map((code) => (
              <BusinessCard key={code.id} code={code} />
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
            Do you want to have a single QR code and be able to change the business card at any time? We provide the best solution for you - a dynamic QR code with customizable data. Get one from the 
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

export default observer(BusinessCards);
