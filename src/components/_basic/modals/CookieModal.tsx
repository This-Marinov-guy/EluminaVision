"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const CookieModal = () => {
  const LOCAL_STORAGE_COOKIE_CONSENT = "cookie-consent";

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Run only on client
    const hasConsent = localStorage.getItem(LOCAL_STORAGE_COOKIE_CONSENT) === "1";
    const isPreviewPage = window.location.pathname.includes("business-card/preview");
    setVisible(!hasConsent || !isPreviewPage);
  }, []);

  const closeModal = () => {
    setVisible(false);
    localStorage.setItem(LOCAL_STORAGE_COOKIE_CONSENT, "1");
  };

  return (
    <Modal isOpen={visible} closeOnEsc={false} closeOnOverlayClick={false} onClose={closeModal} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cookie Consent</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>
            This site uses cookies to track user interaction in order to provide a better experience. To continue using
            the platform, we need your consent to collect such data.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            Accept
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CookieModal;
