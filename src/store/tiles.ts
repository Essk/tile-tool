/* tslint:disable: no-shadowed-variable */
import { Tile, TileFileData } from '@/primitives/tile';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import debounce from 'lodash/debounce';

const saveAllTilesToTemp = debounce( (rs, state) => {
    rs.fsStore.filestore.set('tile', state.tiles);
}, 100 );

interface TileState  {
    tiles: Tile[];
    defaultTile: Tile;
    tile_id: string;
}

const state: TileState = {
    tiles : [],
    defaultTile: new Tile({ name: 'New Tile'}),
    tile_id : '',
};

const getters: GetterTree<TileState, any> = {
    tiles: (state) => state.tiles,
    tile: (state, getters) => getters.tileById(state.tile_id),
    tileById: (state) => (id: string) => state.tiles.find( (tile) => tile.id === id ),
    tileIndexById: (state) => (id: string) => state.tiles.findIndex( (tile) => tile.id === id ),
};

const actions: ActionTree<TileState, any> = {
    tileInit({ commit, rootState }) {
        const tiles = rootState.fsStore.filestore.data.tiles
        .map( (tile: TileFileData ) =>  Tile.hydrate(tile) );
        commit('updateTiles', tiles);
    },
    setCurrentTile({commit}, id) {
        commit('curTile', id);
    },
    addTile({commit, rootState, state}, tile: Tile) {
        commit('addTile', tile);
        saveAllTilesToTemp(rootState, state);
    },
    removeTile({commit, rootState, state, getters}, tile: Tile) {
        const idx = getters.tileIndexById(tile.id);
        if (idx >= 0 ) {
            commit('deleteTileByIndex', idx);
            saveAllTilesToTemp(rootState, state);
        }
    },
    setTileName({commit, rootState, state, getters}, {id, name}) {
        const tile = getters.tileById(id);
        commit('setTileName', {tile, name});
        // this should be an Action in rootState
        saveAllTilesToTemp(rootState, state);
    },
};

const mutations: MutationTree<TileState>  = {
    updateTiles(state, tiles) {
        state.tiles.splice(0, state.tiles.length, ...tiles);
    },
    curTile(state, id) {
        state.tile_id = id;
    },
    addTile(state, tile) {
        state.tiles.push(tile);
    },
    deleteTileByIndex(state, index) {
        state.tiles.splice(index, 1);
    },
    setTileName(state, {tile, name}) {
        tile.name = name;
    },
};

export const tiles = {
    state,
    getters,
    actions,
    mutations,
};
