<template>
  <div class="compact-paletteset-wrap">
    <BaseSubsubtitle>
    {{ paletteSet.name }}
    <template slot="bottom"> {{ paletteSet.id }}</template>
    </BaseSubsubtitle>
      <div class="palettes mt-2">
        <template v-for="p_index in 16">
          <div class="palette" v-if=" typeof paletteSet.palettes[p_index - 1] !== 'undefined'"  :key="p_index">
            <span v-for="(color, c_index) in paletteById(paletteSet.palettes[p_index - 1]).colors" :key="c_index" :style="{backgroundColor: color.hex}"></span>
          </div>
          <div v-else :key="p_index" class="w-full h-full border border-dashed border-grey">  </div>
        </template>
      </div>
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { PaletteSet } from '@/primitives/paletteSet';
import { Palette } from '@/primitives/palette';
import { Color } from '@/primitives/color';
const Palettes = namespace('palettes');
@Component({})
export default class CPCompactPaletteSet extends Vue {
  @Prop() public paletteSet!: PaletteSet;
  @Palettes.Getter('paletteById') private paletteById!: (id: string) => Palette;
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
