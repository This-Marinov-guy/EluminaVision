import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthLayout = ({ children }) => {
  const { userStore } = useStore();
  const { toggleAuthModal, closeAuthModal, isLoading, isAuthModalOpen, user } = userStore;

  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
      toggleAuthModal();
    }
  }, [user]);

  return <>{children}</>;
};

export default observer(AuthLayout);
