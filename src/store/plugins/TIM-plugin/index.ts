//首先我们需要在插件里完成IM SDK初始化
//插件有登录功能
//插件有收发功能
// 可以返回或者在pinia里注册tim实例

import { PiniaPluginContext } from "pinia";
import TIMCore from "./TIM-core";

export default function (context: PiniaPluginContext) {
  //如果有这个配置，说明该模块需要使用通过TIM
  if (context.options.TIMOptions) {
    const timCore = new TIMCore(context.options.TIMOptions());
    context.store.timCore = timCore; // 注意这里属性名的大小写
  }
}
