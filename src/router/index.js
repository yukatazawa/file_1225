import { createRouter, createWebHistory } from 'vue-router'
import GetView from '@/views/GetView.vue'
import InsertView from '@/views/InsertView.vue'
import ChatViews2 from '@/views/ChatViews2.vue'
const routes = [
  {
    path: '/',
    name: 'get',
    component: GetView
  },
  {
    path: '/insert',
    name: 'insert',
    component: InsertView
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatViews2
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router




