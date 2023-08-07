import { createPinia } from 'pinia';
import type { App } from 'vue';

const store = createPinia();

// modules
export { default as usePermissionStore } from './modules/permission';
export { default as useAppStore } from './modules/app';
export { default as useUserStore } from './modules/user';
export { default as useTagsViewStore, type TagView } from './modules/tagsView';

export const setupStore = (app: App<Element>) => app.use(store);

export default store;
