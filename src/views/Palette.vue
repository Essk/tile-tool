<template>
  <div class="palette-view">
    <CPPaletteEditable  :palette="getPalette(id)" @selected="handleSelect"/>
    <CPColorDetail :color="getPalette(id).colors[selected]"></CPColorDetail>
    <CPColorDetail :color="activeColor" ></CPColorDetail>
    <CPColorPicker @updateActive="handleActive" @updateSelected="selectColor"></CPColorPicker>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';
import { FileDataStore } from '../utils/user-data';
import CPPaletteEditable from '../components/PaletteEditable.vue';
import CPColorDetail from '../components/ColorDetail.vue';
import CPColorPicker from '../components/ColorPicker.vue';
import Palettes from '@/views/Palettes.vue';
@Component({
  components: {
    CPPaletteEditable,
    CPColorDetail,
    CPColorPicker,
  },
})
export default class VWPalette extends Vue {
  public selected: number = 0;
  public activeColor: Color = new Color();
  @Prop() private id!: string;
  @Prop() private tileData!: any;
  @Prop() private getPalette!: () => void;
  public handleSelect(selected: number) {
    this.selected = selected;
  }
  public handleActive(active: Color) {
    this.activeColor = active;
  }
  public selectColor(color: Color) {
    this.$emit('updatePalette', {
      id: this.id,
      idx: this.selected,
      color,
    });
  }
}
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
