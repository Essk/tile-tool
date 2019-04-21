<template>
  <div class="palette-view bg-grey-lightest">
      <CPEditableTitle 
      class="header"
      lineOne="Palette:" 
      :lineTwo="palette.name" 
      @input="handlePaletteName" />
    <CPPaletteEditable  :palette="palette" @selected="handleSelect"/>
    
    <CPColorSliderLockup class="picker" @updateSelected="selectColor" :color="palette.colors[selected]"/>
   <!--
    <CPColorPicker @updateActive="handleActive" @updateSelected="selectColor"></CPColorPicker>
    -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';
import CPPaletteEditable from '../components/PaletteEditable.vue';
import CPColorDetail from '../components/ColorDetail.vue';
import CPColorPicker from '../components/ColorPicker.vue';
import CPEditableTitle from '@/components/EditableTitle.vue';
import CPColorSliderLockup from '@/components/ColorSliderLockup.vue';
import Palettes from '@/views/Palettes.vue';
const PaletteStore = namespace('palettes');
@Component({
  components: {
    CPEditableTitle,
    CPPaletteEditable,
    CPColorDetail,
    CPColorPicker,
    CPColorSliderLockup,
  },
})
export default class VWPalette extends Vue {
  public selected: number = 0;
  public activeColor: Color = new Color();
  @Prop() private id!: string;
  @PaletteStore.Getter('paletteById') private paletteById!: (id: string) => Palette;
  @PaletteStore.Getter('indexById') private indexById!: (id: string) => number;
  @PaletteStore.Getter('palette') private palette!: Palette;
  @PaletteStore.Action('updateColor') private updateColor!: (payload: updateColorPayload) => void;
  @PaletteStore.Action('setCurrent') private setCurrentPalette!: (palette_idx: number) => void;
  @PaletteStore.Action('setName') private setPaletteNam!: (name: string) => void;
  private created() {
    const idx = this.indexById(this.id);
    this.setCurrentPalette(idx);
  }
  private handleSelect(selected: number) {
    this.selected = selected;
  }
  private selectColor(color: Color) {
    this.updateColor({p_index: this.indexById(this.palette.id), c_index: this.selected, color});
  }
  private handlePaletteName(name: string) {
    this.setPaletteNam(name);
  }
}
type updateColorPayload = {
  p_index: number,
  c_index: number,
  color: Color,
};
</script>

<style lang="scss" scoped>
.palette-view {
  display: grid;
  grid-gap: 2em;
  padding:2em;
  grid-template-columns: 256px 1fr 1fr;
  grid-template-rows: auto 1fr 1fr;
    grid-template-areas:
    "palette header header"
    "palette picker info"
    "palette picker info";
}
.header{
  grid-area: header;
}
.palette-wrap {
  grid-area: palette
}
.active {
  grid-area: active;
}
.selected {
  grid-area: select;
}
.picker {
  grid-area: picker;
}
</style>
