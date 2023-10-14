/*
 * @Author: June
 * @Description:
 * @Date: 2023-10-14 13:34:39
 * @LastEditors: June
 * @LastEditTime: 2023-10-14 15:44:40
 */
import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    { 'wh-full': 'w-full h-full' },
    { 'f-center': 'flex justify-center items-center' },
  ],
});
