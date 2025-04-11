import React, { useEffect } from "react";
import { Badge, Button, Card, CardBody, CardHeader, HStack, Image } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { Textarea } from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";
import { Input, InputLeftAddon, InputGroup, InputLeftElement } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { QR_CODE_DOMAIN } from "@/utils/defines";
import LinkPreview from "../cards/LinkPreview";
import LinkWithLabel from "./LinkWithLabel";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";

const BusinessCard = (props) => {
  const { card, cardIndex } = props;

  const [color, setColor] = React.useState(card.backgroundColor);

  const { userStore } = useStore();
  const { setBusinessCardLinkData, setBusinessCardData, addLink, removeLink } = userStore;

  useEffect(() => {
    changeColor(color);
  }, [color]);

  const changeColor = (color) => {
    setBusinessCardData(cardIndex, "backgroundColor", setBusinessCardData, color);
  };

  return (
    <Card key={card.id} className={styles.card} flexDirection="row" overflow="hidden" maxW="xl">
      <CardBody className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <QRCode style={{ height: "auto", width: "5em" }} value={QR_CODE_DOMAIN + card.id} viewBox={`0 0 256 256`} />
            <h2 className="bg-orange ">{card.id.slice(0, 8)}</h2>
          </div>
          <div>
            <LinkPreview url="https://domakin.nl/contacts" />
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-start justify-start gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Design</p>
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>

              <Input type="file" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <i className="fa-solid fa-image"></i>{" "}
              </InputLeftElement>
              <Input placeholder="Image" />
            </InputGroup>

            <HexColorPicker color={color} onChange={setColor} />

            <InputGroup>
              <Textarea size="sm" resize="vertical" placeholder="Short description" />
            </InputGroup>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">Links</p>
            {card.links.map((link, linkIndex) => (
              <div key={linkIndex} className="flex items-center gap-2">
                <LinkWithLabel
                  link={link}
                  setLinkData={(field, value) => setBusinessCardLinkData(cardIndex, linkIndex, field, value)}
                />
                <i
                  className="fa-solid fa-minus text-red cursor-pointer"
                  onClick={() => removeLink(cardIndex, linkIndex)}
                ></i>
              </div>
            ))}
            <Button variant="outline" colorScheme="green" className="mt-4" size="sm" onClick={() => addLink(cardIndex)}>
              Add link
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default observer(BusinessCard);
