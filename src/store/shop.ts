import { defineStore } from "pinia";

interface IGoods {
  name: string;
  price: number;
  num?: number;
  select?: boolean;
}
export const useShopStore = defineStore("shop", {
  state() {
    return {
      goods: [
        {
          name: "羊肉串",
          price: 20,
        },
        {
          name: "猪肉串",
          price: 15,
        },
        {
          name: "鸡翅",
          price: 10,
        },
      ] as IGoods[],
      isAllSelect: false,
    };
  },
  getters: {
    total(): number {
      return this.goods
        .filter((item) => item.select)
        .reduce((total, item) => (total += item.price * (item.num || 1)), 0);
    },
  },
  actions: {
    updateNum(index: number, num: number) {
      this.goods[index].num = this.goods[index].num || 1;
      this.goods[index].num! += num;
    },
    allSelectChange() {
      this.goods.forEach((item) => {
        item.select = this.isAllSelect;
      });
    },
    singleChange() {
      this.isAllSelect = this.goods.every((item) => item.select);
    },
  },
});
