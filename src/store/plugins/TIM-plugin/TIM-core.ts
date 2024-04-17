//TIM的核心功能

// 如果您已集成 v2.x 的 SDK，想升级到 V3 并且想尽可能地少改动项目代码，可以继续沿用 TIM
// import TIM from '@tencentcloud/chat';
import TencentCloudChat, { ChatSDK } from "@tencentcloud/chat";
import TIMUploadPlugin from "tim-upload-plugin";
import {
  ChatDefineStoreOptions,
  ITextPayload,
  TIMCoreLoginParams,
  TextMessageEvent,
  itemMessage,
} from "./type";

export default class TIMCore {
  public tim: ChatSDK | undefined;
  public userID = "";
  public conversationList = [];
  constructor(props: ChatDefineStoreOptions) {
    this.initTIMSdk(props.SDKAppID);
  }
  /**
   * @param SDKAppID appID
   */

  private initTIMSdk(SDKAppID: number) {
    let options = {
      SDKAppID, // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    };
    // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    let chat = TencentCloudChat.create(options); // SDK 实例通常用 chat 表示

    chat.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
    // chat.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
    // 注册腾讯云即时通信 IM 上传插件
    chat.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });
    this.tim = chat;
    this.persistedLogin();
  }
  private persistedLogin = () => {
    const timCoreLoginParams = JSON.parse(
      localStorage.getItem("TIMCoreLoginParams") || "{}"
    );
    console.log("重新登录");
    if (timCoreLoginParams.userID) {
      this.timLogin(timCoreLoginParams);
    }
    this.session(); //监听会话
  };
  public session() {}
  public timLogin = async (options: TIMCoreLoginParams) => {
    //登录sdk
    await this.tim?.login(options);
    localStorage.setItem("TIMCoreLoginParams", JSON.stringify(options));
    this.userID = options.userID;
    this.bindTIMEvent();
    console.log("登录成功!!!!!!!!!!!", options.userID);
    this.onSession();
  };
  public onConversationListUpdated(event: any) {}
  private onSession = () => {
    //监听会话函数
    this.tim?.on(
      TencentCloudChat.EVENT.CONVERSATION_LIST_UPDATED,
      this.onConversationListUpdated
    );
  };
  public timLoginOut = () => {
    this.unBindTIMEvent();
    this.tim?.logout();
    console.log("退出登录成功");
  };
  public unBindTIMEvent = () => {
    this.tim?.off(TencentCloudChat.EVENT.MESSAGE_RECEIVED, () => {});
    this.tim?.off(TencentCloudChat.EVENT.SDK_READY, () => {});
  };
  //绑定相关的监听事件
  private bindTIMEvent = () => {
    this.tim?.on(TencentCloudChat.EVENT.SDK_READY, this.handleSDKReady, this);
  };
  private handleSDKReady() {
    console.log("SDK,准备完成");
    this.onReady();
    this.tim?.on(
      TencentCloudChat.EVENT.MESSAGE_RECEIVED,
      this.handleMessageReceived,
      this
    );
  }
  public onReady() {}
  private handleMessageReceived(event: TextMessageEvent) {
    console.log("接收到一条消息", event);
    this.messageReceived(event);
  }
  public messageReceived = (event: TextMessageEvent) => {};
  //创建对应的消息类型
  private getMessageOptions = (userID: string, payload: ITextPayload) => {
    return this.tim?.createTextMessage({
      to: userID,
      conversationType: TencentCloudChat.TYPES.CONV_C2C,
      // 消息优先级，用于群聊。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息
      // priority: TencentCloudChat.TYPES.MSG_PRIORITY_NORMAL,
      payload,
      // 如果您发消息需要已读回执，需购买旗舰版套餐，并且创建消息时将 needReadReceipt 设置为 true
      needReadReceipt: true,
      // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到）
      // cloudCustomData: 'your cloud custom data'
    });
  };
  public sendMessage = async (userID: string, payload: ITextPayload) => {
    const messageOption = this.getMessageOptions(userID, payload);
    await this.tim?.sendMessage(messageOption!);
    console.log("发送成功", messageOption);
    this.preserveMessage(userID, {
      text: messageOption!.payload.text,
      direction: "out",
    });
  };
  public preserveMessage(userID: string, Message: itemMessage) {}
}
