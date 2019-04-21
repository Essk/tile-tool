/* tslint:disable: no-shadowed-variable */
import { PaletteSet, PaletteSetFileData } from '@/utils/paletteSet';
import { Palette } from '@/utils/palette';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import debounce from 'lodash/debounce';
const namespaced = true;
const saveAllPSToTemp = debounce( (rs, state) => {
    rs.fsStore.filestore.set('paletteSets', state.paletteSets);
}, 100 );

interface PSState  {
    paletteSets: PaletteSet[];
    defaultPaletteSet: PaletteSet;
    ps_idx: number;
    palette_idx: number;
}

const state: PSState = {
    paletteSets : [],
    defaultPaletteSet: new PaletteSet({ name: 'new palette set', palettes: [ ] }),
    ps_idx : 0,
    palette_idx: 0,
};

const getters: GetterTree<PSState, any> = {
    paletteSets: (state) => state.paletteSets,
    paletteSet: (state) => state.paletteSets[state.ps_idx],
    paletteSetById: (state) => (id: string) => state.paletteSets.find( (ps) => ps.id === id ),
    paletteSetIndexById: (state) => (id: string) => state.paletteSets.findIndex( (ps) => ps.id === id ),
    paletteIndexById: (state) => (id: string) => state.paletteSets[state.ps_idx]
        .palettes.findIndex( (palette) => palette === id ),
    paletteByIndex: (state) => (index: number) => state.paletteSets[state.ps_idx].palettes[index],
    palette: (state) => state.paletteSets[state.ps_idx].palettes[state.palette_idx],
};

const actions: ActionTree<PSState, any> = {
    init({ commit, rootState }) {
        const paletteSets = rootState.fsStore.filestore.data.paletteSets
        .map( (paletteSet: PaletteSetFileData ) =>  PaletteSet.hydrate(paletteSet) );
        commit('update', paletteSets);
    },
    setCurrent({commit}, idx) {
        commit('currentPS', idx);
    },
    setCurrentPalette({commit}, palette_idx) {
        commit('currentPalette', palette_idx);
    },
    addPalette({commit, rootState, state}, palette: Palette) {
        commit('addPalette', palette);
        saveAllPSToTemp(rootState, state);
    },
    removePalette({commit, rootState, state, getters}, palette: Palette | string) {
        const idx = palette instanceof Palette
        ? getters.paletteIndexById(palette.id)
        : getters.paletteIndexById(palette);
        if (idx >= 0 ) {
            commit('deletePaletteByIndex', idx);
            saveAllPSToTemp(rootState, state);
        }
    },
    setName({commit, rootState, state}, name) {
        const idx = state.ps_idx;
        commit('setName', {idx, name});
        // this should be an Action in rootState
        saveAllPSToTemp(rootState, state);
    },
};

const mutations: MutationTree<PSState>  = {
    update(state, paletteSets) {
        state.paletteSets.splice(0, state.paletteSets.length, ...paletteSets);
    },
    currentPS(state, idx) {
        state.ps_idx = idx;
    },
    currentPalette(state, palette_idx) {
        state.palette_idx = palette_idx;
    },
    addPalette(state, palette) {
        state.paletteSets[state.ps_idx].addPalette(palette);
    },
    deletePaletteByIndex(state, index) {
        state.paletteSets[state.ps_idx].removePaletteByIndex(index);
    },
    setByIndex(state, {idx, paletteSet}) {
        state.paletteSets.splice(idx, 1, paletteSet);
    },
    setName(state, {idx, name}) {
        state.paletteSets[idx].name = name;
    },
};

export const paletteSets = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
