/* tslint:disable: no-shadowed-variable */
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import {Project} from '@/primitives/project';
import debounce from 'lodash/debounce';
const namespaced: boolean = true;
/*
const saveAllPalettesToTemp = debounce( (rs, state) => {
    rs.fsStore.filestore.set('palettes', state.palettes);
}, 100 );
*/

export interface ProjectsState  {
    projects: Project[];
    project?: string;
}

const state: ProjectsState = {
    projects: [],
    project: '',
};

export const getters: GetterTree<ProjectsState, any> = {
    byId: (state) => (id: string) => state.projects.find( (project) => project.id === id ),
    current: (state, getters) => getters.byId(state.project),
};

export const actions: ActionTree<ProjectsState, any> = {
    updateCurrent({commit}, id) {
        commit('updateCurrent', id);
    },
};

export const mutations: MutationTree<ProjectsState>  = {
   updateCurrent(state, id) {
       state.project = id;
   },
};

export const projects = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
