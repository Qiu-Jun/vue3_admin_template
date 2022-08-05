import { defineStore } from 'pinia'

const useTagsViews = defineStore({
    id: 'tagsViews',

    state: () => ({
        visitedViews: []
    }),

    actions: {
        addView(view) {
            this.addVisitedView(view)
        },

        addVisitedView(view) {
            if (this.visitedViews.some((v) => v.path === view.path)) return
            this.visitedViews.push({
                ...view,
                title: view.meta.title || 'no-name'
            })
        },

        delView(view) {
            return new Promise((resolve) => {
                this.delVisitedView(view)
                resolve({
                    visitedViews: [...this.visitedViews]
                })
            })
        },

        delVisitedView(view) {
            return new Promise((resolve) => {
                for (const [i, v] of this.visitedViews.entries()) {
                    if (v.path === view.path) {
                        this.visitedViews.splice(i, 1)
                        break
                    }
                }
                resolve([...this.visitedViews])
            })
        },

        delCachedView(view) {
            return new Promise((resolve) => {
                const index = this.cachedViews.indexOf(view.name)
                if (index > -1) {
                    this.cachedViews.splice(index, 1)
                }
                resolve([...this.cachedViews])
            })
        },

        delOthersViews(view) {
            return new Promise((resolve) => {
                this.delOthersVisitedViews(view)
                this.delOthersCachedViews(view)
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },

        delOthersVisitedViews(view) {
            return new Promise((resolve) => {
                this.visitedViews = this.visitedViews.filter((v) => {
                    return v.meta.affix || v.path === view.path
                })
                resolve([...this.visitedViews])
            })
        },

        delAllViews() {
            return new Promise((resolve) => {
                this.delAllVisitedViews()
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },

        delAllVisitedViews() {
            return new Promise((resolve) => {
                // keep affix tags
                const affixTags = this.visitedViews.filter(
                    (tag) => tag.meta.affix
                )
                this.visitedViews = affixTags
                resolve([...this.visitedViews])
            })
        },

        updateVisitedView(view) {
            for (let v of this.visitedViews) {
                if (v.path === view.path) {
                    v = Object.assign(v, view)
                    break
                }
            }
        }
    }
})

export default useTagsViews
