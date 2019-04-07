/* tslint:disable: no-shadowed-variable */
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';

type ModalState = {
    modalOpen: boolean,
    modalComponent: string,
    modalProps: any,
};

const state: ModalState = {
    modalOpen: false,
    modalComponent : '',
    modalProps : {},
};

const mutations: MutationTree<ModalState> =  {
    setModalState(state, modalOpen) {
        state.modalOpen = modalOpen;
    },
    setModalComponent(state, component) {
        state.modalComponent = component;
    },
    setModalProps(state, modalProps) {
        state.modalProps = modalProps;
    },
};

const actions: ActionTree<ModalState, any> = {
    setModalState({commit}, modalOpen) {
      commit('setModalState', modalOpen);
    },
    setModalComponent({commit}, component) {
      commit('setModalComponent', component);
    },
    setModalProps({commit}, ModalProps) {
      commit('setModalProps', ModalProps);
    },
  };

export const modals = {
    state,
    mutations,
    actions,
};
