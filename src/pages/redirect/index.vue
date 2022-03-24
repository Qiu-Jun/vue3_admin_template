<!--
 * :Author: June
 * :Date: 2022-03-24 16:40:17
 * :LastEditTime: 2022-03-24 17:35:53
 * :Description:
-->

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()
        const { params, query } = route
        const { path } = params

        router.replace({
            path: `/${path}`,
            query
        })
    }
})
</script>
