interface IStorable {
    toString: () => string;
    fromString: (str: string) => object;
}

export class FileEntity implements IStorable {

    public toString(): string {
        return JSON.stringify(this);
    }
    public fromString( str: string) {
        return JSON.parse(str);
    }
}
