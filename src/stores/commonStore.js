import { makeAutoObservable } from "mobx";

export class CommonStore {
  loading = false;
  invalidFields = [];
  error = "";

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setLoading = (loading) => {
    this.loading = loading;
  }

  setError = (error) => {
    this.error = error;
  }

  setInvalidFields(fields) {
    this.invalidFields = fields;
  }
}
