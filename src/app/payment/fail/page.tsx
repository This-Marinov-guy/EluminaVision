"use client";

import React from "react";
import NavBar from "@/components/_module/nav";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const fail = () => {
  return (
    <>
      <NavBar />
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        backgroundColor={"red.700"}
        height="79vh"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Your payment was unsuccessful!
        </AlertTitle>
        <AlertDescription maxWidth="lg">
          There was a problem with your payment. Please try again or contact us directly if you need help!
        </AlertDescription>
      </Alert>
    </>
  );
};

export default fail;
