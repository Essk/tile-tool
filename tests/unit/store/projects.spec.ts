import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import createStoreConfig from './create-store-config';
import { Project } from '@/primitives/project';
const localVue = createLocalVue();
localVue.use(Vuex);

describe('project store', () => {
    it('provides a current project', () => {
        const testProject = new Project({});
        const id = testProject.id;
        const projects = [
            testProject,
            new Project({}),
            new Project({}),
        ];
        const storeConfig = createStoreConfig({projects, project: id}) as any;
        const store: any = new Vuex.Store(storeConfig);
        expect(store.state.project).toEqual(id);
        expect (store.getters.current).toEqual(testProject);
    });
    it('can update current project id', () => {
        const testProject = new Project({});
        const id = testProject.id;
        const projects = [
            testProject,
            new Project({}),
            new Project({}),
        ];
        const otherId = projects[1].id;
        const storeConfig = createStoreConfig({projects, project: id}) as any;
        const store: any = new Vuex.Store(storeConfig);
        store.dispatch('updateCurrent', otherId);
        expect(store.state.project).toEqual(otherId);
    });
    it('provides projects by id', () => {
        const testProject = new Project({});
        const id = testProject.id;
        const projects = [
            testProject,
            new Project({}),
            new Project({}),
        ];
        const storeConfig = createStoreConfig({ projects }) as any; // https://github.com/vuejs/vuex/issues/1267
        const store = new Vuex.Store(storeConfig);
        expect(store.getters.byId(id)).toEqual(testProject);
    });

});
