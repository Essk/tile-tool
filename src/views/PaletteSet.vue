<template>
<div>
  <h1><span>PaletteSet:</span><br>
  <span>{{ paletteSet.name }}</span></h1>
  <span> {{ paletteSet.palettes.length }} of 16 palettes defined</span>
  <div class=" grid-display palette-set-view">
    <template v-for="palette in paletteSet.palettes">
      <CPCompactPalette  :key="palette.id" 
      :palette="palette" 
      :paletteSetTotal="paletteSet.palettes.length"
      :tileData="tileData"/>
    </template>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import CPCompactPalette from '@/components/PaletteCompact.vue';

@Component({
  components: {
    CPCompactPalette,
  },
})
export default class VWPaletteSet extends Vue {
  @Prop() private id!: string;
  @Prop() private tileData!: any;
  @Prop() private getPaletteSet!: any;
  private paletteSet = this.getPaletteSet(this.id);
}
</script>

<style lang="scss" scoped>

</style>
