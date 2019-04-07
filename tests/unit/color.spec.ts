import { Color } from '@/utils/color';

describe('Color', () => {
 it('instantiates', () => {
   const emptyColor = new Color();
   expect(emptyColor).toHaveProperty('_red', 255);
   expect(emptyColor).toHaveProperty('_green', 255);
   expect(emptyColor).toHaveProperty('_blue', 255);
  });

 it('shoud normalise reds to the 3bit Next scale', () => {
    const red = new Color({red: 111, green: 0, blue: 0});
    expect(red).toHaveProperty('_red', 109);
  });
 it('shoud normalise greens to the 3bit Next scale', () => {
    const green = new Color({red: 0, green: 201, blue: 0});
    expect(green).toHaveProperty('_green', 182);
  });
 it('shoud normalise blues to the 3bit Next scale', () => {
    const blue = new Color({red: 0, green: 0, blue: 65});
    expect(blue).toHaveProperty('_blue', 73);
  });
 it('provides an array of next values', () => {
    const colors = Color.nextColors();
    expect(colors).toMatchSnapshot();
  });

 it('converts decimal to hex', () => {
    expect(Color.decToHex(255)).toEqual('FF');
    expect(Color.decToHex(190)).toEqual('BE');
    expect(Color.decToHex(73)).toEqual('49');
    expect(Color.decToHex(0)).toEqual('00');
  });
 it('converts colors to hex strings', () => {
    expect(Color.asHex({red: 255, green: 255, blue: 255})).toEqual('#FFFFFF');
    expect(Color.asHex({red: 21, green: 0, blue: 56})).toEqual('#150038');
    expect(Color.asHex({red: 97, green: 201, blue: 33})).toEqual('#61C921');
  });
 it('provides 3 bit scale', () => {
    const threeBitScale = [0, 36, 73, 109, 146, 182, 219, 255];
    expect(Color.threeBit()).toEqual(threeBitScale);
  });
 it('provides 2 bit scale', () => {
    const twoBitScale = [0, 85, 170, 255];
    expect(Color.twoBit()).toEqual(twoBitScale);
  });


});


