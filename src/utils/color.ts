/* tslint:disable: no-bitwise */
interface IColor {
    red: number;
    green: number;
    blue: number;
}

export class Color {
    public static asHex(color: IColor ): string {
        return  `#${Color.decToHex(color.red)}${Color.decToHex(color.green)}${Color.decToHex(color.blue)}`;
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
            this._red = this.normalise(opts.red);
            this._green = this.normalise(opts.green);
            this._blue = this.normalise(opts.blue);
        } else {
            this._red =  255;
            this._green = 255;
            this._blue =  255;
        }
    }
    private normalise(value: number): number {
        const clampedValue = ( value >= 0 && value <= 255 ) ? value : 255;
        const floor = ( clampedValue >> 5 ) << 5;
        const ceil = (floor | 31);
        if (floor === clampedValue || ceil === clampedValue) {
            return clampedValue;
        }
        return this.shouldCeil(clampedValue) ? ceil : floor;
    }
    private  shouldCeil(number: number): boolean {
        return !!(number & 16);
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
