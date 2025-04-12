import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Input, useToast } from "@chakra-ui/react";
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
import _ from "lodash"; // For deep comparison

const BusinessCard = (props) => {
  const { card, cardIndex } = props;

  const [color, setColor] = useState(card.background_color || '#aaa');
  const [qrLogoPreview, setQrLogoPreview] = useState(card.logo ?? null);
  const [initialCard, setInitialCard] = useState(() => _.cloneDeep(card));
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const { userStore } = useStore();
  const {
    setBusinessCardLinkData,
    setBusinessCardData,
    saveBusinessCard,
    addLink,
    removeLink,
    saveBusinessCardLoading,
  } = userStore;

  const toast = useToast();

  useEffect(() => {
    changeColor(color);
  }, [color]);

  useEffect(() => {
    if (typeof card.logo !== 'string') {
      setQrLogoPreview(URL.createObjectURL(card.logo));
    }
  }, [card.logo]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedChanges]);

  useEffect(() => {
    const changed = !_.isEqual(card, initialCard);
    setUnsavedChanges(changed);
  }, [card, initialCard]);

  const changeColor = (color) => {
    setBusinessCardData(cardIndex, "background_color", color);
  };

  const handleSave = async () => {
    const saveId = "business-card-saved";
    const failId = "business-card-failed-modification";
   
    const isSuccess = await saveBusinessCard(cardIndex);

    if (isSuccess) {
      setInitialCard(_.cloneDeep(card));
      setUnsavedChanges(false);

      if (!toast.isActive(saveId)) {
        toast({
          id: saveId,
          position: "top",
          title: "Card saved.",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      }
    } else if (!toast.isActive(failId)) {
      toast({
        id: failId,
        position: "top",
        title: "Failed to save - please try again.",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } 
  };

  return (
    <Card key={card.id} className={`${styles.card} relative`} flexDirection="column" overflow="hidden" maxW="xl">
      <Button
        size="sm"
        className="btn-dark w-18 justify-self-end self-end -mb-8"
        onClick={handleSave}
        isDisabled={!unsavedChanges}
        leftIcon={<i className="fa-solid fa-floppy-disk"></i>}
        isLoading={saveBusinessCardLoading}
      >
        Save
      </Button>

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
            <LinkPreview url={card.redirect_url} />
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
              value={card.image}
              onChange={(value) => {
                setBusinessCardData(cardIndex, "image", value);
              }}
            />

            <div className="flex flex-col items-center justify-center gap-2 mt-3">
              <label>Background Color</label>
              <HexColorPicker color={color} onChange={setColor} />
              <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Background color" />
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
            {card.links &&
              card.links.map((link, linkIndex) => (
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
