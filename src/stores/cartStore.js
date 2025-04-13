import { makeAutoObservable } from "mobx";
import axios from "axios";
const CART_LOCAL_STORAGE_KEY = "EV_cart";

export class CartStore {
  items = [];
  cartModal = false;

  constructor(rootStore, commonStore) {
    this.rootStore = rootStore;
    this.commonStore = commonStore;
    makeAutoObservable(this, { rootStore: false, commonStore: false });
  }

  loadCart = () => {
    const cart = localStorage.getItem(CART_LOCAL_STORAGE_KEY);

    if (cart) {
      this.items = JSON.parse(cart);
    }
  };

  addItem(item, quantity = 1) {
    if (quantity <= 0) return;

    const trimmedItem = item;

    delete trimmedItem.description;
    delete trimmedItem.imageUrl;

    const existingItem = this.items.find((cartItem) => cartItem.id === trimmedItem.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...trimmedItem, quantity });
    }

    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(this.items));
  }

  toggleCartModal = () => {
    this.cartModal = !this.cartModal;
  };

  removeItem(itemId, quantity = 1) {
    if (quantity <= 0) return;

    const existingItem = this.items.find((item) => item.id === itemId);

    if (!existingItem) return;

    if (quantity >= existingItem.quantity) {
      this.trashItem(itemId);
    } else {
      existingItem.quantity -= quantity;
    }

    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(this.items));
  }

  trashItem = (itemId) => {
    this.items = this.items.filter((item) => item.id !== itemId);

    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(this.items));
  };

  goToCheckout = () => {
    this.commonStore.setLoading(true);

    axios
      .post("/api/checkout", { items: this.items })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        } else if (response.data.error) {
          this.commonStore.setError(response.data.error);
        }
      })
      .catch((error) => {
        this.commonStore.setError(error.message);
      })
      .finally(() => {
        this.commonStore.setLoading(false);
      });
  };

  clearCart = () => {
    this.items = [];
    localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
  };

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
  }
}
