import { create } from "zustand";
import { getItem, setItem } from "../utils/storage";

export type DriverStoreProps = {
  online: boolean;
  delivering: boolean | null;
  setOnline: (online: boolean) => void;
  setDelivering: (delivering: boolean | null) => void;
};

export const useDriverStore = create<DriverStoreProps>((set, state) => ({
  online: false,
  delivering: getItem("DELIVERING") === "true",
  setOnline: (online) => {
    set({ online });
    setItem("ONLINE", "true");
  },
  setDelivering: (delivering) => {
    set({ delivering });
    setItem("DELIVERING", delivering ? "true" : "false");
  },
}));
