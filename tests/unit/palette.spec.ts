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

