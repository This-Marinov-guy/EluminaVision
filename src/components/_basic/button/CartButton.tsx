import React, { useState } from "react";
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
import { observer } from "mobx-react-lite";
import styles from "./style.module.scss";
import { useStore } from "@/stores/storeProvider";
import { useRouter } from "next/navigation";
import { getCurrencySymbol } from "@/utils/helpers";
import { motion, AnimatePresence } from "framer-motion";
import Counter from "@/components/_basic/input/Counter";

const CartButton = () => {
  const { cartStore } = useStore();
  const { items, totalItems, totalPrice, trashItem, cartModal, toggleCartModal } = cartStore;
  const router = useRouter();

  const goToProducts = () => {
    toggleCartModal();
    router.push("/products");
  };

  return (
    <>
      <div className="relative cursor-pointer" onClick={toggleCartModal}>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Badge className="absolute top-1 -left-1 text-white text-xs p-1 rounded-full">
              {totalItems < 100 ? totalItems : "99+"}
            </Badge>
          </motion.div>
        )}
        <i className={"fas fa-shopping-cart " + styles.cart_btn + " " + styles.btn} aria-hidden="true" />
      </div>

      <Modal isOpen={cartModal} onClose={toggleCartModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your cart</ModalHeader>
          <ModalCloseButton />
          {totalItems > 0 ? (
            <ModalBody>
              {items.map((item) => (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div key={item.id} className="flex items-center justify-between gap-3 p-2 border-b border-gray-200">
                    <div>
                      {item.title} ({item.variant}) - {getCurrencySymbol(item.currency)}
                      {item.price}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Counter
                        value={item.quantity}
                        setValue={(newQuantity) => {
                          if (newQuantity > item.quantity) {
                            cartStore.addItem(item, newQuantity - item.quantity);
                          } else {
                            cartStore.removeItem(item.id, item.quantity - newQuantity);
                          }
                        }}
                        isInput
                      />

                      <i
                        onClick={() => trashItem(item.id)}
                        className="text-hardRed cursor-pointer fa-solid fa-trash-can"
                      ></i>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="flex items-center justify-center mt-5">
                <Badge style={{ scale: "1.3" }} colorScheme="blue">
                  Total: {getCurrencySymbol(items[0].currency)}
                  {totalPrice}
                </Badge>
              </div>
            </ModalBody>
          ) : (
            <ModalBody className="flex flex-col items-center justify-center">
              <h5>Currently empty - let's fill it with some products</h5>
            </ModalBody>
          )}

          <ModalFooter className="flex m-auto align-center justify-center gap-3">
            {totalItems > 0 ? (
              <Button className={styles.btn} colorScheme="orange" size="sm">
                Checkout
              </Button>
            ) : (
              <Button onClick={goToProducts} colorScheme="blue" size="sm">
                Go to Products
              </Button>
            )}
            <Button onClick={toggleCartModal} colorScheme="red" variant="outline" size="sm">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default observer(CartButton);
