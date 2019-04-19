import { PaletteSet } from '@/utils/paletteSet.ts';
import { Palette} from '@/utils/palette';
import { Color } from '@/utils/color';


const palettes = [ 'jhkqwjdh', 'hldhdlqdkh' ];

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
    paletteSet.removePaletteByIndex(3.2); // invalid index
    expect(paletteSet.palettes.length).toBe(2);
    paletteSet.removePaletteByIndex(1); // valid index
    expect(paletteSet.palettes.length).toBe(1);
    expect(paletteSet.palettes).toEqual([palettes[0]]);
    paletteSet.removePaletteByIndex(0); // valid index
    expect(paletteSet.palettes).toEqual([]);
  });
  it('can add a valid palette', () => {
    const singlePalette  = [ 'hkjhfkshfsk' ];
    const paletteSet = new PaletteSet({});
    paletteSet.addPalette( singlePalette[0] );
    expect(paletteSet.palettes.length).toBe(1);
    expect(paletteSet.palettes).toEqual(singlePalette);

  });
  it('can update its name', () => {
    const name = 'a shiny new name';
    const paletteSet = new PaletteSet({});
    paletteSet.name = name;
    expect(paletteSet.name).toBe(name);
  });
  /*
  it('updates valid index', () => {

  });
  */
});

