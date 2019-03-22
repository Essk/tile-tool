<template>
  <div class="color-picker">
    <div class="color-picker__readout readout">
      <div class="readout__swatch" :style="{backgroundColor: currentColor.hex}">

      </div>
      <span class="readout__r">{{ currentColor.red }}</span>
      <span class="readout__g">{{ currentColor.green }}</span>
      <span class="readout__b">{{ currentColor.blue }}</span>
      <span class="readout__hex">
        {{ currentColor.hex }}
      </span>
    </div>
    <div class="color-picker__grid">
      <div class="color-picker__cell" v-for="(color, index ) in colors" :key="index"
      @mouseover="updateColor(color)"
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
  public currentColor: Color = new Color();
  public asHex = Color.asHex;
  public updateColor(color: Color) {
    this.currentColor = color;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .color-picker{
      &__grid{
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        grid-template-rows: repeat(16, 1fr);
      }
      &__cell{
          border: 5px solid lightgrey;
        }
        &__label{
          display: inline-block;
          padding:0.5em 1em;
        }
        &__swatch{
          width: 100%;
          height: 2em;
        }
    }
    .readout{
      border: 1px solid black;
      padding: 10px;
      &__swatch{
        border: 1px solid black;
        width: 128px;
        height: 128px;
      }
    }
</style>

