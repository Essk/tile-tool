import Vue from 'vue';
import Vuex from 'vuex';
import { fsStore } from './fsStore';
import { paletteSets } from './paletteSet';
import { tiles } from './tiles';
import { modals } from './modals';
import { palettes } from './palettes';

Vue.use(Vuex);

export const store = new Vuex.Store( {
    modules: {
        fsStore,
        paletteSets,
        tiles,
        modals,
        palettes,
    },
    actions : {
        init({rootState, dispatch}) {
            dispatch('paletteSets/init');
            dispatch('tileInit');
            dispatch('palettes/init');
        },
    },
});
