import { PiniaPluginContext } from "pinia";

export function prisistedState(context: PiniaPluginContext) {
  //每次初始化都会执行，有几个模块执行官几次
  // console.log("初始化", context.store.timCore.userID);
  //根据模块名，拿到localstorage
  // const currentStat = JSON.parse(
  //   localStorage.getItem(context.store.timCore.userID) || "{}"
  // );
  //把取出来的数据放到模块里
  // if (currentStat) {
  //   context.store.$patch(currentStat);
  // }
  // 每次state发生变化时，都把他保存到localstorage里
  //第一个是修改store的上下文
  //第二个是当前修改的状态
  // context.store.$subscribe(
  //   (_store, state) => {
  //     console.log(_store);
  //     console.log(state);
  //     //存到localStorage
  //     localStorage.setItem(_store.storeId, JSON.stringify(state));
  //   },
  //   {
  //     detached: true,
  //   }
  // );
}
