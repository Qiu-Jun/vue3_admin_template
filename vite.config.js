/*
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-29 23:50:12
 * :Description:
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // svg
import { createHtmlPlugin } from 'vite-plugin-html'
import autoprefixer from 'autoprefixer'
import viteCompression from 'vite-plugin-compression'

export default ({ mode }) => {
    const envData = loadEnv(mode, process.cwd())

    return defineConfig({
        base: './', // 设置打包路径
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
            }),
            // gzip压缩 生产环境生成 .gz 文件
            viteCompression({
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: 'gzip',
                ext: '.gz'
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
            },
            postcss: {
                plugins: [autoprefixer()]
            }
        },
        server: {
            open: true

            // // 设置代理，根据我们项目实际情况配置
            // proxy: {
            //     '/api': {
            //         target: 'http://127.0.0.1:7001',
            //         changeOrigin: true,
            //         secure: false,
            //         rewrite: (path) => path.replace('/api/', '/')
            //     }
            // }
        },
        build: {
            // 去除 console debugger
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        }
    })
}
