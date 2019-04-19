/* tslint:disable: no-shadowed-variable */
import { Palette, PaletteFileData } from '@/utils/palette';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import debounce from 'lodash/debounce';
const namespaced: boolean = true;
const saveAllPalettesToTemp = debounce( (rs, state) => {
    rs.fsStore.filestore.set('palettes', state.palettes);
}, 100 );

interface PalettesState  {
    palettes: Palette[];
    defaultPalette: Palette;
    palette_idx: number ;
}

const state: PalettesState = {
    palettes : [],
    defaultPalette: new Palette({ }),
    palette_idx: 0,
};

const getters: GetterTree<PalettesState, any> = {
    palettes: (state) => state.palettes,
    palette: (state) => state.palettes[state.palette_idx],
    paletteById: (state) => (id: string) => state.palettes.find( (palette) => palette.id === id ),
    paletteIndexById: (state) => (id: string) => state.palettes.findIndex( (ps) => ps.id === id ),
    paletteByIndex: (state) => (index: number) => state.palettes[index],
};

const actions: ActionTree<PalettesState, any> = {
    init({ commit, rootState }) {
        const pArray: PaletteFileData[] = rootState.fsStore.filestore.data.palettes !== undefined
        ? rootState.fsStore.filestore.data.palettes
        : [];
        const palettes = pArray.map( (palette: PaletteFileData ) =>  Palette.hydrate(palette) );
        commit('update', palettes);
    },
    setCurrent({commit}, idx) {
        commit('setCurrent', idx);
    },
    add({commit, rootState, state}, palette: Palette) {
        commit('add', palette);
        saveAllPalettesToTemp(rootState, state);
    },
    remove({commit, rootState, state, getters}, palette: Palette) {
        const idToRemove = getters.paletteIndexById(palette.id);
        if (idToRemove >= 0 ) {
            commit('deleteByIndex', idToRemove);
            saveAllPalettesToTemp(rootState, state);
        }
    },
    setName({commit,  rootState, state}, name) {
        commit('setName', name);
        saveAllPalettesToTemp(rootState, state);
    },
    updateColor({commit, rootState, state}, {p_index, c_index, color}) {
        commit('updateColor', {p_index, c_index, color});
        saveAllPalettesToTemp(rootState, state);
    },
};

const mutations: MutationTree<PalettesState>  = {
    update(state, palettes) {
        state.palettes.splice(0, state.palettes.length, ...palettes);
    },
    updateColor(state, {p_index, c_index, color}) {
        state.palettes[p_index].updateColor(c_index, color);
    },
    setCurrent(state, idx) {
        state.palette_idx = idx;
    },
    add(state, palette) {
        state.palettes.push(palette);
    },
    deleteByIndex(state, index) {
        state.palettes.splice(index, 1);
    },
    updateByIndex(state, {idx, palette}) {
        state.palettes.splice(idx, 1, palette);
    },
    setName(state, {idx, name}) {
        state.palettes[idx].name = name;
    },
};

export const palettes = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
