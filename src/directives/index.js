// 导入
import { useIntersectionObserver } from '@vueuse/core'
// 定义全局指令
export const lazyPlugin = {
  install(app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el：指令绑定的那个元素img
        // binding：binding.value指令等于号后面绑定的表达式的值 图片url
        // console.log(el, binding.value)
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }], observerElement) => {
            // isIntersecting布尔值
            // console.log(isIntersecting)
            if (isIntersecting) {
              // 进入视口区域
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}