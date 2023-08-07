<template>
  <div class="tags-container">
    <scroll-pane ref="scrollPaneRef" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="'tags-item ' + (isActive(tag) ? 'active' : '')"
        :data-path="tag.path"
        :to="{ path: tag.path, query: tag.query }"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openTagMenu(tag, $event)"
      >
        {{ tag.meta?.title }}
        <span
          v-if="!isAffix(tag)"
          class="tags-item-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <i-ep-close class="text-[10px]" />
        </span>
      </router-link>
    </scroll-pane>

    <!-- tag标签操作菜单 -->
    <ul
      v-show="tagMenuVisible"
      class="tag-menu"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        <SvgIcon name="refresh" />
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <SvgIcon name="close" />
        关闭
      </li>
      <li @click="closeOtherTags">
        <SvgIcon name="close_other" />
        关闭其它
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <SvgIcon name="close_left" />
        关闭左侧
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <SvgIcon name="close_right" />
        关闭右侧
      </li>
      <li @click="closeAllTags(selectedTag)">
        <SvgIcon name="close_all" />
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script name="TagsView" lang="ts" setup>
import { ComponentInternalInstance } from 'vue';
import { storeToRefs } from 'pinia';
import path from 'path-browserify';
import { useRoute, useRouter } from 'vue-router';
import ScrollPane from './ScrollPane.vue';
import { type TagView, useTagsViewStore } from '@/store';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
const route = useRoute();

const tagsViewStore = useTagsViewStore();
const { visitedViews } = storeToRefs(tagsViewStore);

const isActive = (tag: TagView) => tag.path === route.path;

const isAffix = (tag: TagView) => tag.meta && tag.meta.affix;

function handleScroll() {}
</script>
