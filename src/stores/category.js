import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

// useCategoryStore可使用
export const useCategoryStore = defineStore('category', () => {
  // 导航列表的数据管理 /发送请求获取数据列表
  // state导航列表数据
  const categoryList = ref(0)

  // action获取导航数据的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }

  return {
    categoryList,
    getCategory
  }
})
