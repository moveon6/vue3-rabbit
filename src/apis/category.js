import request from '@/utils/http'

/**
 * @description: 获取分类数据
 * @param {*} id 分类id 
 * @return {*}
 */
export function getCategoryAPI(id) {
  return request({
    url: '/category',
    params: {
      id
    }
  })
}

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */

export function getCategoryFilterAPI(id) {
  return request({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

