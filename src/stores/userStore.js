import { supabase } from "@/utils/config";
import { makeAutoObservable } from "mobx";
import axios from "axios";

export class UserStore {
  isAuthModalOpen = false;
  user = null;
  isLoading = true;

  qrCodes = [];
  qrCodesLoading = true;

  activateQrCodeModal = false;
  activationLoading = false;
  activationStatus = null;
  activationMessage = "";

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setUser = (user) => {
    this.user = user;

    this.isLoading = false;

    this.loadQrCodes();
  };

  toggleQRCodeModal = () => {
    this.activateQrCodeModal = !this.activateQrCodeModal;
  }

  loadQrCodes = async () => {
    try {
      if (!this.user?.token) return;

      axios.defaults.headers.common["Authorization"] = `Bearer ${this.user.token}`;

      const response = await axios.get("/api/qr-codes/user-codes");

      this.qrCodes = response.data.qrCodes;
    } catch (error) {
      console.error("Error fetching codes", error);
    } finally {
      this.qrCodesLoading = false;
    }
  };

  activateQrCode = async (codeId) => {
    this.activationLoading = true;
    this.activationStatus = null;
    this.activationMessage = "";

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.user.token}`;

      const response = await axios.put(`/api/qr-codes/activate`, { id: codeId });

      this.activationStatus = response.data.status;
      this.activationMessage = response.data.message;

      if (response.data.status === true) {
        this.loadQrCodes();
      }
    } catch (error) {
      console.log("Error activating code", error);
      
      this.activationStatus = false;
      this.activationMessage = error.response.data.message ?? "Error activating code - please try again!";
    } finally {
      this.activationLoading = false;
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
