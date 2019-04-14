<template>
  <div class="compact-paletteset-wrap">
    <BaseSubsubtitle :lineTwo="paletteSet.name" :lineThree="paletteSet.id" />
      <div class="palettes mt-2">
        <template v-for="p_index in 16">
          <div class="palette" v-if=" typeof paletteSet.palettes[p_index - 1] !== 'undefined'"  :key="p_index">
            <span v-for="(color, c_index) in paletteSet.palettes[p_index - 1].colors" :key="c_index" :style="{backgroundColor: color.hex}"></span>
          </div>
          <div v-else :key="p_index" class="w-full h-full border border-dashed border-grey">  </div>
        </template>
      </div>
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PaletteSet } from '../utils/paletteSet';
import { Color } from '../utils/color';
@Component({})
export default class CPCompactPaletteSet extends Vue {
  @Prop() public paletteSet!: PaletteSet;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.palettes {
  display: grid;
  grid-template-columns: 32px 32px 32px 32px;
  grid-template-rows: 32px 32px 32px 32px;
  grid-gap: 4px;
  .palette{
      display: flex;
      flex-wrap: wrap;
  }
  
  span {
    display: block;
    height: 8px;
    flex-basis: 25%;
    
  }
}
</style>
