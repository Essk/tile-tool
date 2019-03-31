<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Library</router-link> |
      <router-link to="/tiles">Tiles</router-link> | 
      <router-link to="/palettes">Palettes</router-link> | 
      
    </div>
    <router-view 
    :tileData="tileData"
    @updateTile="updateTile"
    :getPaletteSet="getPaletteSet"
    :getPalette="getPalette"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TileDataController } from '@/utils/TileDataController';
import { Tile } from '@/utils/tile';
import { PaletteSet } from '@/utils/paletteSet';
import { Color } from '@/utils/color';
import Palettes from '@/views/Palettes.vue';
@Component({
  components: {},
})
export default class App extends Vue {

  public tileData: TileData = {
    tiles: [],
    paletteSets: [],
  };
  private tileDataController = new TileDataController();

  public created() {
    this.tileData.tiles = this.tileDataController.tiles;
    this.tileData.paletteSets = this.tileDataController.paletteSets;
  }
  public getPaletteSet(id: string) {
    return this.tileData.paletteSets.find((ps) => {
      return ps.id === id;
    } );
  }
  public getPalette(paletteSetId: string, idx: number) {
    const defaultPalette = this.tileData.paletteSets[0].palettes[0];
    const ps = this.tileData.paletteSets.find((_ps) => {
      return _ps.id === paletteSetId;
    } );
    return ps ? ps.palettes[idx] : defaultPalette;
  }
  public updateTile(data: any) {
    console.log('updating tile');
    console.log(data);
  }
}

type TileData = {
  tiles: Tile[];
  paletteSets: PaletteSet[];
};
</script>
<style lang="scss">
html {
  font-family: "Rubik", "Helvetica", sans-serif;
}
</style>
