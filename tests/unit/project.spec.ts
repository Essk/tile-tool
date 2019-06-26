import { Project } from '@/primitives/project';

describe('Project', () => {
    it('instantiates', () => {
        const project = new Project({});
        expect(project).toHaveProperty('name', 'New Project');
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('created'); // we'll want to check these are sane at some point
        expect(project).toHaveProperty('modified'); // we'll want to check these are sane at some point
        expect(project).toHaveProperty('notes', '');
        expect(project).toHaveProperty('tiles', []);
        expect(project).toHaveProperty('paletteSet', '');
    });
    it ('instantiates from file format', () => {
        const created = new Date().toDateString();
        const modified = new Date().toDateString();
        const project = new Project({
            _id: 'new-project',
            _name: 'project name',
            _notes: 'some notes',
            _tiles: ['tile-1', 'tile-2'],
            _paletteSet: 'palette-1',
            _created: created,
            _modified: modified,
        });
        expect(project.name).toBe('project name');
        expect(project.id).toBe('new-project');
        expect(project.created).toEqual(created);
        expect(project.modified).toEqual(modified);
        expect(project.notes).toEqual('some notes');
        expect(project.tiles).toEqual(['tile-1', 'tile-2']);
        expect(project.paletteSet).toEqual('palette-1');
    });
    it ('instantiates from object', () => {
        const project = new Project({
            name: 'project name',
            notes: 'some notes',
            tiles: ['tile-1', 'tile-2'],
            paletteSet: 'palette-1',
        });
        expect(project.name).toBe('project name');
        expect(project.id).toBeTruthy();
        expect(project.created).toBeTruthy();
        expect(project.modified).toBeTruthy();
        expect(project.notes).toEqual('some notes');
        expect(project.tiles).toEqual(['tile-1', 'tile-2']);
        expect(project.paletteSet).toEqual('palette-1');
    });
    it('can update it\'s name', () => {
        const project = new Project({
            name: 'project name',
            notes: 'some notes',
            tiles: ['tile-1', 'tile-2'],
            paletteSet: 'palette-1',
        });
        const newName = 'new name';
        project.name = newName;
        expect(project.name).toEqual(newName);
    });
    it('can update it\'s notes', () => {
        const project = new Project({
            name: 'project name',
            notes: 'some notes',
            tiles: ['tile-1', 'tile-2'],
            paletteSet: 'palette-1',
        });
        const newNotes = 'new notes';
        project.notes = newNotes;
        expect(project.notes).toEqual(newNotes);
    });
    it('can update it\'s tiles', () => {
        const newTiles = ['another tile', 'completely different tile'];
        const tooManyTiles = Array(513).fill('tile!');
        const project = new Project({
            name: 'project name',
            notes: 'some notes',
            tiles: ['tile-1', 'tile-2'],
            paletteSet: 'palette-1',
        });
        project.tiles = tooManyTiles;
        expect(project.tiles).toEqual( ['tile-1', 'tile-2'] ); // update should be rejected
        project.tiles = newTiles;
        expect(project.tiles).toEqual(newTiles);
    });
    it('can add a tile', () => {
        const newTile = 'completely different tile';
        const someTiles = Array(13).fill('tile!');
        const maxTiles = Array(512).fill('tile!');
        const project = new Project({
            name: 'project name',
            notes: 'some notes',
            tiles: someTiles,
            paletteSet: 'palette-1',
        });
        project.addTile(newTile);
        expect(project.tiles).toContain(newTile);
        project.tiles = maxTiles;
        project.addTile(newTile);
        expect(project.tiles.indexOf(newTile)).toBe(-1);
    });
    it('can remove a tile', () => {
        const someTiles = Array(13).fill('tile!');
        const aTile = 'A-Tile';
        someTiles.push(aTile);
        const project = new Project({
            name: 'project name',
            notes: 'some notes',
            tiles: someTiles,
            paletteSet: 'palette-1',
        });
        expect(project.tiles).toContain(aTile);
        expect(project.tiles.length).toBe(14);
        project.removeTile(13);
        expect(project.tiles.length).toBe(13);
        expect(project.tiles.indexOf(aTile)).toBe(-1);
     });
    it('can update it\'s paletteSet', () => {
        const someTiles = Array(13).fill('tile!');
        const newPs = 'new-ps';
        const project = new Project({
            name: 'project name',
            notes: 'some notes',
            tiles: someTiles,
            paletteSet: 'palette-1',
        });
        project.paletteSet = newPs;
        expect(project.paletteSet).toEqual(newPs);
    });
});
