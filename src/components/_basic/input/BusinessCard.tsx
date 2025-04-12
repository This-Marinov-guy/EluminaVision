import React, { useEffect } from "react";
import { Button, Card, CardBody } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { Textarea } from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";
import { InputGroup } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { QR_CODE_DOMAIN } from "@/utils/defines";
import LinkPreview from "../cards/LinkPreview";
import LinkWithLabel from "./LinkWithLabel";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";
import ImageInput from "./ImageInput";

const BusinessCard = (props) => {
  const { card, cardIndex } = props;

  const [color, setColor] = React.useState(card.backgroundColor);
  const [qrLogoPreview, setQrLogoPreview] = React.useState(card.logo ?? null);

  const { userStore } = useStore();
  const { setBusinessCardLinkData, setBusinessCardData, addLink, removeLink } = userStore;

  useEffect(() => {
    changeColor(color);
  }, [color]);

  useEffect(() => {
    if (card.logo) {
      setQrLogoPreview(URL.createObjectURL(card.logo));
    }
  }, [card.logo]);

  const changeColor = (color) => {
    setBusinessCardData(cardIndex, "backgroundColor", setBusinessCardData, color);
  };

  return (
    <Card key={card.id} className={styles.card} flexDirection="row" overflow="hidden" maxW="xl">
      <CardBody className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <QRCodeSVG
              style={{ height: "auto", width: "5em" }}
              value={QR_CODE_DOMAIN + card.id}
              size={240}
              bgColor={color}
              imageSettings={qrLogoPreview ? { src: qrLogoPreview, height: 60, width: 60, excavate: true } : undefined}
            />
            <h2 className="bg-orange ">{card.id.slice(0, 8)}</h2>
          </div>
          <div>
            <LinkPreview url="https://domakin.nl/contacts" />
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-start justify-start gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Design</p>
            <ImageInput
              label="Logo"
              value={card.logo}
              onChange={(value) => {
                setBusinessCardData(cardIndex, "logo", value);
              }}
            />

            <ImageInput
              label="Image"
              value={card.logo}
              onChange={(value) => {
                setBusinessCardData(cardIndex, "image", value);
              }}
            />

            <div className="flex flex-col items-center justify-center gap-2 mt-3">
              <label>Background Color</label>
              <HexColorPicker color={color} onChange={setColor} />
            </div>

            <div className="flex flex-col items-center justify-center gap-2 mt-3">
              <label>Description</label>
              <InputGroup>
                <Textarea
                  size="sm"
                  resize="vertical"
                  placeholder="Give some content"
                  value={card.description}
                  onChange={(e) => setBusinessCardData(cardIndex, "description", e.target.value)}
                />
              </InputGroup>
            </div>
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
