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
