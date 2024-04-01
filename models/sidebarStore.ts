import { create } from "zustand";

type SideBarStoreProps = {
  sideBarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export const useSibebarStore = create<SideBarStoreProps>((set) => ({
  sideBarOpen: false,
  openSidebar: () => set({ sideBarOpen: true }),
  closeSidebar: () => set({ sideBarOpen: false }),
}));
