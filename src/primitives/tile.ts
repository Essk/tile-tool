import uniqid from 'uniqid';
import { FileEntity } from './Storeable';

type Opts = {
    name?: string;
    id?: string;
    px?: number[];
    paletteSet?: string;
    currentPalette?: any;
    defaultPalette?: any;
};
export type TileFileData = {
    _name: string;
    _id: string;
    _px: number[];
    _paletteSet: string;
    _currentPalette: any;
    _defaultPalette: any;
};
export class Tile extends FileEntity {
    public static hydrate(tileFile: TileFileData) {
        return new Tile(tileFile);
    }
    private _name: string;
    private _id: string;
    private _px: number[];
    private _len: number;
    private _paletteSet: string;
    private _currentPalette: number;
    private _defaultPalette: string;
    constructor(opts: Opts | TileFileData) {
        super();
        if (this.isFromFile(opts)) {
            this._name = opts._name;
            this._id = opts._id;
            this._len = 64;
            this._px = opts._px ;
            this._paletteSet = opts._paletteSet;
            this._currentPalette = opts._currentPalette;
            this._defaultPalette = opts._defaultPalette;
        } else {
            this._name = opts.name || 'new tile';
            this._id = opts.id || this.makeId();
            this._len = 64;
            this._px = opts.px ? this.makePx(this._len, opts.px) : this.makePx(this._len);
            this._paletteSet = opts.paletteSet || '';
            this._currentPalette =  this.validPalette(opts.currentPalette) ? opts.currentPalette : 0;
            this._defaultPalette = opts.defaultPalette || '';
        }
    }
    public updatePx(idx: number, value: number) {
        if (this.validIdx(idx) && this.validValue(value)) {
            this.px[idx] = value;
        }
    }
    private makeId(): string {
        return uniqid('tile-');
    }
    private makePx(len: number, px?: number[]): number[] {
        const _px = px || [];
        if (_px.length >= 0 && _px.length <= len) {
            for (let i = _px.length; i < len; i++) {
                _px.push(0);
            }
        } else if (_px.length > len) {
            return _px.splice(len);
        }
        return _px;
    }
    get px(): number[] {
        return this._px;
    }
    set px(newPx: number[]) {
        this._px = newPx;
    }
    get name(): string {
        return this._name;
    }
    get id(): string {
        return this._id;
    }
    get paletteSet(): string {
        return this._paletteSet;
    }
    set palette_set(paletteSet: string) {
        this._paletteSet = paletteSet;
    }
    get currentPalette(): number {
        return this._currentPalette;
    }

    set currentPalette(idx: number) {
        this._currentPalette = this.validPalette(idx) ? idx : 0 ;
    }
    get defaultPalette(): string {
        return this._defaultPalette;
    }
    set defaultPalette(paletteId: string) {
        this._defaultPalette = paletteId;
    }
    private validPalette(idx: number ): boolean {
        if (idx === undefined) {
            return false;
        }
        return Number.isInteger(idx)
        && idx >= 0
        && idx < 16;
    }
    private validIdx(idx: number): boolean {
        return Number.isInteger(idx) && idx >= 0 && idx < this._len;
    }
    private validValue(value: number): boolean {
        return Number.isInteger(value) && value >= 0 && value < 16;
    }
    private isFromFile(opts: Opts | TileFileData): opts is TileFileData {
        return (opts as TileFileData)._id !== undefined;
    }

}
