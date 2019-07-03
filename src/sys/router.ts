import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/list'
    },
    {
      path: '/list',
      component: () => import( '../views/IpoList/listTab.vue'),
      children: [
        {
          path: 'hk',
          component: () => import('../views/IpoList/hkList.vue'),
        },
        {
          path: 'hs',
          component: () => import('../views/IpoList/hsList.vue'),
        },
        {
          path: 'us',
          component: () => import('../views/IpoList/usList.vue')
        },
        {
          path: '',
          redirect: 'hk'
        }
      ]
    },
    {
      path: '/ipoMaterials',
      component: () => import('../views/Materials/ipoMaterials.vue')
    }
  ]
});
