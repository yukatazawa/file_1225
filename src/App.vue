<template>
  <div style="padding: 20px">
    <nav style="margin-bottom: 20px">
      <router-link to="/">検索画面</router-link>
      |
      <router-link to="/insert">登録画面</router-link>
      |
      <router-link to="/chat">チャット</router-link>
    </nav>

    <router-view />
  </div>
</template>
