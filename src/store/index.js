import { createStore } from 'vuex'
import getters from './getters'

const modulesFiles = import.meta.globEager('./modules/*.js')
const modules = {}
for (const key in modulesFiles) {
    if (Object.prototype.hasOwnProperty.call(modulesFiles, key)) {
        modules[key.replace(/(\.\/modules\/|\.js)/g, '')] = modulesFiles[key].default
    }
}

export default createStore({
    modules,
    getters
})
