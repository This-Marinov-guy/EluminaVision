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

  businessCards = [
    {
      id: "dasdsadsa-dasdsadas",
      logo: "dasdsadsa",
      image: "dsadsa",
      backgroundColor: "#000000",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/username" },
        { label: "Twitter", url: "https://twitter.com/username" },
      ],
    },
  ];
  businessCardsLoading = false;

  activateBusinessCardModal = false;
  activationBusinessCardLoading = false;
  activationBusinessCardStatus = null;
  activationBusinessCardMessage = "";

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setUser = (user) => {
    this.user = user;

    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    this.isLoading = false;

    this.loadQrCodes();
  };

  toggleQRCodeModal = () => {
    this.activateQrCodeModal = !this.activateQrCodeModal;
  };

  loadQrCodes = async () => {
    try {
      if (!this.user?.token) return;

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

// Store methods
setBusinessCardLinkData = (cardIndex, linkIndex, field, value) => {
  // Make sure we have a copy of the links array to avoid direct mutation
  const card = this.businessCards[cardIndex];
  if (!card) return;
  
  const links = [...card.links];
  links[linkIndex] = {
    ...links[linkIndex],
    [field]: value
  };
  
  this.businessCards[cardIndex] = {
    ...card,
    links: links
  };
};

setBusinessCardData = (cardIndex, field, value) => {
  const card = this.businessCards[cardIndex];
  if (!card) return;
  
  this.businessCards[cardIndex] = {
    ...card,
    [field]: value
  };
}

removeLink = (cardIndex, linkIndex) => {
  const card = this.businessCards[cardIndex];
  if (!card) return;    

  // Create a new array without the link at linkIndex
  const newLinks = [...card.links];
  
  newLinks.splice(linkIndex, 1);

  this.businessCards[cardIndex] = {
    ...card,
    links: newLinks,
  };
};

addLink = (cardIndex) => {
  const card = this.businessCards[cardIndex];
  if (!card) return;
  
  // Create a new array with the added link
  const newLinks = [...card.links, { label: "", url: "" }];
  
  this.businessCards[cardIndex] = {
    ...card,
    links: newLinks,
  };
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
