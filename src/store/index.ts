import Vue from 'vue';
import Vuex from 'vuex';
import { fsStore } from './fsStore';
import { paletteSets } from './paletteSet';
import { tiles } from './tiles';
import { modals } from './modals';

Vue.use(Vuex);

export const store = new Vuex.Store( {
    modules: {
        fsStore,
        paletteSets,
        tiles,
        modals,
    },
    actions : {
        init({rootState, dispatch}) {
            dispatch('psInit');
            dispatch('tileInit');
        },
    },
});
