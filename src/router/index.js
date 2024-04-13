import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue';
import ProfileView from '../views/ProfileView.vue';
import OverviewView from '../views/OverviewView.vue';
import ProductCustomizationView from '../views/ProductCustomizationView.vue';
import ProductDetailsView from '../views/ProductDetailsView.vue';
import SalesView from '../views/SalesView.vue';
import CertificationView from '../views/CertificationView.vue';
import StockView from '../views/StockView.vue';
import StoreView from '../views/StoreView.vue';
import MeterView from '../views/MeterView.vue';
import RefundView from '../views/RefundView.vue';
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found',
    component: NotFoundView  
  },
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
    path: '/inventory/customization',
    name: 'customization',
    component: ProductCustomizationView  
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
    path: '/meter',
    name: 'meter',
    component: MeterView  
  },
  {
    path: '/refund',
    name: 'refund',
    component: RefundView  
  },
  {
    path: '/inventory/product_details',
    name: 'productDetails',
    component: ProductDetailsView,
    props: (route) => ({ id: route.query.id })
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
