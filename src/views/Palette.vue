<template>
  <div class="">
    <CPPaletteEditable  :palette="palette" @selected="handleSelect"/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';
import { FileDataStore } from '../utils/user-data';
import CPPaletteEditable from '../components/PaletteEditable.vue';
@Component({
  components: {
    CPPaletteEditable,
  },
})
export default class VWPalette extends Vue {
  @Prop() private id!: string;
  @Prop() private tileData!: any;
  get palette(): Palette {
    const vm = this;
    return this.tileData.data.palettes.filter((palette: any) => {
      return palette.id === vm.id;
    })[0];
  }
  public handleSelect(e: any) {
  console.log(e);
  }
}
</script>
