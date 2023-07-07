// 封装分类数据业务
import { onBeforeRouteUpdate } from 'vue-router';
import { getCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
// 获取路由参数
import { useRoute } from 'vue-router';


export function useCategory() {
  // 获取分类数据
  // categoryData是object对象，用{}接受
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => getCategory())

  // 目标：路由参数变化的时候，可以把分类数据重新发送
  onBeforeRouteUpdate((to) => {
    console.log('路由变化了')
    // 存在问题：使用最新的路由参数请求最新的分类数据，route.params.id数据滞后
    console.log(to)
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}