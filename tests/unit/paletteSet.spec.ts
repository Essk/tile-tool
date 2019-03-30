import { PaletteSet } from '@/utils/paletteSet.ts';
import { Palette} from '@/utils/palette';
import { Color } from '@/utils/color';

const examplePalette = {
    name: 'new palette',
    id : 'palette-tojtq6fvzh',
    colors: [
      new Color({red: 0, green : 73, blue: 73}),
      new Color({red: 0, green : 146, blue : 36}),
      new Color({red : 0, green : 219, blue : 73}),
      new Color({red : 109, green: 36, blue: 0}),
      new Color({red : 73, green : 0, blue: 0}),
      new Color({red : 219, green : 146, blue : 219}),
      new Color({red : 109, green : 219, blue : 146}),
      new Color({red : 36, green: 146, blue: 255 }),
      new Color({red: 182, green: 0, blue: 0}),
      new Color({red : 73, green: 0, blue: 36}),
      new Color({red: 182, green: 36, blue: 219}),
      new Color({red: 255, green : 255, blue: 255}),
      new Color({red: 219, green : 255, blue: 255}),
      new Color({red: 219, green : 219, blue: 219}),
      new Color({red: 182, green : 146, blue: 182}),
      new Color({red: 182, green : 146, blue: 255}),
    ],
  };
const palettes = [ new Palette({}), new Palette(examplePalette) ];

describe('PaletteSet', () => {
  it('instantiates', () => {
    const paletteSet = new PaletteSet({
      name: '',
    });
    expect(paletteSet).toBeInstanceOf(PaletteSet);
  });
  it('gets a default id', () => {
    const paletteSet = new PaletteSet({
      name: '',
    });
    expect(paletteSet.id).toBeTruthy();
  });
  it('accepts an id in opts', () => {
    const paletteSet = new PaletteSet({ id: 'badger_snuff'});
    expect(paletteSet.id).toBe('badger_snuff');
  });
  it('takes a name from passed options', () => {
    const paletteSet = new PaletteSet({name : 'a unique palette set'});
    expect(paletteSet.name).toBe('a unique palette set');
  });
  it('defaults to an empty array of Palettes', () => {
    const paletteSet = new PaletteSet({});
    expect(paletteSet.palettes).toEqual([]);
  } );
  it('accepts a valid array of Palettes in opts', () => {
    const paletteSet = new PaletteSet({ palettes });
    expect(paletteSet.palettes).toEqual(palettes);
  });
  it('can remove a palette at valid index', () => {
    const paletteSet = new PaletteSet({palettes});
    paletteSet.removePaletteByIndex(3); // invalid index
    paletteSet.removePaletteByIndex('4'); // invalid index
    paletteSet.removePaletteByIndex(3.2); // invalid index
    expect(paletteSet.palettes.length).toBe(2);
    paletteSet.removePaletteByIndex(1); // valid index
    expect(paletteSet.palettes.length).toBe(1);
    expect(paletteSet.palettes).toEqual([palettes.shift()]);
    paletteSet.removePaletteByIndex(0); // valid index
    expect(paletteSet.palettes).toEqual([]);
  });
  it('can add a valid palette', () => {
    const singlePalette  = [ new Palette({}) ];
    const paletteSet = new PaletteSet({});
    paletteSet.addPalette( singlePalette[0] );
    expect(paletteSet.palettes.length).toBe(1);
    expect(paletteSet.palettes).toEqual(singlePalette);

  });
  /*
  it('updates valid index', () => {

  });
  */
});

