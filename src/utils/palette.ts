import { Color, ColorFileData } from './color';
import { FileEntity } from './Storeable';
import uniqid from 'uniqid';
type Opts = {
  id?: string;
  name?: string;
  colors?: Color[];
};

export type PaletteFileData = {
  _id: string;
  _name: string;
  _colors: ColorFileData[];
};
export class Palette extends FileEntity {
  public static hydrate(filePalette: PaletteFileData) {
    return new Palette( filePalette );
  }
  private _name: string;
  private _id: string;
  private _colors: Color[];
  private _len: number;
  constructor(opts: Opts | PaletteFileData) {
    super();
    this._len = 16;
    if (this.isFromFile(opts)) {
      this._name = opts._name;
      this._id = opts._id;
      this._colors = opts._colors.map( (color) => Color.hydrate(color) );
    } else {
      this._name = opts.name || 'new palette';
      this._id = opts.id || this.makeId();
      this._colors = opts.colors ? this.makeColors( this._len, opts.colors) :  this.makeColors(this._len);
    }
  }
  get name(): string {
    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
  }
  get id(): string {
    return this._id;
  }
  get colors(): Color[] {
    return this._colors;
  }
  set colors(newColors: Color[]) {
    this._colors = newColors;
  }
  public updateColor(idx: number, color: Color) {
    if (this.validIdx(idx)) {
      this.colors.splice(idx, 1, color);
    }
  }
  private makeColors( len: number, optcolors?: Color[]) {
    const colors = optcolors || [];
    if (colors.length > len) {
      // trim the extra off
      const diff = colors.length - len;
      return colors.splice(diff - 1, diff);
    } else if ( colors.length >= 0 && colors.length <= len) {
      // pad out with white
      const padStart = colors.length;
      for (let i = padStart; i < len; i++) {
        colors.push(new Color({ red: 255, green: 255, blue: 255 }));
      }
    } else {
      // return an array of white
      for (let i = 0; i < len; i++) {
        colors.push(new Color({ red: 255, green: 255, blue: 255 }));
      }
    }
    return colors;
  }
  private makeId(): string {
    return uniqid('palette-');
  }
  private validIdx(idx: number): boolean {
    return Number.isInteger(idx) && idx >= 0 && idx < this._len;
  }
  private isFromFile(opts: Opts | PaletteFileData): opts is PaletteFileData {
    return (opts as PaletteFileData)._id !== undefined;
  }
}

