import React, { useEffect, useState } from "react";
import { Badge, Card, CardBody, CardHeader, HStack, Image } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { QR_CODE_DOMAIN } from "@/utils/defines";
import axios from "axios";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";

const QRcodes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const {userStore} = useStore();
  const {user} = userStore;

  const fetchCodes = async () => {
   
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  if (loading) {
    return (
      <div className={styles.wrapper2}>
        <h1 className="text-center">Your QR codes</h1>

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
                <h2 className="bg-orange ">{code.id}</h2>

                <p>Redirect to</p>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <i className="fa-solid fa-link"></i>{" "}
                  </InputLeftElement>
                  <Input type="tel" placeholder="Link" />
                </InputGroup>

                {/* {item.limit && <small className="text-black mt-3">*limited to {item.limit} per purchase</small>} */}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(QRcodes);
