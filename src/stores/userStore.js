import { makeAutoObservable } from "mobx";

export class UserStore {
  user = null;
  isLoading = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setUser(user) {
    this.user = user;
  }

  async login(credentials) {
    this.isLoading = true;
    try {
      // Example login logic
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      const user = await response.json();
      this.setUser(user);
    } finally {
      this.isLoading = false;
    }
  }

  logout() {
    this.user = null;
  }
}
