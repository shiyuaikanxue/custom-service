<template>
  <div class="login-box">
    <a-card style="width: 300px">
      <h2 class="title">客服平台</h2>
      <a-form
        name="basic"
        :model="formState"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="login"
      >
        <a-form-item
          label="用户名:"
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { genTestUserSig } from "./../../debug";
import { useTIMStore } from "./../store/chat";
const router = useRouter();
const TIMStore = useTIMStore();
const formState = reactive({
  username: "",
  password: "",
});
const login = () => {
  router.push("/home");
  const { userSig } = genTestUserSig({
    userID: formState.username,
    SDKAppID: 1600032339,
    secretKey:
      "3b536063c926a1f172d396555d866e3b838c45c7183e9ccfee32338de7a9df3f",
  });
  TIMStore.timCore.timLogin({
    userSig,
    userID: formState.username,
  });
};
</script>
<style>
.title {
  text-align: center;
  margin-bottom: 20px;
}
.login-box {
  background-color: #2f3447;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

function reactive(arg0: {}) { throw new Error("Function not implemented."); }
function reactive(arg0: {}) { throw new Error("Function not implemented."); }
