import Vue from 'vue';
import Vuex from 'vuex';
import { fsStore } from './fsStore';
import { paletteSets } from './paletteSet';
import { modals } from './modals';

Vue.use(Vuex);

export const store = new Vuex.Store( {
    modules: {
            fsStore,
            paletteSets,
            modals,
        },
    },
);
