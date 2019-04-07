/* tslint:disable: no-shadowed-variable */
import { PaletteSet, PaletteSetFileData } from '@/utils/paletteSet';
import { Palette } from '@/utils/palette';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import debounce from 'lodash/debounce';

const saveAllPSToTemp = debounce( (rs, state) => {
    rs.fsStore.filestore.set('paletteSets', state.paletteSets);
}, 100 );

interface PSState  {
    paletteSets: PaletteSet[];
    defaultPaletteSet: PaletteSet;
    paletteSet: PaletteSet;
}

const state: PSState = {
    paletteSets : [],
    defaultPaletteSet: new PaletteSet({ name: 'new palette set', palettes: [ new Palette({}) ] }),
    paletteSet : new PaletteSet({ name: 'new palette set', palettes: [ new Palette({}) ] }),
};

const getters: GetterTree<PSState, any> = {
    paletteSets: (state) => state.paletteSets,
    paletteSetById: (state) => (id: string) => state.paletteSets.find( (ps) => ps.id === id ),
    paletteSetIndexById: (state) => (id: string) => state.paletteSets.findIndex( (ps) => ps.id === id ),
    paletteIndexById: (state) => (id: string) => state.paletteSet.palettes.findIndex( (palette) => palette.id === id ),
    paletteByIndex: (state) => (index: number) => state.paletteSet.palettes[index],
};

const actions: ActionTree<PSState, any> = {
    init({ commit, rootState }) {
        const paletteSets = rootState.fsStore.filestore.data.paletteSets
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
    updateColor({commit, rootState, state}, {p_index, c_index, color}) {
        commit('updateColor', {p_index, c_index, color});
        saveAllPSToTemp(rootState, state);
    },
};

const mutations: MutationTree<PSState>  = {
    update(state, paletteSets) {
        state.paletteSets.splice(0, state.paletteSets.length, ...paletteSets);
    },
    updateColor(state, {p_index, c_index, color}) {
        state.paletteSet.palettes[p_index].updateColor(c_index, color);
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

export const paletteSets = {
    state,
    getters,
    actions,
    mutations,
};
