interface IColor {
    red: number;
    green: number;
    blue: number;
}

import { validColors } from './colors';

export class Color {
    public static validColor(color: IColor): boolean {
        const validKeys = Object.keys(validColors);
        const testKey =  `H_${Color.decToHex(color.red)}${Color.decToHex(color.green)}${Color.decToHex(color.blue)}`
        .toUpperCase();
        return validKeys.indexOf(testKey) >= 0;
    }
    public static decToHex(dec: number): string {
        const hex = dec.toString(16).toUpperCase();
        return `${hex}${hex}`.substring(0, 2);
    }
    private _red: number;
    private _green: number;
    private _blue: number;
    constructor(opts: IColor) {
        this._red = Color.validColor(opts) ? opts.red : 255;
        this._green = Color.validColor(opts) ? opts.green : 255;
        this._blue = Color.validColor(opts) ? opts.blue : 255;
    }
    get red() {
        return this._red;
    }
    get green() {
        return this._green;
    }
    get blue() {
        return this._blue;
    }

}
