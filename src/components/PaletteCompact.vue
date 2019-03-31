<template>
  <div class="compact-palette-wrap">
        <h2> {{ palette.name}} </h2>
        <span> {{ palette.id }}</span>
      <router-link :key="palette.id" :to="{ name: 'palette', params: { id: palette.id, tileData: tileData}  }">
        Edit
      </router-link>
      <div class="palette">
        <span v-for="(color, index) in palette.colors" :key="index">
        </span>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';
@Component({})
export default class CPCompactPalette extends Vue {
  @Prop() public palette!: Palette;
  @Prop() public paletteSetTotal!: number;
  @Prop() public tileData!: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.palette {
  width: 128px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 4px;
  
  span {
    display: block;
    border: 1px dotted grey;
    height: 32px;
    width: 32px;
    border-radius: 16px;
  }
}
</style>
