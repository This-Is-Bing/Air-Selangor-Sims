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
    name: 'Dashboard',
    component: DashboardView  
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView  
  },
  {
    path: '/inventory/overview',
    name: 'Overview',
    component: OverviewView  
  },
  {
    path: '/inventory/sales',
    name: 'Sales',
    component: SalesView  
  },
  {
    path: '/inventory/certification',
    name: 'Certification',
    component: CertificationView  
  },
  {
    path: '/inventory/stock',
    name: 'Stock',
    component: StockView  
  },
  {
    path: '/inventory/store',
    name: 'Store',
    component: StoreView  
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
