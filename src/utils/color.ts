/* tslint:disable: no-bitwise */

import { FileEntity } from './Storeable';
export class Color extends FileEntity {
    public static asHex(color: IColor ): string {
        return  `#${Color.decToHex(color.red)}${Color.decToHex(color.green)}${Color.decToHex(color.blue)}`;
    }
    public static decToHex(dec: number): string {
        const clampedDec = clampedValue(dec);
        const hex = clampedDec.toString(16).toUpperCase();
        return `${hex}${hex}`.substring(0, 2);
    }
    public static nextColors(): Color[] {
        const color = new Color();
        const colors: Color[] = [];
        const three = color.threeBitScale;
        const two = color.twoBitScale;
        // tslint:disable-next-line:prefer-for-of
        for (let r = 0; r < three.length; r ++) {
            // tslint:disable-next-line:prefer-for-of
            for (let g = 0; g < three.length; g++) {
                // tslint:disable-next-line:prefer-for-of
                for (let b = 0; b < three.length; b++) {
                    colors.push( new Color({ red: three[r], green: three[g], blue: three[b] }));
                }
            }
        }
        return colors;
    }
    public static hydrate(fileColor: ColorFileData) {
        return new Color( fileColor );
    }
    public readonly twoBitScale: number [];
    public readonly threeBitScale: number [];
    private _red: number;
    private _green: number;
    private _blue: number;
    private _hex: string;
    constructor(opts?: IColor | ColorFileData) {
        super();
        this.threeBitScale = [0, 36, 73, 109, 146, 182, 219, 255];
        this.twoBitScale = [0, 85, 170, 255];
        if (typeof opts !== 'undefined' && this.isFromFile(opts)) {
            this._red = opts._red;
            this._green = opts._green;
            this._blue = opts._blue;
        } else if ( typeof opts !== 'undefined' && ! this.isFromFile(opts)) {
            this._red = this.normaliseThree(opts.red);
            this._green = this.normaliseThree(opts.green);
            this._blue = this.normaliseThree(opts.blue);
        } else {
            this._red =  255;
            this._green = 255;
            this._blue =  255;
        }
        this._hex = Color.asHex({red: this._red, green: this._green, blue: this._blue});
    }
    private normaliseThree(value: number): number {
        const clamped = clampedValue(value);
        const eightBitVal = this.roundEightBit(clamped);
        return this.matchNextValue(eightBitVal, this.threeBitScale);
    }
    private normaliseTwo(value: number): number {
        const clamped = clampedValue(value);
        const eightBitVal = this.roundEightBit(clamped);
        return this.matchNextValue(eightBitVal, this.twoBitScale);
    }
    private roundEightBit(num: number) {
        const remainder = num % 32;
        if (remainder !== 0 ) {
            if (remainder >= 16) {
                return num + (32 - remainder) ;
            }
            return num - remainder;
        }
        return num;
    }
    private matchNextValue(num: number, scale: number[]): number {
        let i = 0;
        const values = scale;
        const lastInScale = scale[scale.length - 1];
        if (num >= lastInScale) {
            return lastInScale;
        }
        while ( (num >= values [i] && num >= values [i + 1]) && i < (values.length - 1) ) {
            i++;
        }
        const gapToLower = num - values[i];
        const gapToHigher = values[i + 1] - num;
        if ( gapToLower < gapToHigher) {
            return values[i];
        } else {
            return values[i + 1];
        }
    }
    private isFromFile(opts: IColor | ColorFileData): opts is ColorFileData {
        return (opts as ColorFileData)._red !== undefined;
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
    get hex() {
        return this._hex;
    }

}

export interface IColor {
    red: number;
    green: number;
    blue: number;
}

export type ColorFileData = {
    _red: number;
    _green: number;
    _blue: number;
};

/**
 * makes sure we have an integer 0 - 255
 */
export function clampedValue(value: number): number {
    const int = parseInt( value.toString(10), 10);
    return ( int >= 0 && int <= 255 ) ? int : 255;
}




