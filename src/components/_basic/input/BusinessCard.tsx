import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, Input, useToast } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { Textarea } from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { BUSINESS_CARD_DOMAIN } from "@/utils/defines";
import LinkPreview from "../cards/LinkPreview";
import LinkWithLabel from "./LinkWithLabel";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";
import ImageInput from "./ImageInput";
import _ from "lodash"; // For deep comparison
import { downloadSVGasPNG } from "@/utils/helpers";

const BusinessCard = (props) => {
  const { card, cardIndex } = props;

  const [qrLogoPreview, setQrLogoPreview] = useState(card.logo ?? null);
  const [initialCard, setInitialCard] = useState(() => _.cloneDeep(card));
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const qrRef = useRef(null);

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
    if (card.logo && typeof card.logo !== "string") {
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

  const downloadQRCode = () => {
    downloadSVGasPNG(qrRef, {
      filename: `business-card-${card.id.slice(0, 8)}.png`,
      width: 240,
      height: 240,
      logoUrl: qrLogoPreview,
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

  // Function to handle sharing
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Business Card",
          text: card.description,
          url: card.redirect_url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported in your browser");
    }
  };

  return (
    <Card key={card.id} className={`${styles.card} relative`} flexDirection="column" overflow="hidden" maxW="xl">
      <div className="flex flex-row items-center justify-between gap-2 absolute top-2 right-2">
        <Button
          size="sm"
          className="btn-dark justify-self-end self-end -mb-8"
          onClick={handleShare}
          isDisabled={saveBusinessCardLoading}
          leftIcon={<i className="fa-solid fa-share"></i>}
        >
          Share
        </Button>
        <Button
          size="sm"
          className="btn-dark justify-self-end self-end -mb-8"
          onClick={downloadQRCode}
          isDisabled={saveBusinessCardLoading}
          leftIcon={<i className="fa-solid fa-cloud-arrow-down"></i>}
          isLoading={downloadLoading}
        >
          Download
        </Button>
        <Button
          size="sm"
          className="btn-light justify-self-end self-end -mb-8"
          onClick={handleSave}
          isDisabled={!unsavedChanges}
          leftIcon={<i className="fa-solid fa-floppy-disk"></i>}
          isLoading={saveBusinessCardLoading}
        >
          Save
        </Button>
      </div>

      <CardBody className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <QRCodeSVG
              ref={qrRef}
              id={`business-card-${card.id}`}
              style={{ height: "auto", width: "5em" }}
              value={BUSINESS_CARD_DOMAIN + card.id}
              size={400}
              fgColor={card.code_color}
              imageSettings={qrLogoPreview ? { src: qrLogoPreview, height: 80, width: 80, excavate: true } : undefined}
            />
            <h2 className="bg-orange ">{card.id.slice(0, 8)}</h2>
          </div>
          <div>
            <LinkPreview url={card.redirect_url} id="card-loaded" />
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-start justify-start gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Design</p>

            <ImageInput
              label="Logo"
              value={card.logo}
              imageFormat="png"
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
            <Button
              variant="outline"
              colorScheme="green"
              className="mt-4"
              size="sm"
              onClick={() => {
                const response = addLink(cardIndex);

                if (response?.message) {
                  toast({
                    position: "top",
                    title: response.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }}
            >
              Add link
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-3 w-full">
          <div className="flex flex-col items-center justify-center gap-2 w-32">
            <label>Code Color</label>
            <Input
              type="color"
              value={card.code_color}
              onChange={(e) => setBusinessCardData(cardIndex, "code_color", e.target.value)}
              placeholder="Code color"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-2 w-32">
            <label>Background Color</label>
            <Input
              type="color"
              value={card.background_color}
              onChange={(e) => setBusinessCardData(cardIndex, "background_color", e.target.value)}
              placeholder="Background color"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-2 w-32">
            <label>Card Color</label>
            <Input
              type="color"
              value={card.card_color}
              onChange={(e) => setBusinessCardData(cardIndex, "card_color", e.target.value)}
              placeholder="Card color"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-3 w-full">
          <label>Description</label>
          <InputGroup className="relative w-full">
            <Textarea
              size="sm"
              maxLength={400}
              resize="vertical"
              placeholder="Give some content"
              value={card.description}
              onChange={(e) => setBusinessCardData(cardIndex, "description", e.target.value)}
              className="pr-16"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">{card.description?.length ?? 0}/400</div>
          </InputGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default observer(BusinessCard);
