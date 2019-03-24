<template>
  <div class="color-picker">
    <div class="color-picker__grid">
      <div class="color-picker__cell" v-for="(color, index ) in colors" :key="index"
      @mouseover="updateColor(color)"
      @click="selectColor(color)"
      >
        <div class="color-picker__swatch" :style="{backgroundColor: color.hex}"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';

@Component
export default class CPColorPicker extends Vue {
  public colors = Color.nextColors();
  public activeColor: Color = new Color();
  public asHex = Color.asHex;
  public updateColor(color: Color) {
    this.activeColor = color;
    this.$emit('updateActive', this.activeColor);
  }
  public selectColor(color: Color) {
    this.$emit('updateSelected', color);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.color-picker {
  &__grid {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(16, 1fr);
  }
  &__cell {
    border: 5px solid lightgrey;
  }
  &__label {
    display: inline-block;
    padding: 0.5em 1em;
  }
  &__swatch {
    width: 100%;
    height: 2em;
  }
}
</style>

