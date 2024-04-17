<template>
  <a-layout class="layout-box" id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">客服平台</div>
      <a-menu
        @click="linkPage"
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="/home">
          <user-outlined />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="/customerService">
          <video-camera-outlined />
          <span>客服</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        class="layout-header"
        style="background: #fff; padding: 0"
      >
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <a-button type="link" @click="loginOut">退出登录</a-button>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { useTIMStore } from "../store/chat";
import { TextMessageEvent } from "../store/plugins/TIM-plugin/type";
const selectedKeys = ref<string[]>(["1"]);
const collapsed = ref<boolean>(false);
const router = useRouter();
const TIMStore = useTIMStore();

TIMStore.timCore.messageReceived = (event: TextMessageEventF) => {
  TIMStore.subscribeMessage(event);
};

const loginOut = () => {
  TIMStore.timCore.timLoginOut();
  router.push("/login");
};
const linkPage = ({
  item,
  key,
  keyPath,
}: {
  item: string;
  key: string;
  keyPath: string;
}) => {
  router.push(key);
};
</script>
<style scoped>
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.layout-box {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bolder;
  color: white;
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
