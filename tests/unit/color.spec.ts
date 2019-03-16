import { Color } from '@/utils/color';

describe('Color', () => {
  it('shoud normalise 8 bit numbers to the 3 most significant bits', () => {
    const color = new Color({red: 223, green: 72, blue: 161});
    expect(color.red).toEqual(223);
    expect(color.green).toEqual(64);
    expect(color.blue).toEqual(160);
  });
  it('converts decimal to hex', () => {
    expect(Color.decToHex(0)).toEqual('00');
    expect(Color.decToHex(255)).toEqual('FF');
    expect(Color.decToHex(146)).toEqual('92');
    expect(Color.decToHex(85)).toEqual('55');
  });
  it('converts colors to hex strings', () => {
    expect (Color.asHex({red: 255, green:	159, blue:	95})).toEqual('#FF9F5F');
  });
  it('instantiates', () => {
    const color = new Color();
    expect(color).toBeInstanceOf(Color);
    expect(color).toEqual({_red: 255, _green: 255, _blue: 255});
  });
  it('accepts and returns a valid color', () => {
    const color = new Color({red: 255, green:	159, blue:	95});
    expect(color).toEqual({_red: 255, _green:	159, _blue:	95});
  });

  it('corrects invalid color values', () => {
    let color = new Color({red: 355, green:	159, blue:	95});
    expect(color).toEqual({_red: 255, _green: 159, _blue: 95});
    color = new Color({red: 255, green:	0.3, blue:	95});
    expect(color).toEqual({_red: 255, _green: 0, _blue: 95});
    color = new Color({red: 255, green:	-7, blue:	95});
    expect(color).toEqual({_red: 255, _green: 255, _blue: 95});
  });

});
