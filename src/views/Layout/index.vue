<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';

// 触发获取导航列表的action
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted } from 'vue';
// 重写useCategoryStore函数
const categoryStore=useCategoryStore()

onMounted(()=>categoryStore.getCategory())
</script>

<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav />
  <LayoutHeader />
  <!-- 二级路由出口 -->
  <!-- 添加key，破坏复用机制，强制销毁重建 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <RouterView></RouterView>
  <LayoutFooter />
</template>@/stores/categoryStore