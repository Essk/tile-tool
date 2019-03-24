import { Color } from './color';
import uniqid from 'uniqid';
type Opts = {
  name: string;
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
    this._colors = this.makeColors(this._len);
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
  private makeColors(len: number) {
    const colors = [];
    for (let i = 0; i < len; i++) {
      colors.push(new Color({ red: 255, green: 255, blue: 255 }));
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
