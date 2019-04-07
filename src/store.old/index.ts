import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import * as paletteSet from './PaletteSets';
import { FileDataStore } from '@/utils/user-data';
import { Tile, TileFileData } from '@/utils/tile';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    filestore : new FileDataStore({
      configName: 'user-data', defaults: {
        tiles: [new Tile({name: 'default store tile'})],
        paletteSets: [paletteSet.state.defaultPaletteSet],
      },
    }),
    modalOpen: false,
    modalComponent : '',
    modalProps : {},

    /** move to tile module */
   // tiles: fileStore.data.tiles.map( (tile: TileFileData ) =>  Tile.hydrate(tile) )
  },
  mutations: {
    setModalState(state, modalOpen) {
      state.modalOpen = modalOpen;
    },
    setModalComponent(state, component) {
      state.modalComponent = component;
    },
    setModalProps(state, modalProps) {
      state.modalProps = modalProps;
    },
  },
  actions: {
    setModalState({commit}, modalOpen) {
      commit('setModalState', modalOpen);
    },
    setModalComponent({commit}, component) {
      commit('setModalComponent', component);
    },
    setModalProps({commit}, ModalProps) {
      commit('setModalProps', ModalProps);
    },
  },
  modules : {
    paletteSet,
  },
};

export default new Vuex.Store<RootState>(store);




