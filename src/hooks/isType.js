import { isRef, isProxy, isReactive, isReadonly } from 'vue'

export default function useIsType() {
    const judgeRef = (obj) => obj && isRef(obj)
    const judgeProxy = (obj) => obj && isProxy(obj)
    const judgeReactive = (obj) => obj && isReactive(obj)
    const judgeReadonly = (obj) => obj && isReadonly(obj)
    return {
        judgeRef,
        judgeProxy,
        judgeReactive,
        judgeReadonly
    }
}
