<template>
  <div class="compact-tile-wrap">
        <BaseSubsubtitle>
          {{ tile.name }}
          <template slot="bottom" v-if="hasPaletteSet">bottolm</template>
          <template slot="bottom" v-else>No palette set assigned </template>
        </BaseSubsubtitle>

      <div class="tile mt-2" :class="hasPaletteSet ? '' : 'border-l border-b border-dashed border-grey'">
          <div v-for="(px, px_index) in tile.px" :key="px_index" 
          class="inline-block w-8 h-8 relative align-middle"
          :class="[
            hasPaletteSet ? '' : ' border-dashed border-grey', 
            hasPaletteSet && px_index === 0 ? 'border': 'border-t border-r', ] "
          >
          <span class="block w-4 h-4 p-1 bg-white absolute pin-r pin-b text-xs">
            {{ px }}
          </span>
              
          </div>
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
.tile{
  width: 256px;
  display: grid;
  grid-template-columns: 32px 32px 32px 32px 32px 32px 32px 32px;
  grid-template-rows: 32px 32px 32px 32px 32px 32px 32px 32px;
}
</style>
