'use client'

import React, { useEffect } from "react";
import { supabase } from "@/utils/config";
import { useStore } from "@/stores/storeProvider";

const SessionProvider = ({ children }) => {
  const { userStore } = useStore();
  const { closeAuthModal, setUser } = userStore;

  const handleAuthStateChange = (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      setUser({ ...session.user.user_metadata, token: session.access_token ?? "" });
      closeAuthModal();
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then((response) => {
      const { session } = response.data;

      if (session.user) {
        setUser({ ...session.user.user_metadata, token: session.access_token ?? "" });
      }
    });

    supabase.auth.onAuthStateChange(handleAuthStateChange);
  }, []);

  return null;
};

export default SessionProvider;
