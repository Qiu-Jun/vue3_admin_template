import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
const sidebarStatus = useStorage('sidebarStatus', 'closed');
const device = useStorage('device', 'desktop');

const useAppStore = defineStore('app', {
  state: () => ({
    device,
    sidebar: {
      opened: sidebarStatus.value !== 'closed',
      withoutAnimation: false,
    },
  }),
  actions: {
    toggleSidebar(withoutAnimation: boolean) {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = withoutAnimation;
      if (this.sidebar.opened) {
        sidebarStatus.value = 'opened';
      } else {
        sidebarStatus.value = 'closed';
      }
    },
    closeSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
      sidebarStatus.value = 'closed';
    },
    openSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = true;
      this.sidebar.withoutAnimation = withoutAnimation;
      sidebarStatus.value = 'opened';
    },
    toggleDevice(val: string) {
      device.value = val;
    },
  },
});

export default useAppStore;
