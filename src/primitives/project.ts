import { FileEntity } from './Storeable';

import uniqid from 'uniqid';
type Opts = {
  name?: string;
  notes?: string;
  tiles?: string[];
  paletteSet?: string;
};
export type ProjectFileData = {
    _id: string;
    _name: string;
    _notes: string;
    _tiles: string[];
    _paletteSet: string;
    _created: string;
    _modified: string;
};
export class Project extends FileEntity {
  public static hydrate(fileProject: ProjectFileData) {
    return new Project( fileProject );
  }
  private _name: string;
  private _id: string;
  private _paletteSet: string;
  private _tiles: string[];
  private _notes: string;
  private _created: string;
  private _modified: string;
  constructor(opts: Opts | ProjectFileData) {
    super();
    if (this.isFromFile(opts)) {
        this._name = opts._name;
        this._id = opts._id;
        this._created = opts._created;
        this._modified = opts._modified;
        this._paletteSet = opts._paletteSet;
        this._tiles = opts._tiles;
        this._notes = opts._notes;
    } else {
        const createDate = new Date().toISOString();
        this._name = opts.name || 'New Project';
        this._id = uniqid('project-');
        this._paletteSet = opts.paletteSet || '';
        this._tiles = opts.tiles || [];
        this._notes = opts.notes || '';
        this._created = createDate;
        this._modified = createDate;
    }
  }
  get name(): string {
    return this._name;
  }
  get id(): string {
    return this._id;
  }
  get created(): string {
    return this._created;
  }
  get modified(): string {
    return this._modified;
  }
  get paletteSet(): string {
    return this._paletteSet;
  }
  get tiles(): string[] {
    return this._tiles;
  }
  get notes(): string {
    return this._notes;
  }
  private isFromFile(opts: Opts | ProjectFileData): opts is ProjectFileData {
    return (opts as ProjectFileData)._id !== undefined;
  }
}
