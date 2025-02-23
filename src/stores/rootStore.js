import { UserStore } from "./userStore";
import { CartStore } from "./cartStore";

export class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.cartStore = new CartStore(this);
  }
}

let store = null;

export function initializeStore(initialData = null) {
  const _store = store ?? new RootStore();

  // Hydrate the store if there's initial data
  if (initialData) {
    Object.keys(initialData).forEach((storeKey) => {
      if (_store[storeKey] && typeof _store[storeKey].hydrate === "function") {
        _store[storeKey].hydrate(initialData[storeKey]);
      }
    });
  }

  // For SSR always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}
