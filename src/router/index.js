import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue';
import ProfileView from '../views/ProfileView.vue';
import InventoryView from '../views/InventoryView.vue';
import PartnerView from '../views/PartnerView.vue';
import RefundView from '../views/RefundView.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView  
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView  
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: InventoryView  
  },
  {
    path: '/partner',
    name: 'Partner',
    component: PartnerView  
  },
  {
    path: '/refund',
    name: 'Refund',
    component: RefundView  
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
