import { supabase } from "@/utils/config";
import { makeAutoObservable } from "mobx";

export class UserStore {
  isAuthModalOpen = false;
  user = null;
  isLoading = true;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setUser = (user) => {
    this.user = user;
  };

  toggleLoading = () => {
    this.loading = !this.loading;
  };

  toggleAuthModal = () => {
    this.isAuthModalOpen = !this.isAuthModalOpen;
  };

  closeAuthModal = () => {
    this.isAuthModalOpen = false;
  };

  signOut = async () => {
    const { error } = await supabase.auth.signOut();

    this.user = null;
  };
}
