import { makeAutoObservable } from "mobx";

const CART_LOCAL_STORAGE_KEY = "EV_cart";

export class CartStore {
  items = [];
  cartModal = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  loadCart = () => {
    const cart = localStorage.getItem(CART_LOCAL_STORAGE_KEY);

    if (cart) {      
      this.items = JSON.parse(cart);
    }
  }

  addItem(item, quantity = 1) {
    if (quantity <= 0) return;

    const existingItem = this.items.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...item, quantity });
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

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
  }
}
