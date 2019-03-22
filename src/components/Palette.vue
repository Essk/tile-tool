<template>
  <div class="palette-wrap">
    <h2>{{ palette.name }}</h2>
    <div class="palette">
      <span 
      v-for="(color, index) in palette.colors" 
      :key="index"
      :style="{backgroundColor: `#${hex(color)}` }"
      >{{ hex( color ) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';
@Component
export default class CPPalette extends Vue {
  @Prop() private palette!: Palette;
  private hex(color: Color): string {
    return `${Color.decToHex(color.red)}${Color.decToHex(color.green)}${Color.decToHex(color.blue)}`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .palette{
    width: 256px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(1fr, 16) ;
    span{
      display: block;
      border: 1px dotted grey;
    }
  }
</style>
