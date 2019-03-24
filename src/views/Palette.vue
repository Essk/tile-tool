<template>
  <div class="palette-view">
    <CPPaletteEditable  :palette="palette" @selected="handleSelect"/>
    <CPColorDetail :color="palette.colors[selected]"></CPColorDetail>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';
import { FileDataStore } from '../utils/user-data';
import CPPaletteEditable from '../components/PaletteEditable.vue';
import CPColorDetail from '../components/ColorDetail.vue';
@Component({
  components: {
    CPPaletteEditable,
    CPColorDetail,
  },
})
export default class VWPalette extends Vue {
  get palette(): Palette {
    const vm = this;
    return this.tileData.data.palettes.filter((palette: any) => {
      return palette.id === vm.id;
    })[0];
  }
  public selected: number = 0;
  @Prop() private id!: string;
  @Prop() private tileData!: any;
  public handleSelect(selected: number) {
    this.selected = selected;
  }
}
</script>

<style lang="scss" scoped>
.palette-view {
  display: flex;
}
</style>
