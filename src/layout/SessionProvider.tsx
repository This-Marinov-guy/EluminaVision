"use client";

import React, { useEffect } from "react";
import { SESSION_REFRESH_INTERVAL, supabase } from "@/utils/config";
import { useStore } from "@/stores/storeProvider";

const SessionProvider = ({ children }) => {
  // do not execute on the business card preview page
  if (window.location.pathname.includes("business-card/preview")) {
    return;
  }

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

    refreshInterval = setInterval(async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.refreshSession();

      if (session?.user) {
        setUser({
          ...session.user.user_metadata,
          token: session.access_token ?? "",
        });
      }

      if (error) {
        console.error("Error refreshing session:", error.message);
      }
    }, SESSION_REFRESH_INTERVAL);

    return () => {
      listener.subscription.unsubscribe();
      clearInterval(refreshInterval);
    };
  }, []);

  return null;
};

export default SessionProvider;
