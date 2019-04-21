import { FileDataStore } from './user-data';
import { Tile, TileFileData } from '@/primitives/tile';
import { PaletteSet, PaletteSetFileData } from '@/primitives/paletteSet';
import { Palette } from './palette';


export class TileDataController {
    private _tiles: Tile[];
    private _paletteSets: PaletteSet[];
    private _defaultPaletteSet: PaletteSet;
    private _defaultTile: Tile;
    private _fileStore: FileDataStore;

    constructor() {
      this._defaultPaletteSet = new PaletteSet({ name: 'new palette set', palettes: [ new Palette({}) ] });
      this._defaultTile = new Tile({ name: 'new tile', paletteSet: this._defaultPaletteSet.id });
      this._fileStore = new FileDataStore({
        configName: 'user-data', defaults: {
          tiles: [this._defaultTile],
          paletteSets: [this._defaultPaletteSet],
        },
      });
      this._tiles = this._fileStore.data.tiles.map( (tile: TileFileData ) =>  Tile.hydrate(tile) );
      this._paletteSets = this._fileStore.data.paletteSets.
        map( (paletteSet: PaletteSetFileData ) =>  PaletteSet.hydrate(paletteSet) );
    }
    get tiles() {
        return this._tiles;
    }
    get paletteSets() {
        return this._paletteSets;
    }
    set paletteSets(sets) {
      this._paletteSets = sets;
      this._fileStore.set('paletteSets', this._paletteSets);
    }
}
