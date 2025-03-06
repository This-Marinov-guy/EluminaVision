import { makeAutoObservable } from "mobx";

export class UserStore {
  isAuthModalOpen = false;
  user = null;
  isLoading = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setUser = (user) => {
    this.user = user;
  }

  toggleAuthModal = () => {
    this.isAuthModalOpen = !this.isAuthModalOpen;
  };

  closeAuthModal = () => {
    this.isAuthModalOpen = false;
  };

}
