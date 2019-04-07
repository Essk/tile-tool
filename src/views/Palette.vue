<template>
  <div class="palette-view">
      <CPEditableTitle lineOne="Palette:" 
      :lineTwo="palette.name" 
      @input="handlePaletteName" />
    <CPPaletteEditable  :palette="palette" @selected="handleSelect"/>
    <CPColorDetail :color="palette.colors[selected]"></CPColorDetail>
    <CPColorDetail :color="activeColor" ></CPColorDetail>
    <CPColorPicker @updateActive="handleActive" @updateSelected="selectColor"></CPColorPicker>
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
import Palettes from '@/views/Palettes.vue';

@Component({
  components: {
    CPEditableTitle,
    CPPaletteEditable,
    CPColorDetail,
    CPColorPicker,
  },
})
export default class VWPalette extends Vue {
  public selected: number = 0;
  public activeColor: Color = new Color();
  @Prop() private index!: number;
  @Getter('paletteByIndex') private paletteByIndex!: (index: number) => Palette;
  @Getter('palette') private palette!: Palette;
  @Action('updateColor') private updateColor!: (payload: updateColorPayload) => void;
  @Action('setCurrentPalette') private setCurrentPalette!: (palette_idx: number) => void;
  @Action('setPaletteName') private setPaletteNam!: (name: string) => void;
  private created() {
    this.setCurrentPalette(this.index);
  }
  private handleSelect(selected: number) {
    this.selected = selected;
  }
  private handleActive(active: Color) {
    this.activeColor = active;
  }
  private selectColor(color: Color) {
    this.updateColor({p_index: this.index, c_index: this.selected, color: this.activeColor});
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
  grid-template-columns: 256px 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100vh;
}
.palette-wrap {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
}
.color-picker {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
}
</style>
