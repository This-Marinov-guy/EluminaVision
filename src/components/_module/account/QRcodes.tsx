import React from "react";
import { Badge, Card, CardBody, CardHeader, HStack, Image } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { QR_CODE_DOMAIN } from "@/utils/defines";

const QRcodes = () => {
  const codes = [
    {
      id: "dsa-dsadas",
      link: "domakin.nl",
    },
    {
      id: "dsa-dsadas",
      link: "domakin.nl",
    },
    {
      id: "dsa-dsadas",
      link: "domakin.nl",
    },
  ];

  return (
    <div className={styles.wrapper2}>
      <h1 className="text-center">Your QR codes</h1>

      {codes.length == 0 ? (
        <h2 className="text-center">No codes yet - try ordering some or activating</h2>
      ) : (
        <div className={styles.services}>
          {codes.map((code) => (
            <Card key={code.id} className={styles.card} flexDirection="row" overflow="hidden" maxW="md">
              <QRCode
                style={{ height: "auto", width: "5em" }}
                value={QR_CODE_DOMAIN + code.id}
                viewBox={`0 0 256 256`}
              />

              <CardBody className="flex flex-col items-center justify-center gap-2">
                <h2>{code.id}</h2>

                <p>Redirect to</p>
                <input></input>

                {/* {item.limit && <small className="text-black mt-3">*limited to {item.limit} per purchase</small>} */}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QRcodes;
