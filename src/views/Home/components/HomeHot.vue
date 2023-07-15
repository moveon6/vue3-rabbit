<script setup>
import HomePanel from './HomePanel.vue';
import { findHotAPI } from '@/apis/home';
import { onMounted, ref } from 'vue';

// 获取数据
const hotList = ref([])
const getHotList = async () => {
  const res = await findHotAPI()
  hotList.value = res.result
}

onMounted(() => getHotList())
</script>

<template>
  <home-panel title="人气好物" sub-title="人气好物 好多商品">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" :src="item.picture" alt="">
          <p class="name">{{ item.title }}</p>
          <p class="price">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </home-panel>
  <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.title }}</p>
        <p class="price">&yen;{{  item.alt  }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      // text-overflow: ellipsis;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>