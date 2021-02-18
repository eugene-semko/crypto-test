import { createRouter, createWebHistory } from 'vue-router'
import Convert from '@/components/Convert.vue'
import Bag from '@/components/Bag.vue'
const routes = [
  {
    path: '/',
    name: 'Convert',
    component: Convert,
    props:true
  },
  {
    path: '/bag',
    name:'Bag',
    component: Bag,
    props:true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
