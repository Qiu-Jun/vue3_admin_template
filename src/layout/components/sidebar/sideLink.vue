<template>
    <component :is="type" :bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
import { isExternal } from '@/utils/validate.js'
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'sideLink',
    props: {
        to: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const isExternalTo = computed(() => isExternal(props.to))
        const type = computed(() => {
            if (isExternalTo.value) return 'a'
            return 'router-view'
        })
        const linkProps = (to) => {
            if (isExternalTo.value) {
                return false
            }
            return {
                to
            }
        }
        return {
            type,
            linkProps
        }
    }
})
</script>
