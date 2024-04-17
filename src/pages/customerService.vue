<template>
  <div class="chat-box">
    <a-card class="chat-card"
      ><a-menu
        class="contact-list"
        v-model:selectedKeys="TIMStore.select"
        mode="inline"
        @click="handleClick"
      >
        <a-menu-item
          v-for="item in TIMStore.list"
          :key="item.userProfile?.userID"
        >
          {{ item.userProfile?.userID }}
        </a-menu-item>
      </a-menu>
      <div class="chat-content">
        <div class="chat-message">
          <div
            class="chat-item"
            :class="{ 'chat-item-out': item.direction == 'out' }"
            v-for="item in TIMStore.getMessageText"
            :key="item.text"
          >
            <div class="chat-item-content">
              <div></div>
              {{ item.text }}
              <div></div>
            </div>
          </div>
        </div>
        <a-textarea
          v-model:value="chatMessage"
          class="chat-content"
          placeholder="回车发送消息:"
          @pressEnter="sendMsg"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import TencentCloudChat, { ChatSDK, Profile } from "@tencentcloud/chat";
import { reactive, ref, watch, VueElement, h, onMounted } from "vue";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { MenuProps, ItemType, message } from "ant-design-vue";
import { useTIMStore } from "../store/chat";
import { Conversation, itemMessage } from "../store/plugins/TIM-plugin/type";
const chatMessage = ref("");
const selectedKeys = ref<string[]>(["1"]);
const openKeys = ref<string[]>(["sub1"]);
const TIMStore = useTIMStore();
// const list = ref<Conversation[]>([]);
// const select = ref<string[]>([]);
const sendMsg = () => {
  console.log(chatMessage.value);
  TIMStore.timCore.sendMessage("admin", {
    text: chatMessage.value,
  });
  chatMessage.value = "";
};
function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: "group"
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}
onMounted(() => {
  // TIMStore.getSessionList();
  //点击客服界面开始监听会话
});
TIMStore.timCore.onConversationListUpdated = (event: any) => {
  console.log("包含 Conversation 实例的数组", event.data); // 包含 Conversation 实例的数组
  TIMStore.list = event.data;
  console.log("包含 Conversation 实例的数组:list", TIMStore.list);
  if (TIMStore.list.length == 0 && TIMStore.timCore.userID != "admin") {
    TIMStore.list.push({
      lastMessage: {
        payload: {
          text: "",
        },
      },
      userProfile: {
        userID: "admin",
      } as Profile,
    });
  }
  console.log(TIMStore.messages);
  const userId = TIMStore.list[0].userProfile?.userID;
  if (userId) {
    TIMStore.select = [userId];
  }
  console.log(TIMStore.select);
  console.log(TIMStore.getMessageText);
};
const items: ItemType[] = reactive([getItem("Navigation One", "sub1")]);
TIMStore.timCore.onReady = () => {
  // TIMStore.getSessionList();
};
const handleClick: MenuProps["onClick"] = (e) => {
  console.log(TIMStore.timCore.conversationList);
  console.log("click", e);
};

watch(openKeys, (val) => {
  console.log("openKeys", val);
});

// 重写发送消息完成后保存消息函数
TIMStore.timCore.preserveMessage = (userID: string, Message: itemMessage) => {
  console.log("处理前的信息", userID, Message);
  console.log(TIMStore.messages);
  TIMStore.messages.forEach((item) => {
    if (item.userID == userID) {
      item.itemMessage.push(Message);
    }
  });
  console.log("处理后的消息", TIMStore.messages);
};
</script>
<style scoped lang="scss">
.chat-item {
  display: flex;
  .chat-item-content {
    position: relative;
    padding: 10px 6px;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 5px;
    word-break: break-all;
    background-color: skyblue;
    color: white;
  }
}
.chat-item-out {
  justify-content: flex-end;
  .chat-item-content {
    margin-right: 10px;
  }
}
.chat-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  :deep(.ant-card-body) {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
.chat-card {
  width: 100%;
  height: 100%;
}
.contact-list {
  width: 300px;
  height: 100%;
  border: 1px solid #f0f0f0;
  margin-right: 20px;
}
.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  .chat-message {
    flex: 1;
    padding: 20px 0;
    overflow-y: scroll;
  }
  .chat-content {
    border-radius: 5px;
  }
}
.triangle,
.triangle_two {
  position: absolute;
  top: 15px;
  border-width: 10px;
  border-style: solid;
}
.fill_two {
  position: absolute;
  top: 15px;
  border-width: 10px;
  border-style: solid;
}
</style>
