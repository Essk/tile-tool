<template>
  <div class="compact-palette-wrap flex flex-col">
    <BaseSubtitle>{{palette.name}}
    <template slot="bottom">{{ palette.id }}</template>
    </BaseSubtitle>
      <div class="palette mt-auto">
        <span v-for="(color, c_index) in palette.colors" :key="c_index" :style="{backgroundColor: color.hex}">
        </span>
      </div>
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';
@Component({})
export default class CPCompactPalette extends Vue {
  @Prop() public palette!: Palette;
  @Prop() public index?: number;
}
</script>

<style scoped lang="scss">
.palette {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 4px;
  
  span {
    display: block;
    border: 1px dotted grey;
    height: 64px;
    width: 64px;
    border-radius: 16px;
  }
}
</style>
