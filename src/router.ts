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
      path: '/palettes',
      name: 'palettes',
      component: () =>
        import(/* webpackChunkName: "palettes" */ './views/Palettes.vue'),
    },
    {
      path: '/paletteSets',
      name: 'paletteSets',
      component: () =>
        import(/* webpackChunkName: "paletteSets" */ './views/PaletteSets.vue'),
    },
    {
      path: '/paletteSet/:id/palette/:index',
      name: 'palette',
      component: () =>
        import(/* webpackChunkName: "palette" */ './views/Palette.vue'),
      props: true,
    },
    {
      path: '/paletteSet/:id',
      name: 'paletteSet',
      component: () =>
        import(/* webpackChunkName: "paletteSet" */ './views/PaletteSet.vue'),
      props: true,
    },
    {
      path: '/tiles',
      name: 'tiles',
      component: () =>
        import(/* webpackChunkName: "paletteSet" */ './views/Tiles.vue'),
      props: true,
    },
    {
      path: '/tile/:id',
      name: 'tile',
      component: () =>
        import(/* webpackChunkName: "paletteSet" */ './views/Tile.vue'),
      props: true,
    },
  ],
});
