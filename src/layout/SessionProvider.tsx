"use client";

import React, { useEffect } from "react";
import { supabase } from "@/utils/config";
import { useStore } from "@/stores/storeProvider";

const SessionProvider = ({ children }) => {
  const { userStore } = useStore();
  const { closeAuthModal, setUser } = userStore;

  const handleAuthStateChange = (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      setUser({
        ...session.user.user_metadata,
        token: session.access_token ?? "",
      });
      closeAuthModal();
    }
  };

  useEffect(() => {
    let refreshInterval;

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          ...session.user.user_metadata,
          token: session.access_token ?? "",
        });
      }
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Refresh session token every 15 minutes
    refreshInterval = setInterval(
      async () => {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser({
            ...session.user.user_metadata,
            token: session.access_token ?? "",
          });
        }

        if (error) {
          console.error("Error refreshing session:", error.message);
        }
      },
      15 * 60 * 1000,
    ); // 15 minutes

    return () => {
      listener.subscription.unsubscribe();
      clearInterval(refreshInterval);
    };
  }, []);

  return null;
};

export default SessionProvider;
