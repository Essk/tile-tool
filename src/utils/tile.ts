import uniqid from 'uniqid';

type Opts = {
    name: string;
};

export class Tile {
    private _name: string;
    private _id: string;
    private _px: number[];
    private _len: number;
    constructor(opts: Opts) {
        this._name = opts.name || 'new tile';
        this._id = this.makeId();
        this._len = 64;
        this._px = this.makePx(this._len);
    }
    public updatePx(idx: number, value: number) {
        if (this.validIdx(idx) && this.validValue(value)) {
            this.px[idx] = value;
        }
    }
    private makeId(): string {
        return uniqid('tile-');
    }
    private makePx(len: number): number[] {
        const px = [];
        for (let i = 0; i < len; i++) {
            px.push(0);
        }
        return px;
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
    private validIdx(idx: number): boolean {
        return Number.isInteger(idx) && idx >= 0 && idx < this._len;
    }
    private validValue(value: number): boolean {
        return Number.isInteger(value) && value >= 0 && value < 16;
    }

}
