import React, { useState, useRef } from "react";
import { Badge, Button, Card, CardBody, CardHeader, HStack, Image, useToast } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { QR_CODE_DOMAIN } from "@/utils/defines";
import axios from "axios";
import { downloadSVGasPNG } from "@/utils/helpers";

const QrCard = (props) => {
  const { code } = props;

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [downloadLoading, setDownloadLoading] = useState(false);

  const qrRef = useRef(null);

  const toast = useToast();

  const debounceTimer = useRef<NodeJS.Timeout>();

  const handleChangeLink = (event) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      setStatus("");
      setMessage("Saving...");

      try {
        const response = await axios.put(`/api/qr-codes/change-link?id=${code.id}`, {
          newLink: event.target.value,
        });

        if (response.data.status) {
          setStatus("green");
          setMessage("Link changed!");
        }
      } catch (error) {
        setStatus("red");
        setMessage("Error while saving - please try again!");
      }
    }, 800);
  };

  const downloadQRCode = () => {
    downloadSVGasPNG(qrRef, {
      filename: `qr-code-${code.id.slice(0, 8)}.png`,
      width: 500,
      height: 500,
      onStart: () => setDownloadLoading(true),
      onComplete: () => setDownloadLoading(false),
      onError: (error) => {
        console.error("Error downloading QR code:", error);
        setDownloadLoading(false);

        toast({
          position: "top",
          title: "Failed to download QR code",
          description: "Please try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Card key={code.id} className={styles.card} flexDirection="row" overflow="hidden" maxW="md">
      <div className="flex flex-col items-center justify-center gap-2 p-4">
        <QRCodeSVG
          ref={qrRef}
          id={`qr-code-${code.id}`}
          style={{ height: "auto", width: "5em" }}
          value={QR_CODE_DOMAIN + code.id}
          size={400}
        />
        <Button variant="ghost" onClick={downloadQRCode}>
          Download
        </Button>
      </div>

      <CardBody className="flex flex-col items-center justify-center gap-2">
        <h2 className="bg-orange ">{code.id.slice(0, 8)}</h2>

        <p>Redirect to</p>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <i className="fa-solid fa-link"></i>{" "}
          </InputLeftElement>
          <Input value={code.link} onChange={handleChangeLink} placeholder="Link" />
        </InputGroup>
        {message && <Badge colorScheme={status}>{message}</Badge>}

        {/* {item.limit && <small className="text-black mt-3">*limited to {item.limit} per purchase</small>} */}
      </CardBody>
    </Card>
  );
};

export default QrCard;
