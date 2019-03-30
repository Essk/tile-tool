import { FileDataStore } from './user-data';
import { Tile, TileFileData } from '@/utils/tile';
import { PaletteSet, PaletteSetFileData } from '@/utils/paletteSet';
import { Color } from '@/utils/color';
import { Palette } from './palette';


export class TileDataController {
    private _tiles: Tile[];
    private _paletteSets: PaletteSet[];
    private defaultPaletteSet = new PaletteSet({ name: 'new palette set', palettes: [ new Palette({}) ] });
    private defaultTile = new Tile({ name: 'new tile', paletteSet: this.defaultPaletteSet.id });
      private fileStore = new FileDataStore({
      configName: 'user-data', defaults: {
        tiles: [this.defaultTile],
        paletteSets: [this.defaultPaletteSet],
      },
    });
    constructor() {
        this._tiles = this.fileStore.data.tiles.map( (tile: TileFileData ) =>  Tile.hydrate(tile) );
        this._paletteSets = this.fileStore.data.paletteSets.
        map( (paletteSet: PaletteSetFileData ) =>  PaletteSet.hydrate(paletteSet) );
    }
    get tiles() {
        return this._tiles;
    }
    get paletteSets() {
        return this._paletteSets;
    }
}
