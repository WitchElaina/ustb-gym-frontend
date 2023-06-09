import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/gateway/login',
    },
    {
      path: '/gateway',
      name: 'gateway',
      component: () => import('../views/GatewayView.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
          meta: {
            enterClass: 'animate__animated animate__fadeInLeft',
            leaveClass: 'animate__animated animate__fadeOutRight',
          },
        },

        {
          path: 'register',
          name: 'register',
          component: () => import('../views/RegisterView.vue'),
          meta: {
            enterClass: 'animate__animated animate__fadeInRight',
            leaveClass: 'animate__animated animate__fadeOutLeft',
          },
        },
      ],
    },
    {
      path: '/user/:username',
      name: 'user',
      component: () => import('../views/UserHomeView.vue'),
      props: true,
      children: [
        {
          path: 'reservation',
          name: 'reservation',
          component: () => import('../views/UserReservationView.vue'),
        },
        {
          path: 'adminreservation',
          name: 'adminreservation',
          component: () => import('../views/AdminReservationView.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/UserOrderView.vue'),
        },
        {
          path: 'manage',
          name: 'manage',
          component: () => import('../views/ManageView.vue'),
        },
        {
          path: 'manage/cdkey',
          name: 'cdkey',
          component: () => import('../views/CDKeyView.vue'),
        },
        {
          path: 'manage/dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'manage/usermanage',
          name: 'usermanage',
          component: () => import('../views/ManageUserView.vue'),
        },
        {
          path: 'manage/customtimeorder',
          name: 'customtimeorder',
          component: () => import('../views/CustomTimeOrderView.vue'),
        },
      ],
    },
  ],
});

export default router;
