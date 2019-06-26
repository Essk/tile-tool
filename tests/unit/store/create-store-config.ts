import { ProjectsState, getters, actions, mutations } from '@/store/projects';
export default function createProjectStoreConfig( providedState?: ProjectsState) {
    const state = providedState || { };
    return {
      state,
      actions,
      mutations,
      getters,
    };
  }
