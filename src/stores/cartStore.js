import { makeAutoObservable } from "mobx";

export class CartStore {
  items = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  addItem(item, quantity = 1) {
    if (quantity <= 0) return;

    const existingItem = this.items.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...item, quantity });
    }
  }

  removeItem(itemId, quantity = 1) {
    if (quantity <= 0) return;

    const existingItem = this.items.find((item) => item.id === itemId);

    if (!existingItem) return;

    if (quantity >= existingItem.quantity) {
      this.trashItem(itemId);
    } else {
      existingItem.quantity -= quantity;
    }
  }

  trashItem = (itemId) => {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
  }

}
