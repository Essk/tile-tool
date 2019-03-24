<template>
  <div class="color-detail">
    <div class="color-detail__swatch" :style="{backgroundColor: color.hex}">

    </div>
    <div class="color-detail__rgb">
      <div class="color-detail__rgb-section">
        <span class="color-detail__rgb-value">{{ color.red }}</span>
        <span class="color-detail__rgb-label">R</span>
      </div>
      <div class="color-detail__rgb-section">
        <span class="color-detail__rgb-value">{{ color.green }}</span>
        <span class="color-detail__rgb-label">G</span>
      </div>
      <div class="color-detail__rgb-section">
        <span class="color-detail__rgb-value">{{ color.blue }}</span>
        <span class="color-detail__rgb-label">B</span>
      </div>
      <div class="color-detail__hex">{{ color.hex }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Color } from '../utils/color';
@Component({})
export default class CPColorDetail extends Vue {
  @Prop() private color!: Color;
}
</script>


<style scoped lang="scss">
.color-detail {
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
  &__swatch {
    width: 128px;
    height: 128px;
    border: 1px solid black;
  }
  &__rgb {
    display: flex;
    flex-wrap: wrap;
  }
  &__rgb-section {
    flex-direction: column;
    display: flex;
    align-items: center;
    margin: 0 2px;
    flex-basis: 30%;
  }
  &__hex {
    flex-basis: 100%;
    align-self: flex-end;
    padding: 0 1em;
  }
}
</style>
