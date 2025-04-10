import React, { useState, useRef } from "react";
import { Badge, Card, CardBody, CardHeader, HStack, Image } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { Textarea } from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { QR_CODE_DOMAIN } from "@/utils/defines";
import axios from "axios";
import LinkPreview from "../cards/LinkPreview";

const BusinessCard = (props) => {
  const { code } = props;

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("#aabbcc");

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

  return (
    <Card key={code.id} className={styles.card} flexDirection="row" overflow="hidden" maxW="md">
      <CardBody className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <QRCode style={{ height: "auto", width: "5em" }} value={QR_CODE_DOMAIN + code.id} viewBox={`0 0 256 256`} />
            <h2 className="bg-orange ">{code.id.slice(0, 8)}</h2>
          </div>
          <div>
            <LinkPreview url="https://domakin.nl/contacts" />
          </div>
        </div>

        <div className="mt-4 flex flex-row items-start justify-start gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Design</p>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <i className="fa-solid fa-font-awesome"></i>{" "}
              </InputLeftElement>
              <Input placeholder="Logo" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <i className="fa-solid fa-image"></i>{" "}
              </InputLeftElement>
              <Input placeholder="Image" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <i className="fa-solid fa-palette"></i>{" "}
              </InputLeftElement>
              <HexColorPicker color={color} onChange={setColor} />
            </InputGroup>

            <InputGroup>
              <Textarea size='sm' resize='vertical' placeholder="Short description" />
            </InputGroup>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">Links</p>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <i className="fa-brands fa-instagram"></i>{" "}
              </InputLeftElement>
              <Input placeholder="Logo" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <i className="fa-brands fa-square-facebook"></i>{" "}
              </InputLeftElement>
              <Input placeholder="Image" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <i className="fa-brands fa-linkedin"></i>{" "}
              </InputLeftElement>
              <Input placeholder="Background-color" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <i className="fa-solid fa-globe"></i>{" "}
              </InputLeftElement>
              <Input placeholder="Background-color" />
            </InputGroup>
          </div>
        </div>
        {/* {item.limit && <small className="text-black mt-3">*limited to {item.limit} per purchase</small>} */}
      </CardBody>
    </Card>
  );
};

export default BusinessCard;
