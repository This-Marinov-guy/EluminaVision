'use client';

import React, { useEffect } from "react";
import NavBar from "@/components/_module/nav";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useStore } from "@/stores/storeProvider";

const success = () => {
  const {cartStore} = useStore();

  useEffect(() => {
    cartStore.clearCart();
  }, []);

  return (
    <>
      <NavBar />
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        backgroundColor={"green.700"}
        height="79vh"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Your payment was successful!
        </AlertTitle>
        <AlertDescription maxWidth="lg">
          Thank you for ordering from us - we will send you an email with all the details of your order in the next few hours. If you have questions or have not received the email, contact us directly!
        </AlertDescription>
      </Alert>
    </>
  );
};

export default success;
