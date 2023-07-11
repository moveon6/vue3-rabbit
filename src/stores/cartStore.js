// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// 导入用户的store
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  // 判断是否登录，如果是，进行接口购物车操作
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 1.定义state-cartList
  const cartList = ref([])
  // 2.定义action-addCart
  const addCart = async (goods) => {
    // 解构参数
    const { skuId, count } = goods
    if (isLogin.value) {
      // 登录之后加入购物车逻辑
      //1. 调用加入购物车接口
      await insertCartAPI({ skuId, count })
      // 2. 调用获取购物车列表接口
      const res = await findNewCartListAPI()
      // 3. 用接口购物车列表覆盖本地购物车列表
      cartList.value = res.result
    } else {
      // 本地购物车逻辑
      // 添加购物车操作
      // 已经添加过-count+1
      // 没有添加过-直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count++
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
  }
  // 删除购物车
  const delCart = (skuId) => {
    // 1.找到删除项的下标值-splice
    // 2.使用数组的过滤方法-filter
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }
  // 计算属性
  // 1. 总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2. 总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  // 3.已选择数量,filter获得的是数值
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 4.已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的那一项，然后把它的selected修改为传过去的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  // 全选功能
  const allCheck = (selected) => {
    //把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice
  }
}, {
  // pinia数据持久化，本地缓存
  persist: true,
})