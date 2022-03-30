<template>
    <div ref="rightPanelRef" :class="{ show }" class="rightPanel-container">
        <div class="rightPanel-background" />
        <div class="rightPanel">
            <div class="rightPanel-items">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import { addClass, removeClass } from '@/utils/common'
import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    ref,
    watch
} from 'vue'
import useSettings from '@/store/modules/settings'

export default defineComponent({
    name: 'rightPanel',
    props: {
        clickNotClose: {
            default: false,
            type: Boolean
        }
    },
    setup(props) {
        const settings = useSettings()
        const rightPanelRef = ref(null)
        const show = computed(() => settings.showSettings)

        const insertToBody = () => {
            if (!rightPanelRef.value) return
            const body = document.querySelector('body')
            body.insertBefore(rightPanelRef.value, body.firstChild)
        }
        const closeSidebar = (evt) => {
            const parent = evt.target.closest('.rightPanel')
            if (!parent) {
                show.value = false
                window.removeEventListener('click', closeSidebar)
            }
        }
        const addEventClick = () => {
            window.addEventListener('click', closeSidebar)
        }

        watch(show, (val) => {
            if (val && !props.clickNotClose) {
                addEventClick()
            }
            if (val) {
                addClass(document.body, 'showRightPanel')
            } else {
                removeClass(document.body, 'showRightPanel')
            }
        })

        onMounted(insertToBody)

        onBeforeUnmount(() => {
            rightPanelRef.value.remove()
        })

        return {
            show,
            rightPanelRef
        }
    }
})
</script>

<style lang="scss" scoped>
.showRightPanel {
    overflow: hidden;
    position: relative;
    width: calc(100% - 15px);
}
.rightPanel-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    background: rgba(0, 0, 0, 0.2);
    z-index: -1;
}

.rightPanel {
    width: 100%;
    max-width: 260px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 40000;
}

.show {
    transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

    .rightPanel-background {
        z-index: 20000;
        opacity: 1;
        width: 100%;
        height: 100%;
    }

    .rightPanel {
        transform: translate(0);
    }
}
</style>
