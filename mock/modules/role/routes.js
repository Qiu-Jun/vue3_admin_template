const asyncRoutes = [
    {
        path: '/permission',
        component: 'layout/Layout',
        redirect: '/permission/index',
        alwaysShow: true,
        meta: {
            title: 'Permission',
            icon: 'lock',
            roles: ['admin', 'editor']
        },
        children: [
            {
                path: 'page',
                component: 'views/permission/page',
                name: 'PagePermission',
                meta: {
                    title: 'Page Permission',
                    roles: ['admin']
                }
            },
            {
                path: 'directive',
                component: 'views/permission/directive',
                name: 'DirectivePermission',
                meta: {
                    title: 'Directive Permission'
                }
            },
            {
                path: 'role',
                component: 'views/permission/role',
                name: 'RolePermission',
                meta: {
                    title: 'Role Permission',
                    roles: ['admin']
                }
            }
        ]
    },

    {
        path: '/charts',
        component: 'layout/Layout',
        redirect: 'noRedirect',
        name: 'Charts',
        meta: {
            title: 'Charts',
            icon: 'chart'
        },
        children: [
            {
                path: 'keyboard',
                component: 'views/charts/keyboard',
                name: 'KeyboardChart',
                meta: { title: 'Keyboard Chart', noCache: true }
            },
            {
                path: 'line',
                component: 'views/charts/line',
                name: 'LineChart',
                meta: { title: 'Line Chart', noCache: true }
            },
            {
                path: 'mixchart',
                component: 'views/charts/mixChart',
                name: 'MixChart',
                meta: { title: 'Mix Chart', noCache: true }
            }
        ]
    }
    // { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
    asyncRoutes
}
