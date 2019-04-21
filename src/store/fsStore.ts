import { FileDataStore } from '@/primitives/user-data';
import { Tile } from '@/primitives/tile';
import * as paletteSets from './paletteSet';
type fsStoreState = {
    filestore: FileDataStore;
};

const state: fsStoreState = {
    filestore : new FileDataStore({
        configName: 'user-data', defaults: {
          tiles: [new Tile({name: 'default store tile'})],
          paletteSets: [paletteSets.paletteSets.state.defaultPaletteSet],
        },
    }),
};

export const fsStore = {
    state,
};
