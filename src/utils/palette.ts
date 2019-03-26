import { Color } from './color';
import uniqid from 'uniqid';
type Opts = {
  name?: string;
  colors?: Color[];
};

export class Palette {
  private _name: string;
  private _id: string;
  private _colors: Color[];
  private _len: number;
  constructor(opts: Opts) {
    this._name = opts.name || 'new palette';
    this._id = this.makeId();
    this._len = 16;
    this._colors = opts.colors ? this.makeColors( this._len, opts.colors) :  this.makeColors(this._len);
  }
  get name(): string {
    return this._name;
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
}
