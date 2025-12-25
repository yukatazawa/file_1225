<template>
  <div>

    <h2>チャット画面</h2>
    <v-container class="pb-16 px-4 pt-4" style="min-height: 100vh;">
    
    <div
          v-for="(m, i) in chatStore.messages"
          :key="i"
          class="mb-2 d-flex"
          :class="{'justify-end': m.role === 'user', 'justify-start': m.role === 'bot'}"
        >
        <v-sheet
            :class="[m.role === 'user' ? 'bg-indigo-lighten-5' : 'bg-grey-lighten-3', 'pa-3', 'rounded-lg']"
            elevation="1"
            max-width="60%"
          ><div class="text-pre-line">{{ m.text }}</div>
          </v-sheet>
        </div>
    </v-container>


      <div class="chat-input-bar">
      <v-container class="pa-2">
      <v-row no-gutters>
      <v-col cols="10">
      <v-textarea
                v-model="message"
                placeholder="メッセージを入力..."
                auto-grow
                rows="1"
                variant="outlined"
                hide-details
                rounded
              ></v-textarea>
      </v-col>
      <v-col cols="2" class="pl-2">
              <v-btn class="mt-2" @click="sendMessage" color="red">
      送信</v-btn>
      </v-col>
      </v-row>
      </v-container>
      </div>
 </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useChatStore } from '@/stores/chatStore'

const message = ref('')
const chatStore = useChatStore()

const sendMessage = async () => {
  const trimmed = message.value.trim()
  if (!trimmed) return

  
  chatStore.addMessage({
    role: 'user',
    text: trimmed
  })

  message.value = ''

  try {
    const response = await axios.post(
      'https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/chat',
      {
        message: trimmed
      }
    )

    
    const contentText =
      typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data)

    chatStore.addMessage({
      role: 'bot',
      text: contentText
    })

  } catch (error) {
    console.error('APIエラー:', error)
    chatStore.addMessage({
      role: 'bot',
      text: 'APIエラーが発生しました。'
    })
  }
}
</script>


<style scoped>
html, body {
  height: 100%;
  margin: 0;
  background-color: #fff;
}

#app {
  height: 100%;
}

.chat-input-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style >


