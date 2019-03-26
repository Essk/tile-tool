import { Palette } from '@/utils/palette.ts';
import { Color } from '@/utils/color';

describe('Palette', () => {
  it('instantiates', () => {
    const palette = new Palette({
      name: '',
    });
    expect(palette).toBeInstanceOf(Palette);
  });

  it('takes a name from passed options', () => {
    const palette = new Palette({name : 'a unique palette'});
    expect(palette.name).toBe('a unique palette');
  });
  it('can accept a color array in options', () => {
     const black = new Color({red: 0, green: 0, blue: 0});
     const colors: Color[] = [
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
    ];
     const palette = new Palette({ name: 'pallete', colors });
     expect(palette.colors).toEqual(colors);
  });
  it('can accept a color array of varying lengths in options', () => {
    const black = new Color({red: 0, green: 0, blue: 0});
    const white =  new Color({red: 255, green: 255, blue: 255});
    const colors: Color[] = [
     black,
     black,
     black,
     black,
     black,
     black,
     black,
   ];
    const expectedColors: Color[] = [
    black,
    black,
    black,
    black,
    black,
    black,
    black,
    white,
    white,
    white,
    white,
    white,
    white,
    white,
    white,
    white,
  ];
    const palette = new Palette({ name: 'pallete', colors });
    expect(palette.colors).toEqual(colors);
 });
  it('gets an id', () => {
    const palette = new Palette({
      name: '',
    });
    expect(palette.id).toBeTruthy();
  });
  it('has a color array of the correct length of White', () => {
    const palette = new Palette({name: ''});
    expect(palette.colors).toMatchSnapshot();
  });
  it('updates valid index', () => {
    const palette = new Palette({name: ''});
    palette.updateColor(3, new Color({red: 0, green: 0, blue: 0}));
    expect(palette.colors).toMatchSnapshot();
  });
  it('rejects invalid index', () => {
    const palette = new Palette({name: ''});
    palette.updateColor(-1, new Color({red: 0, green: 0, blue: 0}));
    palette.updateColor(23, new Color({red: 0, green: 0, blue: 0}));
    expect(palette.colors).toMatchSnapshot();
  });
});

