/* tslint:disable: no-shadowed-variable */
import { PaletteSet, PaletteSetFileData } from '@/utils/paletteSet';
import { Palette } from '@/utils/palette';

import { GetterTree, ActionTree, MutationTree } from 'vuex';

type PSGetter = GetterTree<State, any>;

export const state: State = {
    paletteSets : [],
    defaultPaletteSet: new PaletteSet({ name: 'new palette set', palettes: [ new Palette({}) ] }),

};

export const getters: PSGetter = {
    paletteSets: (state) => state.paletteSets,
    paletteSet: (state) => (id: string) => state.paletteSets.find( (ps) => ps.id === id ),
  };

export const mutations: MutationTree<State>  = {
    update(state, paletteSets) {
        state.paletteSets.splice(0, state.paletteSets.length, ...paletteSets);
    },
};

export const actions: ActionTree<State, any> = {
    init({ commit, rootState }) {
        const paletteSets = rootState.fileStore.data.paletteSets
        .map( (paletteSet: PaletteSetFileData ) =>  PaletteSet.hydrate(paletteSet) );
        commit('update', paletteSets);
    },
};


export const namespaced = true;

interface State  {
    paletteSets: PaletteSet[];
    defaultPaletteSet: PaletteSet;
}
