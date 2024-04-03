import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue';
import ProfileView from '../views/ProfileView.vue';
import OverviewView from '../views/OverviewView.vue';
import SalesView from '../views/SalesView.vue';
import CertificationView from '../views/CertificationView.vue';
import StockView from '../views/StockView.vue';
import StoreView from '../views/StoreView.vue';
import PartnerView from '../views/PartnerView.vue';
import RefundView from '../views/RefundView.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView  
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView  
  },
  {
    path: '/inventory/overview',
    name: 'overview',
    component: OverviewView  
  },
  {
    path: '/inventory/sales',
    name: 'sales',
    component: SalesView  
  },
  {
    path: '/inventory/certification',
    name: 'certification',
    component: CertificationView  
  },
  {
    path: '/inventory/stock',
    name: 'stock',
    component: StockView  
  },
  {
    path: '/inventory/store',
    name: 'store',
    component: StoreView  
  },
  {
    path: '/partner',
    name: 'partner',
    component: PartnerView  
  },
  {
    path: '/refund',
    name: 'refund',
    component: RefundView  
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
