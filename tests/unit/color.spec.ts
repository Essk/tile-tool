import { Color } from '@/utils/color';

describe('Color', () => {
  it('converts decimal to hex', () => {
    expect(Color.decToHex(0)).toEqual('00');
    expect(Color.decToHex(255)).toEqual('FF');
    expect(Color.decToHex(146)).toEqual('92');
    expect(Color.decToHex(85)).toEqual('55');
  });
  it('produces a lookup string from color object', () => {
    expect(Color.colorToLookup({red: 255, green: 255, blue: 255})).toEqual('H_FFFFFF');
    expect(Color.colorToLookup({red: 255, green:	146, blue:	85})).toEqual('H_FF9255');

  });
  it('instantiates', () => {
    const color = new Color();
    expect(color).toBeInstanceOf(Color);
    expect(color).toEqual({_red: 255, _green: 255, _blue: 255});
  });
  it('accepts a valid color', () => {
    const color = new Color({red: 255, green:	146, blue:	85});
    expect(color).toEqual({_red: 255, _green:	146, _blue:	85});
  });

  it('rejects invalid colors', () => {
    const color = new Color({red: 355, green:	146, blue:	85});
    expect(color).toEqual({_red: 255, _green: 255, _blue: 255});
  });

});
