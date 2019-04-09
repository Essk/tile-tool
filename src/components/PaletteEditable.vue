<template>
  <div class="palette-wrap bg-grey-light p-4">
    <div class="palette ">
      <div class="palette__color-swatch-wrap"  
      v-for="(color, index) in palette.colors" 
      :key="index">
        <button 
        class="palette__color-swatch"
        :style="{backgroundColor: color.hex }"
        @mouseover="activate($event)"
        @focus="activate($event)"
        @mouseout="deactivate($event)"
        @blur="deactivate($event)"
        @click="select($event)"
        >{{ color.hex }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';
import CPPalette from '@/components/Palette.vue';
@Component
export default class CPPaletteEditable extends CPPalette {
  public selected: number | undefined = undefined;
  @Prop() private tileData!: any;
  public activate($event: Event) {
    if ($event !== null && $event.target !== null) {
      const target = $event.target as HTMLElement;

      if (
        target.parentElement !== null &&
        getElementIndex(target) !== undefined &&
        getElementIndex(target) !== this.selected
      ) {
        target.parentElement.classList.add(
          'palette__color-swatch-wrap--active',
        );
      }
    }
  }
  public deactivate($event: Event) {
    if ($event !== null && $event.target !== null) {
      const target = $event.target as HTMLElement;
      if (target.parentElement !== null) {
        target.parentElement.classList.remove(
          'palette__color-swatch-wrap--active',
        );
      }
    }
  }
  public select($event: Event) {
    if ($event !== null && $event.target !== null) {
      const target = $event.target as HTMLElement;
      if (
        target.parentElement !== null &&
        target.parentElement.parentElement !== null &&
        target.parentElement.parentElement.children !== null
      ) {
        const children = target.parentElement.parentElement.children;
        if (children !== null) {
          /*tslint:disable:prefer-for-of */
          for (let c = 0; c < children.length; c++) {
            children[c].classList.remove(
              'palette__color-swatch-wrap--selected',
            );
          }
        }
        target.parentElement.classList.add(
          'palette__color-swatch-wrap--selected',
        );
        this.selected = getElementIndex(target.parentElement);
        this.$emit('selected', this.selected);
      }
    }
  }
}

function getElementIndex(element: HTMLElement): number | undefined {
  if (
    element !== null &&
    element.parentElement !== null &&
    element.parentElement.children !== null
  ) {
    return Array.from(element.parentElement.children).indexOf(element);
  }
}
</script>


<style scoped lang="scss">
.palette {
  //width: 256px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1fr, 16);
  &__color-swatch-wrap {
    padding:  4px;
   // background-color: white;
    &--selected {
      background-color: red;
    }
    &--active {
      background-color: lightblue;
    }
  }
  &__color-swatch {
    -webkit-appearance: none;
    -moz-appearance: none;
    //border:2px solid grey;
    font-size: 18px;
    padding: 0.5em 2em;
    width: 100%;
    outline: none;
  }
}
</style>
