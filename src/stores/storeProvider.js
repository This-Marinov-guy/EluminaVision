"use client";

import { createContext, useContext } from "react";
import { initializeStore } from "./rootStore";

const StoreContext = createContext(null);

export function StoreProvider({ children, initialState }) {
  const store = initializeStore(initialState);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
}
