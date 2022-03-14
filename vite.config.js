import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // svg
import { createHtmlPlugin } from 'vite-plugin-html'

export default ({ mode }) => {
    const envData = loadEnv(mode, process.cwd())

    return defineConfig({
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            }),
            createSvgIconsPlugin({
                // 指定要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // 执行icon name的格式
                symbolId: 'icon-[dir]-[name]'
            }),
            createHtmlPlugin({
                minify: true,
                template: './index.html',
                inject: {
                    data: {
                        title: envData.VITE_APP_TITLE
                    }
                }
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve('src') // 设置 `@` 指向 `src` 目录
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // additionalData: '@import "./src/styles/index.scss";'
                }
            },
            loaderOptions: {
                sass: {
                    implementation: require('sass')
                }
            }
        },
        base: './' // 设置打包路径
        // server: {
        //   port: 4000, // 设置服务启动端口号
        //   open: true, // 设置服务启动时是否自动打开浏览器
        //   cors: true, // 允许跨域

        //   // 设置代理，根据我们项目实际情况配置
        //   proxy: {
        //     '/api': {
        //       target: 'http://127.0.0.1:7001',
        //       changeOrigin: true,
        //       secure: false,
        //       rewrite: (path) => path.replace('/api/', '/')
        //     }
        //   }
        // }
    })
}
