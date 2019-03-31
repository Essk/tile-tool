import Vue from 'vue';
import Vuex from 'vuex';

import * as paletteSet from './modules/paletteSet';
import { FileDataStore } from '@/utils/user-data';
import { Tile, TileFileData } from '@/utils/tile';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileStore : new FileDataStore({
      configName: 'user-data', defaults: {
        tiles: [new Tile({name: 'default store tile'})],
        paletteSets: [paletteSet.state.defaultPaletteSet],
      },
    }),

    /** move to tile module */
   // tiles: fileStore.data.tiles.map( (tile: TileFileData ) =>  Tile.hydrate(tile) )
  },
  mutations: {

  },
  actions: {

  },
  modules : {
    paletteSet,
  },
});
