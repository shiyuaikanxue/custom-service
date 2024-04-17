<template>
  <div class="shop">购物车</div>
  <div>
    全选
    <input
      v-model="shopStore.isAllSelect"
      type="checkbox"
      @change="allSelectChange"
    />
  </div>
  <div>
    <div v-for="(item, index) in shopStore.goods" :key="index">
      <input
        @change="singleChange"
        v-model="item.select"
        type="checkbox"
        name=""
        id=""
      />商品名：{{ item.name }} --- 商品价格： {{ item.price }} ---
      <button @click="updateNum(index, 1)">+</button> {{ item.num || 1 }}
      <button @click="updateNum(index, -1)" :disabled="item.num == 0">-</button>
      小计：{{ item.price * (item.num || 1) }}
    </div>
  </div>
  <div>总价:{{ shopStore.total }}</div>
  <button @click="userStore.age++">age+1</button>
  <div>{{userStore.age}}</div>
</template>
<script setup lang="ts">
import { useShopStore } from "./store/shop";
import {useUserStore} from './store/user'
const shopStore = useShopStore();
const userStore = useUserStore()
const updateNum = (index: number, num: number) => {
  shopStore.updateNum(index, num);
};
const allSelectChange = () => {
  shopStore.allSelectChange();
};
const singleChange = () => {
  shopStore.singleChange();
};
</script>
