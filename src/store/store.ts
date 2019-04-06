import Vue, { Component } from 'vue';
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
});

export type State = {
  filestore: FileDataStore;
  modalOpen: boolean;
  modalComponent: string;
  modalProps: any;
};
