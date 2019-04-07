/* tslint:disable: no-shadowed-variable */
import debounce from 'lodash/debounce';
import { PaletteSet, PaletteSetFileData } from '@/utils/paletteSet';
import { PSState } from './types';
import { RootState } from '../types';
import { Palette } from '@/utils/palette';

import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';

type PSGetter = GetterTree<PSState, any>;

export const state: PSState = {
    paletteSets : [],
    defaultPaletteSet: new PaletteSet({ name: 'new palette set', palettes: [ new Palette({}) ] }),
    paletteSet : new PaletteSet({ name: 'new palette set', palettes: [ new Palette({}) ] }),
};

export const getters: PSGetter = {
    paletteSets: (state) => state.paletteSets,
    paletteSetById: (state) => (id: string) => state.paletteSets.find( (ps) => ps.id === id ),
    paletteSetIndexById: (state) => (id: string) => state.paletteSets.findIndex( (ps) => ps.id === id ),
    paletteIndexById: (state) => (id: string) => state.paletteSet.palettes.findIndex( (palette) => palette.id === id ),
  };

export const mutations: MutationTree<PSState>  = {
    update(state, paletteSets) {
        state.paletteSets.splice(0, state.paletteSets.length, ...paletteSets);
    },
    currentPS(state, paletteSet) {
        state.paletteSet = paletteSet;
    },
    addPalette(state, palette) {
        state.paletteSet.addPalette(palette);
    },
    deletePaletteByIndex(state, index) {
        state.paletteSet.removePaletteByIndex(index);
    },
    setByIndex(state, {idx, paletteSet}) {
        state.paletteSets.splice(idx, 1, paletteSet);
    },
    setName(state, {idx, name}) {
        state.paletteSets[idx].name = name;
    },
};

export const actions: ActionTree<PSState, any> = {
    init({ commit, rootState }) {
        const paletteSets = rootState.filestore.data.paletteSets
        .map( (paletteSet: PaletteSetFileData ) =>  PaletteSet.hydrate(paletteSet) );
        commit('update', paletteSets);
    },
    setCurrent({commit}, paletteSet) {
        commit('currentPS', paletteSet);
    },
    addPalette({commit, rootState, state}, palette: Palette) {
        commit('addPalette', palette);
        const replaceIdx = state.paletteSets.findIndex((ps) => ps.id === state.paletteSet.id );
        commit('setByIndex', {idx: replaceIdx, paletteSet: state.paletteSet});
        saveAllPSToTemp(rootState, state);
    },
    removePalette({commit, rootState, state, getters}, palette: Palette) {
        const idToRemove = getters.paletteIndexById(palette.id);
        if (idToRemove >= 0 ) {
            commit('deletePaletteByIndex', idToRemove);
            saveAllPSToTemp(rootState, state);
        }
    },
    setName({commit, getters, rootState, state}, {id, name}) {
        const idx = getters.paletteSetIndexById(id);
        commit('setName', {idx, name});
        // this should be an Action in rootState
        saveAllPSToTemp(rootState, state);
    },
};
const namespaced = true;

const saveAllPSToTemp = debounce( (rs, state) => {
    rs.filestore.set('paletteSets', state.paletteSets);
}, 100 );

export const paletteSets: Module<PSState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};




