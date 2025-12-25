<template>
  <div>
    <v-data-table
      v-if="items.length > 0"
      :headers="headers"
      :items="items"
      density="compact"
      class="elevation-1"
    />

    <div v-else class="text-center mt-4">
      データがありません
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Array,
    required: true
  }
})


const headers = computed(() => {
  if (props.value.length === 0) return []

  const columnSet = new Set()

  props.value.forEach(row => {
    if (row && typeof row === 'object') {
      Object.keys(row).forEach(key => columnSet.add(key))
    }
  })

  return Array.from(columnSet).map(key => ({
    text: key,
    value: key
  }))
})


const items = computed(() => {
  return props.value.map(row => {
    const record = {}
    headers.value.forEach(h => {
      const val = row[h.value]
      record[h.value] =
        val === null || val === undefined ? '' : String(val)
    })
    return record
  })
})
</script>

<style scoped>
.v-data-table {
  font-size: 14px;
}

td {
  word-break: break-all;
}
</style>
