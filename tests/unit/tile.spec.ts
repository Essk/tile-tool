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
  it('gets an id', () => {
    const tile = new Tile({name: ''});
    expect(tile.id).toBeTruthy();
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
