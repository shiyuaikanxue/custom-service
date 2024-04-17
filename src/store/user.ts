//引入定义store的方法
import { defineStore } from "pinia";
// pinia中使用defineStore方法来定义store
//第一个参数是应用程序中的store的唯一id，也可以理解为模块名
//第二个参数是一个对象，store的配置项，比如配置store内的数据state
export const useUserStore = defineStore("user", {
  /* 
    当以当前模块的状态,state是一个函数，必须有返回值，返回值就是这个模块的状态，同理data
    pinia可以完整的推断处state的类型
  */
  state() {
    return {
      name: "ZhangSan",
      age: 18,
    };
  },
  getters: {
    //同computed
    //如果要在getter中调用其他计算属性，就不可以使用箭头函数,并且需要自己定义返回值类型
    doubleAge: function (state) {
      return state.age * 2;
    },
    getNameAndAge: function (state): string {
      return state.name + "--" + this.doubleAge;
    },
    //计算属性传递参数,返回一个方法，这个方法会接收一个参数，这个参数就页面传过来的参数
    getAddAge() {
      return (num: number) => this.age + num;
    },
  },
  //存放当前模块的相关方法
  //既可以是同步也可以是异步
  actions: {
    saveName(name: string) {
      this.name = name;
    },
  },
});
