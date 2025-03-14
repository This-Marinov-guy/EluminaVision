import { useStore } from "@/stores/storeProvider";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Badge,
} from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const ActivateQRCode = () => {
  const { userStore } = useStore();
  const {
    activateQrCodeModal,
    toggleQRCodeModal,
    activationMessage,
    activationStatus,
    activationLoading,
    activateQrCode,
  } = userStore;

  const [code, setCode] = useState("");

  return (
    <Modal isOpen={activateQrCodeModal} onClose={toggleQRCodeModal} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Activate QR</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Enter the id of the QR code</p>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              {activationLoading ? (
                <Spinner />
              ) : (
                {
                  true: <i className="fa-solid fa-check text-green-60"></i>,
                  false: <i className="fa-solid fa-xmark text-red"></i>,
                }[activationStatus] || null
              )}
            </InputLeftElement>
            <Input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="QR code id"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  activateQrCode(code);
                }
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => activateQrCode(code)}>
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup></InputGroup>
          <p className={activationStatus ? 'text-green-600' : 'text-red'}>{activationMessage}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default observer(ActivateQRCode);
