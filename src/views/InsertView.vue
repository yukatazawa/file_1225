<template>
  <div>

    <h2>ナレッジ登録画面</h2>

    
    <div style="margin-bottom: 10px">
    
    <v-text-field
          v-model="form.Tag_ID"
          label="Tag_ID"
          outlined
          dense
    ></v-text-field>

    <v-text-field
          v-model="form.Tag_Name"
          label="Tag_Name"
          outlined
          dense
    ></v-text-field>

    <v-text-field
          v-model="form.Description"
          label="Description"
          outlined
          dense
    ></v-text-field>

      
    </div>

    

    
    <v-btn 
      @click="submit" 
      :disabled="loading" 
      color="primary" block>
      登録
    </v-btn>

    
    <div v-if="loading" style="margin-top: 10px">
      送信中...
    </div>

    
    <v-alert
          v-if="error"
          type="error"
          class="mb-3"
          density="compact"
          style="margin-top: 10px"
        >
          {{ error }}
    </v-alert>

    <!-- 結果表示 -->
    <v-alert
          v-if="success"
          type="success"
          class="mb-3"
          density="compact"
          style="margin-top: 10px"
        >
          Business_Tagに登録完了
    </v-alert>

    






  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()
const success = ref(false)

const loading = ref(false)
const result = ref(null)
const error = ref(null)


const form = ref({
  Tag_ID: '',
  Tag_Name: '',
  Description: ''
})


const submit = async () => {
  error.value = null
  result.value = null

  if (
    !form.value.Tag_ID ||
    !form.value.Tag_Name ||
    !form.value.Description
  ) {
    error.value = '未入力の項目があります'
    return
  }

  loading.value = true

  try {
    const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/INSERT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`)
    }

    const text = await res.text()
    try {
      result.value = JSON.parse(text)
    } catch {
      result.value = text
    }

    success.value = true

    setTimeout(() => {
      router.push('/')
    }, 5000)

    
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
