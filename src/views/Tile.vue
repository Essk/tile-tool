<template>
  <div class="tile-view bg-grey-lightest">
      <CPEditableTitle 
      class="header"
      lineOne="Tile:" 
      :lineTwo="tile.name" 
      @input="handleTileName" />
      <span>{{ tile.id }}</span>
      <!--
    <CPTileEditable  :tile="tile" @selected="handleSelect"/>
    -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Palette } from '@/utils/palette';
import { Color } from '@/utils/color';
import { Tile } from '@/utils/tile';
import CPEditableTitle from '@/components/EditableTitle.vue';

@Component({
  components: {
        CPEditableTitle,
  },
})
export default class VWPalette extends Vue {
  public activeColor: Color = new Color();
  @Prop() private id!: string;
  @Getter('tile') private tile!: Tile;
  // @Getter('palette') private palette!: Palette;
  // @Action('updateColor') private updateColor!: (payload: updateColorPayload) => void;
  @Action('setCurrentTile') private setCurrentTile!: (id: string) => void;
  // @Action('setPaletteName') private setPaletteNam!: (name: string) => void;
  private created() {
    this.setCurrentTile(this.id);
  }
  private handleTileName() {
    console.log('handles');
  }
}
</script>

<style lang="scss" scoped>

</style>
