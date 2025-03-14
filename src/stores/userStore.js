import { supabase } from "@/utils/config";
import { makeAutoObservable } from "mobx";
import axios from "axios";

export class UserStore {
  isAuthModalOpen = false;
  user = null;
  isLoading = true;

  qrCodes = [];
  qrCodesLoading = true;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setUser = (user) => {
    this.user = user;

    this.loadQrCodes();
  };

  loadQrCodes = async () => {
    try {
      if (!this.user?.token) return;
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.user.token}`;

      const response = await axios.get("/api/user-codes/qr-codes");

      this.qrCodes = response.data.qrCodes;
    } catch (error) {
      console.error("Error fetching codes", error);
    } finally {
      this.qrCodesLoading = false;
    }
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
