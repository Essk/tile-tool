<template>
  <div class="palette-wrap">
    <h2>{{ palette.name }}</h2>
    <div class="palette">
      <span 
      v-for="(color, index) in palette.colors" 
      :key="index"
      :style="{backgroundColor: color.hex }"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '@/primitives/palette';
import { Color } from '@/primitives/color';
@Component({})
export default class CPPalette extends Vue {
  @Prop() public palette!: Palette;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.palette {
  width: 128px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1fr, 16);
  span {
    display: block;
    border: 1px dotted grey;
    height: 25px;
  }
}
</style>
