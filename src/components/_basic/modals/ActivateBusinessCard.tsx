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

const ActivateBusinessCard = () => {
  const { userStore } = useStore();
  const {
    activateBusinessCardModal,
    toggleBusinessCardModal,
    activationBusinessCardMessage,
    activationBusinessCardStatus,
    activationBusinessCardLoading,
    activateBusinessCard,
  } = userStore;

  const [code, setCode] = useState("");

  return (
    <Modal isOpen={activateBusinessCardModal} onClose={toggleBusinessCardModal} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Activate Business Card</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Enter the id of the Business Card</p>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              {activationBusinessCardLoading ? (
                <Spinner />
              ) : (
                {
                  true: <i className="fa-solid fa-check text-green-60"></i>,
                  false: <i className="fa-solid fa-xmark text-red"></i>,
                }[activationBusinessCardStatus] || null
              )}
            </InputLeftElement>
            <Input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="card id"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  activateBusinessCard(code);
                }
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => activateBusinessCard(code)}>
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup></InputGroup>
          <p className={activationBusinessCardStatus ? "text-green-600" : "text-red"}>{activationBusinessCardMessage}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default observer(ActivateBusinessCard);
