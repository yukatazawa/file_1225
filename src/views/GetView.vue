<template>
  <div>

    <h2>ナレッジ検索アプリ</h2>

    <!-- ドロップダウン -->
    <v-select
      v-model="selectedApi"
      :items="apiList"
      item-title="label"
      item-value="key"
      label="DBを選択してください"
      clearable
      />

    
    <v-btn 
      color="red" 
      variant="flat" 
      elevation="4"
      @click="fetchApi"
      :disabled="!selectedApi"
    >
      選択
    </v-btn>

    
    <div v-if="loading" style="margin-top: 20px">
      読み込み中...
    </div>

   
    
    <JsonViewer
    v-if="!loading && store.getResult.length > 0"
    :value="store.getResult"
    />

  <div v-if="!loading && store.getResult.length === 0">
    データがありません
  </div>
 </div>
</template>
 

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import JsonViewer from '@/components/JsonViewer.vue'

const store = useAppStore()
const selectedApi = ref(null)

const loading = ref(false)

const apiList = [
  { key: 'api1', label: 'Business_Tag' },
  { key: 'api2', label: 'Billing_History' },
  { key: 'api3', label: 'Call_Log' },
  { key: 'api4', label: 'Claim_Master' },
  { key: 'api5', label: 'Customer_Profile' },
  { key: 'api6', label: 'Data_Catalog' },
  { key: 'api7', label: 'Data_Owner' },
  { key: 'api8', label: 'Policy_Master' },
  { key: 'api9', label: 'Product_Master' },
  { key: 'api10', label: 'Risk_Assessment' },
  { key: 'api11', label: 'Sales_Performance' },
  { key: 'api12', label: 'Usage_History' }
]

const apiMap = {
  api1: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_BusinessTag')
  return await res.json()
},
  api2: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_BillingHistory')
  return await res.json()
},
  api3: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_CallLog')
  return await res.json()
},
  api4: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_ClaimMaster')
  return await res.json()
},
  api5: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_CustomerProfile')
  return await res.json()
},
  api6: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_DataCatalog')
  return await res.json()
},
  api7: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_DataOwner')
  return await res.json()
},
  api8: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_PolicyMaster')
  return await res.json()
},
  api9: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_ProductMaster')
  return await res.json()
},
  api10: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_RiskAssessment')
  return await res.json()
},
  api11: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_SalesPerformance')
  return await res.json()
},
  api12: async () => {
  const res = await fetch('https://m3h-tazawa-containerapp1225.nicefield-f36e8029.japaneast.azurecontainerapps.io/api/SELECT_UsageHistory')
  return await res.json()
}
}


const fetchApi = async () => {
  if (!selectedApi.value) return

  loading.value = true

  try {
    const apiFunc = apiMap[selectedApi.value]
    const res = await apiFunc()

  
    store.setGetResult(
      Array.isArray(res.List) ? res.List : []
    )
  } catch (e) {
    console.error(e)
    store.setGetResult([
      { error: '取得失敗', detail: String(e) }
    ])
  } finally {
    loading.value = false
  }
}

</script>
