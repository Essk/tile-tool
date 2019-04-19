import { FileEntity } from './Storeable';
import { Palette } from './palette';
import uniqid from 'uniqid';
type Opts = {
  id?: string;
  name?: string;
  palettes?: string[];
};
export type PaletteSetFileData = {
  _id: string;
  _name: string;
  _palettes: string[];
};
export class PaletteSet extends FileEntity {
  public static hydrate(filePaletteSet: PaletteSetFileData) {
    return new PaletteSet( filePaletteSet );
  }
  private _name: string;
  private _id: string;
  private _len: number;
  private _palettes: string[];
  constructor(opts: Opts | PaletteSetFileData) {
    super();
    this._len = 16;
    if (this.isFromFile(opts)) {
      this._name = opts._name;
      this._id = opts._id;
      this._palettes = opts._palettes;
    } else {
      this._name = opts.name || 'new palette';
      this._id = opts.id || this.makeId();
      this._palettes = opts.palettes || [];
    }
  }
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
  get id(): string {
    return this._id;
  }
  get palettes() {
    return this._palettes;
  }
  public removePaletteByIndex(idx: number): void {
    if (this.validIdx(idx)) {
      this.palettes.splice(idx, 1);
    }
  }
  public addPalette(palette: Palette | string): void {
    const id = palette instanceof Palette ? palette.id : palette;
    if (this._palettes.length < this._len) {
      this._palettes.push(id);
    }
  }
  private makeId(): string {
    return uniqid('paletteSet-');
  }
  private validIdx(idx: number): boolean {
    return Number.isInteger(idx) && idx >= 0 && idx < this._len;
  }

  private isFromFile(opts: Opts | PaletteSetFileData): opts is PaletteSetFileData {
    return (opts as PaletteSetFileData)._id !== undefined;
  }
}

