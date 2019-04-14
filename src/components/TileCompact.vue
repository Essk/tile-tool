<template>
  <div class="compact-tile-wrap">
        <BaseSubsubtitle :line_one="tile.id" :line_two="tile.name" :lineThree="`Palette Set: ${ps.name}, Palette: ${palette.name}`"/>

      <div class="tile mt-2">
        <template v-if="hasPaletteSet">
          <span v-for="(px, px_index) in tile.px" :key="px_index" >
              {{ px }}
          </span>
        </template>
        <template v-else> 
          No PaletteSet
        </template>
      </div>
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Palette } from '../utils/palette';
import { PaletteSet } from '../utils/paletteSet';
import { Tile } from '../utils/tile';
import { Color } from '../utils/color';
@Component({})
export default class CPCompactTile extends Vue {
  @Prop() public tile!: Tile;
  @Getter('paletteSetById') private paletteSetById!: (id: string) => PaletteSet;

  get hasPaletteSet(): boolean {
    return (
      this.tile.paletteSet.includes('paletteSett')
    );
  }


  public created() {
    console.log(this.tile.paletteSet);
    console.log(this.paletteSetById(this.tile.paletteSet));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
