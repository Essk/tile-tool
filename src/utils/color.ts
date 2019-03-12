interface IColor {
    red: number;
    green: number;
    blue: number;
}

import { validColors } from './colors';

export class Color {
    public static validColor(color: IColor): boolean {
        const validKeys = Object.keys(validColors);
        const testKey =  Color.colorToLookup(color);
       // console.log(testKey);
        return validKeys.indexOf(testKey) >= 0;
    }
    public static colorToLookup(color: IColor): string {
        return `H_${Color.decToHex(color.red)}${Color.decToHex(color.green)}${Color.decToHex(color.blue)}`;
    }
    public static decToHex(dec: number): string {
        const hex = dec.toString(16).toUpperCase();
        return `${hex}${hex}`.substring(0, 2);
    }
    private _red: number;
    private _green: number;
    private _blue: number;
    constructor(opts?: IColor) {
        if ( typeof opts !== 'undefined') {
            this._red = Color.validColor(opts) ? opts.red : 255;
            this._green = Color.validColor(opts) ? opts.green : 255;
            this._blue = Color.validColor(opts) ? opts.blue : 255;
        } else {
            this._red =  255;
            this._green = 255;
            this._blue =  255;
        }

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
