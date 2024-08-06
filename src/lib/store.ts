import { create } from "zustand";
import { IAppProvider } from "./types";

export const providerStore = create<IAppProvider>((set) => ({
  status: { message: "", status: null },
  loginProps: {
    title: "",
    description: "",
  },
  setStatus(payload, message) {
    set((state) => ({
      ...state,
      status: {
        message: message || "",
        status: payload,
      },
    }));
  },
  setLoginProps(payload) {
    set((state) => ({
      ...state,
      loginProps: payload,
    }));
  },
}));
