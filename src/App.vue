<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Library</router-link> |
      <router-link to="/tiles">Tiles</router-link> | 
      <router-link to="/palettes">Palettes</router-link> | 
      
    </div>
    <router-view :tileData="tileData"
    :getPalette="getPalette"
    @updatePalette="updatePalette"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { FileDataStore } from './utils/user-data';
import { Tile } from './utils/tile';
import { Palette } from './utils/palette';
import Palettes from '@/views/Palettes.vue';
@Component({
  components: {},
})
export default class App extends Vue {
  public tileData: TileData = {
    tiles: [],
    palettes: [],
  };
  public updatePalette(payload: any) {
    const td = this.tileData;
    const maybePalette = td.palettes.find((p) => {
      return p.id === payload.id;
    });
    const palette: Palette =
      maybePalette !== undefined
        ? maybePalette
        : new Palette({ name: 'default' });
    palette.updateColor(payload.idx, payload.color);
    this.$set(this.tileData, 'palettes', td.palettes);
  }
  public getPalette(id: string): Palette {
    return this.tileData.palettes.filter((palette: any) => {
      return palette.id === id;
    })[0];
  }
  public created() {
    const defaultTile = new Tile({ name: 'new tile' });
    const defaultPalette = new Palette({ name: 'new palette' });
    this.tileData.tiles.push(defaultTile);
    this.tileData.palettes.push(defaultPalette);
  }
}

type TileData = {
  tiles: Tile[];
  palettes: Palette[];
};
</script>
<style lang="scss">
html {
  font-family: "Rubik", "Helvetica", sans-serif;
}
</style>
