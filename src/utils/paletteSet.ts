import { FileEntity } from './Storeable';
import { Palette, PaletteFileData } from './palette';
import uniqid from 'uniqid';
type Opts = {
  id?: string;
  name?: string;
  palettes?: Palette[];

};
export type PaletteSetFileData = {
  _id: string;
  _name: string;
  _palettes: PaletteFileData[];
};
export class PaletteSet extends FileEntity {
  public static hydrate(filePaletteSet: PaletteSetFileData) {
    return new PaletteSet( filePaletteSet );
  }
  private _name: string;
  private _id: string;
  private _len: number;
  private _palettes: Palette[];
  constructor(opts: Opts | PaletteSetFileData) {
    super();
    this._len = 16;
    if (this.isFromFile(opts)) {
      this._name = opts._name;
      this._id = opts._id;
      this._palettes = opts._palettes.map( (palette) => Palette.hydrate(palette) );
    } else {
      this._name = opts.name || 'new palette';
      this._id = opts.id || this.makeId();
      this._palettes = this.validatePalettes( opts.palettes);
    }
  }
  get name(): string {
    return this._name;
  }
  get id(): string {
    return this._id;
  }
  get palettes() {
    return this._palettes;
  }
  public removePaletteByIndex(idx: any): void {
    if (this.validIdx(idx)) {
      this.palettes.splice(idx, 1);
    }
  }
  public addPalette(palette: any): void {
    if (palette instanceof Palette && this._palettes.length < this._len) {
      this._palettes.push(palette);
    }
  }
  private makeId(): string {
    return uniqid('paletteSet-');
  }
  private validIdx(idx: any): boolean {
    return Number.isInteger(idx) && idx >= 0 && idx < this._len;
  }

  private validatePalettes( palettes: any[] | undefined ): Palette[] {
    let clippedPalettes = palettes;
    if (palettes !== undefined &&  palettes.length > this._len) {
      clippedPalettes = palettes.splice(this._len - 1 );
    }
    if (clippedPalettes !== undefined ) {
      return clippedPalettes.map( (palette) => {
        if ( palette instanceof Palette ) {
          return palette;
        } else {
          return new Palette({});
        }
       } );
    } else  {
      return [];
    }
  }

  private isFromFile(opts: Opts | PaletteSetFileData): opts is PaletteSetFileData {
    return (opts as PaletteSetFileData)._id !== undefined;
  }
}

