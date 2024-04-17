import TIMCore from "./store/plugins/TIM-plugin/TIM-core";
import { ChatDefineStoreOptions } from "./store/plugins/TIM-plugin/type";
import "pinia";
declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    TIMOptions?: () => ChatDefineStoreOptions;
  }
  export interface PiniaCustomProperties {
    timCore: TIMCore; // 注意这里属性名的大小写  
  }
}
