import { createPinia } from 'pinia';
import type { App } from 'vue';

export { default as usePermissionStore } from './modules/permission';
export { default as useAppStore } from './modules/app';

const store = createPinia();

export const setupStore = (app: App<Element>) => app.use(store);

export default store;
