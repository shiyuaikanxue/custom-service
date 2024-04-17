import { defineStore } from "pinia";
import {
  Conversation,
  TextMessageEvent,
  itemMessage,
  itemMessageUser,
} from "./plugins/TIM-plugin/type";
import { message } from "ant-design-vue";

export const useTIMStore = defineStore("chat", {
  state() {
    return {
      userID: "" as string,
      list: [] as Conversation[],
      select: [] as string[],
      messages: [] as itemMessageUser[],
    };
  },
  getters: {
    getMessageText(): itemMessage[] {
      let temp = [] as itemMessage[];
      this.messages.map((item) => {
        if (item.userID == this.select[0]) {
          temp = item.itemMessage;
        }
      });
      return temp;
    },
  },
  actions: {
    /**
     * 订阅接收功能
     * @param event
     */
    subscribeMessage(event: TextMessageEvent) {
      console.log("接收消息,保存消息", event);
    },
    async getSessionList() {
      console.log("获取会话列表");
      const data = await this.timCore.tim?.getConversationList();
      console.log("绘画列表", data);
    },
  },
  TIMOptions() {
    return {
      SDKAppID: 1600032339,
    };
  },
});
