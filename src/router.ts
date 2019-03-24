import Vue from 'vue';
import Router from 'vue-router';
import Library from './views/Library.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'library',
      component: Library,
    },
    {
      path: '/tiles',
      name: 'tiles',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Tiles.vue'),
    },
    {
      path: '/palettes',
      name: 'palettes',
      component: () =>
        import(/* webpackChunkName: "palettes" */ './views/Palettes.vue'),
    },
    {
      path: '/palette/:id',
      name: 'palette',
      component: () =>
        import(/* webpackChunkName: "palette" */ './views/Palette.vue'),
      props: true,
    },
  ],
});
