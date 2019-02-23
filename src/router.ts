import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import AuthGuard from '@/guards/auth.guard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '404',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      beforeEnter: (to, from, next) => {
        const usuario = firebase.auth().currentUser;
        if (usuario) {
          next('/');
        } else {
          next();
        }
      },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404.vue'),
    },
    {
      path: '/',
      component: () => import('./views/LayoutPrincipal.vue'),
      meta: {
        autorizado: true,
      },
      children: [
        {
          path: '/about',
          name: 'about',
          component: () => import('./views/About.vue'),
        },
        {
          path: '',
          name: 'home',
          component: () => import('./views/Home.vue'),
        },
      ],
    },
  ],
});

/* GUARDS */
new AuthGuard(router).generateGuard();

export default router;
