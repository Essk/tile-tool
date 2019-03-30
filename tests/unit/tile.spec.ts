import { Tile } from '@/utils/tile.ts';

describe('Tile', () => {
  it('instantiates', () => {
    const tile = new Tile({
      name: '',
    });
    expect(tile).toBeInstanceOf(Tile);
  });
  it('takes a name from passed options', () => {
    const tile = new Tile({name : 'a unique tile'});
    expect(tile.name).toBe('a unique tile');
  });
  it('gets a default id', () => {
    const tile = new Tile({name: ''});
    expect(tile.id).toBeTruthy();
  });
  it('can accept a paletteSet id', () => {
    const tile = new Tile ({paletteSet: 'dat_one'});
    expect(tile.paletteSet).toBe('dat_one');
  });
  it('defaults to pallete 0 of the palleteSet', () => {
    const tile = new Tile ({paletteSet: 'dat_one'});
    expect(tile.currentPalette).toBe(0);
  });
  it('accepts valid currentPalette indexes', () => {
    const tiles = [
      new Tile({currentPalette: 0, id: 'a'}),
      new Tile({currentPalette: 3, id: 'a'}),
      new Tile({currentPalette: 12, id: 'a'}),
      new Tile({currentPalette: 90, id: 'a'}),
      new Tile({currentPalette: -2, id: 'a'}),
      new Tile({currentPalette: 'three', id: 'a'}),
      new Tile({currentPalette: 2.6, id: 'a'}),
    ];
    expect(tiles).toMatchSnapshot();
  });
  it('can optionally accept an id from parameters', () => {
    const tile = new Tile({id: 'badgersnuff'});
    expect(tile.id).toBe('badgersnuff');
  });
  it('can accepy a partial pixel array', () => {
    const px = [15, 0, 7, 3];
    const tile = new Tile ({ px });
    expect(tile.px).toMatchSnapshot();
  });
  it('has a pixel array of the correct length of 0s', () => {
    const tile = new Tile({name: ''});
    expect(tile.px).toMatchSnapshot();
  });
  it('updates valid pixel data', () => {
    const tile = new Tile({name: ''});
    tile.updatePx(3, 12);
    expect(tile.px).toMatchSnapshot();
  });
  it('rejects invalid pixel data', () => {
    const tile = new Tile({name: ''});
    tile.updatePx(-1, 12);
    tile.updatePx(65, 12);
    tile.updatePx(5, -3);
    tile.updatePx(5, 2.4);
    tile.updatePx(5, -3);
    tile.updatePx(3.6, -3);
    expect(tile.px).toMatchSnapshot();
  });
});
