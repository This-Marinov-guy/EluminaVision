import React, { useCallback, useEffect, useState } from "react";
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
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/utils/config";
import axios from "axios";

const AuthButton = () => {
  const { userStore, commonStore } = useStore();
  const { loading } = commonStore;
  const { toggleAuthModal, closeAuthModal, isAuthModalOpen, user, setUser } = userStore;
  const router = useRouter();

  const handleAuthButton = () => {
    if (user) {
      router.push("/account");
    } else {
      toggleAuthModal();
    }
  };

  const handleAuthStateChange = (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      setUser({...session.user.user_metadata, token: session.access_token ?? ""});
      closeAuthModal();
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then((response) => {
      const { session } = response.data;

      if (session.user) {
        setUser({ ...session.user.user_metadata, token: session.access_token ?? "" })        
      }
    });

    supabase.auth.onAuthStateChange(handleAuthStateChange);
  }, []);

  return (
    <>
      <div className="relative cursor-pointer" onClick={handleAuthButton}>
        {user && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Badge className="absolute top-1 -left-1 text-white text-xs p-1 rounded-full">
              {user.email[0].toUpperCase()}
            </Badge>
          </motion.div>
        )}
        <i className={"fa-solid fa-user " + styles.cart_btn + " " + styles.btn} aria-hidden="true" />
      </div>

      <Modal isOpen={isAuthModalOpen} onClose={toggleAuthModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authenticate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <motion.div
              initial={{ scale: 0, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Auth
                supabaseClient={supabase}
                providers={["google"]}
                view="sign_in"
                redirectTo={process.env.NEXT_PUBLIC_BASE_URL}
                socialLayout="horizontal"
                theme="dark"
                appearance={{
                  theme: ThemeSupa,
                  style: {
                    button: {
                      color: "white",
                      backgroundColor: "rgb(81, 39, 53)",
                      fontFamily: "var(--font-poppins)",
                    },
                    input: {
                      color: "black",
                      backgroundColor: "#f1f1f1",
                    },
                    label: {
                      color: "black",
                    },
                    anchor: {
                      fontSize: "0.875rem",
                      color: "rgb(245 157 106)",
                    },
                  },
                  className: {},
                }}
              />
            </motion.div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default observer(AuthButton);
