<template>
  <div class="tile-wrap">
    <h2>{{ tile.name }}</h2>
    <div class="tile">
      <span v-for="(px, index) in tile.px" :key="index">{{ px }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Tile } from '../utils/tile';
@Component
export default class CPTile extends Vue {
  @Prop() private tile!: Tile;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tile{
    width: 256px;
    height: 256px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    span{
      display: block;
      border: 1px dotted grey;
    }
  }
</style>
