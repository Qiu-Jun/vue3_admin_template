import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';
import UnoCSS from 'unocss/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vueJsx from '@vitejs/plugin-vue-jsx';

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig(({ mode }) => {
  console.log(mode);
  console.log(loadEnv);
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      UnoCSS(),
      AutoImport({
        // 处理eslint 配置打开运行一次，生产后关闭
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

        dts: './src/dts/auto-imports.d.ts',
        resolvers: [ElementPlusResolver({})],
        imports: ['vue', 'vue-router'],
      }),
      Components({
        dts: './src/dts/components.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(pathSrc, 'assets/svgs')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      // 增加此行代码
      alias: {
        // 增加此行代码
        '@': path.resolve(__dirname, 'src'), // 增加此行代码
      }, // 增加此行代码
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //define global scss variable
        scss: {
          javascriptEnabled: true,
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `,
        },
      },
    },
  };
});
