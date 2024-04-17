//引入pinia创建的方法
import { createPinia } from "pinia";
import { prisistedState } from "./plugins/persistedState";
import TIMPlugin from './plugins/TIM-plugin'
//创建pinia，并且返回pinia实例
const pinia = createPinia();
pinia.use(prisistedState);
pinia.use(TIMPlugin)
//导出pinia
export default pinia;
